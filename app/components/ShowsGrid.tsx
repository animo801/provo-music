"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Show } from "@/app/lib/notion";
import LearnMoreLink from "./LearnMoreLink";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (iso.includes("T")) {
    return d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Denver",
    });
  }
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function monthKey(year: number, month: number) {
  return `${year}-${month}`;
}

function advanceMonth(year: number, month: number) {
  const d = new Date(year, month, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

type MonthEntry = { year: number; month: number; shows: Show[] };

const MAX_MONTHS_AHEAD = 12;

export default function ShowsGrid({ initialShows }: { initialShows?: Show[] }) {
  const now = new Date();
  const startYear = now.getFullYear();
  const startMonth = now.getMonth() + 1;

  const hasInitial = !!initialShows;
  const firstMonth = advanceMonth(startYear, startMonth);

  const [entries, setEntries] = useState<MonthEntry[]>(
    hasInitial ? [{ year: startYear, month: startMonth, shows: initialShows! }] : [],
  );
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState(monthKey(startYear, startMonth));
  const [artistFilter, setArtistFilter] = useState("");
  const [venueFilter, setVenueFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const nextToLoad = useRef(hasInitial ? firstMonth : { year: startYear, month: startMonth });
  const isLoading = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const navMonths = Array.from({ length: MAX_MONTHS_AHEAD }, (_, i) => {
    const d = new Date(startYear, startMonth - 1 + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1, label: MONTH_NAMES[d.getMonth()] };
  });

  const fetchMonth = useCallback(async (year: number, month: number): Promise<MonthEntry> => {
    const res = await fetch(`/api/shows?year=${year}&month=${month}`);
    const shows: Show[] = await res.json();
    return { year, month, shows };
  }, []);

  const loadNext = useCallback(async () => {
    if (isLoading.current) return;
    const { year, month } = nextToLoad.current;
    const monthsAhead = (year - startYear) * 12 + (month - startMonth);
    if (monthsAhead >= MAX_MONTHS_AHEAD) return;

    isLoading.current = true;
    setLoading(true);
    const entry = await fetchMonth(year, month);
    setEntries((prev) => [...prev, entry]);
    nextToLoad.current = advanceMonth(year, month);
    isLoading.current = false;
    setLoading(false);
  }, [fetchMonth, startYear, startMonth]);

  // Load first month on mount (skip if server-rendered initial data was provided)
  useEffect(() => {
    if (!hasInitial) loadNext();
  }, []);

  // Sentinel: load next month when user nears the bottom
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadNext();
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadNext]);

  // Track active month for nav highlight
  useEffect(() => {
    if (entries.length === 0) return;
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, key) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveKey(key);
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [entries]);

  const goToMonth = async (year: number, month: number) => {
    const key = monthKey(year, month);
    const existing = sectionRefs.current.get(key);
    if (existing) {
      existing.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Load all months up to the target in parallel
    const toLoad: { year: number; month: number }[] = [];
    let { year: y, month: m } = nextToLoad.current;
    while (y < year || (y === year && m <= month)) {
      toLoad.push({ year: y, month: m });
      ({ year: y, month: m } = advanceMonth(y, m));
    }
    if (toLoad.length === 0) return;

    isLoading.current = true;
    setLoading(true);
    const results = await Promise.all(toLoad.map(({ year, month }) => fetchMonth(year, month)));
    setEntries((prev) => [...prev, ...results]);
    const last = toLoad[toLoad.length - 1];
    nextToLoad.current = advanceMonth(last.year, last.month);
    isLoading.current = false;
    setLoading(false);

    setTimeout(() => {
      sectionRefs.current.get(key)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const allShows = entries.flatMap((e) => e.shows);
  const artistOptions = [...new Set(allShows.flatMap((s) => s.performers))].sort();
  const venueOptions = [...new Set(allShows.map((s) => s.venue).filter(Boolean) as string[])].sort();
  const genreOptions = [...new Set(allShows.flatMap((s) => s.genre?.split(", ") ?? []).filter(Boolean))].sort();

  const hasFilters = !!(artistFilter || venueFilter || genreFilter);

  const filteredEntries = entries.map((entry) => ({
    ...entry,
    shows: entry.shows.filter((show) => {
      if (artistFilter && !show.performers.includes(artistFilter)) return false;
      if (venueFilter && show.venue !== venueFilter) return false;
      if (genreFilter && !show.genre?.split(", ").includes(genreFilter)) return false;
      return true;
    }),
  }));

  const selectClass = "flex-1 min-w-0 border-2 border-black rounded-sm px-3 py-2 bg-[#eeeeee] text-base font-semibold focus:outline-none focus:ring-2 focus:ring-black";

  return (
    <div>
      {/* Sticky filters + month nav */}
      <div className="sticky top-0 z-10 bg-[#eeeeee] border-b border-black/10">
        {/* Filters */}
        <div className="px-4 md:px-8 py-3 max-w-[1400px] mx-auto flex gap-3 overflow-x-auto border-b border-black/10">
          <select className={selectClass} value={artistFilter} onChange={(e) => setArtistFilter(e.target.value)}>
            <option value="">All artists</option>
            {artistOptions.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select className={selectClass} value={venueFilter} onChange={(e) => setVenueFilter(e.target.value)}>
            <option value="">All venues</option>
            {venueOptions.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
          <select className={selectClass} value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="">All genres</option>
            {genreOptions.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          {hasFilters && (
            <button
              onClick={() => { setArtistFilter(""); setVenueFilter(""); setGenreFilter(""); }}
              className="text-sm font-semibold underline hover:no-underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Month nav */}
        <div className="overflow-x-auto">
          <div className="flex gap-8 px-4 md:px-8 py-4 max-w-[1400px] mx-auto whitespace-nowrap">
            {navMonths.map((nm) => {
              const key = monthKey(nm.year, nm.month);
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  onClick={() => goToMonth(nm.year, nm.month)}
                  className={`text-xl font-bold transition-colors ${
                    isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {nm.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Month sections */}
      <div className="px-4 md:px-8 pb-24 max-w-[1400px] mx-auto">
        {filteredEntries.map((entry) => {
          const key = monthKey(entry.year, entry.month);
          return (
            <div
              key={key}
              ref={(el) => {
                if (el) sectionRefs.current.set(key, el);
                else sectionRefs.current.delete(key);
              }}
              className="pt-12"
            >
              <h2 className="text-2xl font-bold mb-6">
                {MONTH_NAMES[entry.month - 1]} {entry.year}
              </h2>

              {entry.shows.length === 0 ? (
                <p className="text-gray-400 mb-12">No shows this month.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {entry.shows.map((show) => (
                    <div
                      key={show.id}
                      className="bg-[#eeeeee] border-2 border-black rounded-sm overflow-hidden flex flex-col"
                    >
                      {show.image ? (
                        <img
                          src={show.image}
                          alt={show.name}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-[#C8D3DD]" />
                      )}
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm text-gray-800">{formatDate(show.date)}</p>
                          <span className="text-sm text-gray-800">{show.genre}</span>
                        </div>
                        <h3 className="text-[24px] leading-none md:text-3xl font-black mb-2">
                          {show.name}
                        </h3>
                        <p className="text-sm text-gray-800 mb-6">{show.address}</p>
                        <div className="flex gap-3 mt-auto">
                          <LearnMoreLink href={`/shows/${show.id}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {loading && <p className="py-12 text-center text-gray-400">Loading...</p>}

        <div ref={sentinelRef} />
      </div>
    </div>
  );
}
