import ShowsGrid from "@/app/components/ShowsGrid";
import ScrollRestorer from "@/app/components/ScrollRestorer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E8DCC8]">
      <ScrollRestorer />
      <header className="flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <h1 className="text-xl font-bold">Provo Music Scene</h1>
        <nav className="flex gap-8">
          <Link href="/venues" className="text-lg hover:underline">
            Venues
          </Link>
          <Link href="/artists" className="text-lg hover:underline">
            Artists
          </Link>
          <a href="#contact" className="text-lg hover:underline">
            Contact
          </a>
          <a href="#add-band" className="text-lg hover:underline">
            Add band
          </a>
        </nav>
      </header>

      <main>
        <div className="px-8 pt-12 pb-8 max-w-[1400px] mx-auto">
          <h2 className="text-6xl font-bold leading-none max-w-3xl">
            See every show in Provo in one place
          </h2>
        </div>
        <ShowsGrid />
      </main>
    </div>
  );
}
