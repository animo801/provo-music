import ShowsGrid from "@/app/components/ShowsGrid";
import ScrollRestorer from "@/app/components/ScrollRestorer";
import Header from "@/app/components/Header";
import { fetchShowsByMonth } from "@/app/lib/notion";

export const revalidate = 60;

export default async function Home() {
  const now = new Date();
  const initialShows = await fetchShowsByMonth(now.getFullYear(), now.getMonth() + 1);

  return (
    <div className="min-h-screen bg-[#eeeeee]">
      <ScrollRestorer />
      <Header active="events" />

      <main>
        <div className="px-8 pt-12 pb-8 max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-black leading-none max-w-3xl">
            See every show in Provo in one place
          </h2>
        </div>
        <ShowsGrid initialShows={initialShows} />
      </main>
    </div>
  );
}
