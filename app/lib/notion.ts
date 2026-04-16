import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NotionProp = any;

function title(prop: NotionProp): string {
  return prop?.title?.map((t: { plain_text: string }) => t.plain_text).join("") ?? "";
}

function richText(prop: NotionProp): string {
  return prop?.rich_text?.map((t: { plain_text: string }) => t.plain_text).join("") ?? "";
}

function select(prop: NotionProp): string {
  return prop?.select?.name ?? "";
}

function multiSelect(prop: NotionProp): string[] {
  return prop?.multi_select?.map((s: { name: string }) => s.name) ?? [];
}

function url(prop: NotionProp): string | null {
  return prop?.url ?? null;
}

function date(prop: NotionProp): string {
  return prop?.date?.start ?? "";
}

function place(prop: NotionProp): string {
  return prop?.place?.address ?? prop?.place?.name ?? "";
}

function files(prop: NotionProp): string | null {
  const list = prop?.files;
  if (!list?.length) return null;
  const f = list[0];
  if (f.type === "file") return f.file.url;
  if (f.type === "external") return f.external.url;
  return null;
}

function status(prop: NotionProp): string {
  return prop?.status?.name ?? "";
}

function mapPage(page: PageObjectResponse) {
  // Use property IDs as fallback keys so renames don't break us
  const p = page.properties;

  const setting = multiSelect(p["Setting"]);
  const isIndoor = setting.some((s) => s.toLowerCase().includes("indoor"));
  const isOutdoor = setting.some((s) => s.toLowerCase().includes("outdoor"));

  return {
    id: page.id,
    name: title(p["Event Title"]),
    date: date(p["Event Date"]),
    performers: richText(p["Performers"])
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    genre: multiSelect(p["Genre(s)"]).join(", ") || null,
    socialMedia: richText(p["Bands' Socials"]) || null,
    price: richText(p["Price"]) || null,
    ages: select(p["Age"]) || null,
    venue: richText(p["Venue/Location"]) || null,
    address: place(p["Place"]) || null,
    indoor: isIndoor ? true : isOutdoor ? false : null,
    presaleLink: url(p["Presale"]),
    importantInfo: richText(p["Important Info"]) || null,
    image: files(p["Cover Image"]) ?? files(p["Flyer Image"]),
  };
}

export type Show = ReturnType<typeof mapPage>;

export async function fetchShowsByMonth(year: number, month: number): Promise<Show[]> {
  const now = new Date();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;
  const startDate = isCurrentMonth
    ? now.toISOString().split("T")[0]
    : new Date(year, month - 1, 1).toISOString().split("T")[0];
  const endDate = new Date(year, month, 0).toISOString().split("T")[0];

  const results = await queryAll({
    data_source_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: "Approval", status: { equals: "Approved" } },
        { property: "Event Date", date: { on_or_after: startDate } },
        { property: "Event Date", date: { on_or_before: endDate } },
      ],
    },
    sorts: [{ property: "Event Date", direction: "ascending" }],
  });

  return results.map(mapPage);
}

async function queryAll(params: Parameters<typeof notion.dataSources.query>[0]) {
  const results: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const response = await notion.dataSources.query({
      ...params,
      start_cursor: cursor,
      page_size: 100,
    });
    results.push(
      ...response.results.filter(
        (p): p is PageObjectResponse => "properties" in p
      )
    );
    cursor = response.has_more && response.next_cursor ? response.next_cursor : undefined;
  } while (cursor);
  return results;
}

const VENUES_DB = "2ad49e86-e985-8145-8d27-000b24da495a";
const ARTISTS_DB = "2ad49e86-e985-817c-86f6-000b6eb7d81a";

function mapVenue(page: PageObjectResponse) {
  const p = page.properties;
  return {
    id: page.id,
    name: title(p["Name"]),
    address: place(p["Place"]) || richText(p["Address"]) || null,
    instagram: url(p["Instagram"]),
    website: url(p["Website"]),
    capacity: (p["Capacity"] as { number?: number | null } | undefined)?.number ?? null,
    ages: select(p["Age"]) || null,
    image: files(p["Cover Photo"]),
  };
}

export type Venue = ReturnType<typeof mapVenue>;

export async function fetchVenues(): Promise<Venue[]> {
  const results = await queryAll({
    data_source_id: VENUES_DB,
    sorts: [{ property: "Name", direction: "ascending" }],
  });

  return results.map(mapVenue).filter((v) => v.name);
}

function mapArtist(page: PageObjectResponse) {
  const p = page.properties;
  return {
    id: page.id,
    name: title(p["Band/performer name"]),
    genre: multiSelect(p["Main Genre"]).join(", ") || null,
    instagram: url(p["Instagram"]) || richText(p["Instagram"]) || null,
    music: url(p["Music"]) || null,
    website: url(p["Website/EPK/Other"]) || null,
    image: files(p["Add a cover photo"]),
  };
}

export type Artist = ReturnType<typeof mapArtist>;

export async function fetchArtists(): Promise<Artist[]> {
  const results = await queryAll({
    data_source_id: ARTISTS_DB,
    filter: {
      property: "Approval",
      select: { equals: "Approved" },
    },
    sorts: [{ property: "Band/performer name", direction: "ascending" }],
  });

  return results.map(mapArtist).filter((a) => a.name);
}

export async function fetchShow(id: string): Promise<Show | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    if (!("properties" in page)) return null;
    return mapPage(page as PageObjectResponse);
  } catch {
    return null;
  }
}
