import { fetchShow } from "@/app/lib/notion";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function ShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await fetchShow(id);

  if (!show) notFound();

  const isUrl = (str: string) => str.startsWith("http");

  return (
    <div className="min-h-screen bg-[#E8DCC8]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <Link href="/" className="text-xl font-bold hover:underline">
          Provo Music Scene
        </Link>
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

      <main className="px-8 pt-12 pb-24 max-w-[640px] mx-auto">
        <Link href="/" className="inline-block mb-8 text-sm font-semibold underline hover:no-underline">
          ← Back to list
        </Link>

        {/* Image */}
        {show.image ? (
          <img src={show.image} alt={show.name} className="w-full h-72 object-cover mb-10 rounded-sm" />
        ) : (
          <div className="w-full h-72 bg-[#C8D3DD] mb-10 rounded-sm" />
        )}

        <div>
          {/* Date, Genre, Setting */}
          <div className="flex flex-wrap items-center gap-4 mb-3">
            {show.date && <p className="text-sm text-gray-600">{show.date}</p>}
            {show.genre && <span className="text-sm text-gray-600">{show.genre}</span>}
            {show.indoor !== null && (
              <span className="text-sm text-gray-600">{show.indoor ? "Indoor" : "Outdoor"}</span>
            )}
          </div>

          {/* Event Name */}
          <h1 className="text-5xl font-black mb-2">{show.name}</h1>

          {/* Performers */}
          {show.performers.length > 0 && (
            <p className="text-lg text-gray-700 mb-8">{show.performers.join(" · ")}</p>
          )}

          {/* Details Grid */}
          <div className="border-t-2 border-black pt-6 grid grid-cols-2 gap-6 mb-8">
            {show.venue && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Venue</p>
                <p className="font-semibold">{show.venue}</p>
              </div>
            )}
            {show.address && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Address</p>
                <p className="font-semibold">{show.address}</p>
              </div>
            )}
            {show.price && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Price</p>
                <p className="font-semibold">{show.price}</p>
              </div>
            )}
            {show.ages && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Ages</p>
                <p className="font-semibold">{show.ages}</p>
              </div>
            )}
          </div>

          {/* Presale */}
          {show.presaleLink && (
            <div className="mb-8">
              {isUrl(show.presaleLink) ? (
                <a
                  href={show.presaleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors text-center"
                >
                  Buy presale tickets
                </a>
              ) : (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Presale</p>
                  <p className="font-semibold">{show.presaleLink}</p>
                </div>
              )}
            </div>
          )}

          {/* Social Media */}
          {show.socialMedia && (
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Follow the artists</p>
              {isUrl(show.socialMedia) ? (
                <a
                  href={show.socialMedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold"
                >
                  {show.socialMedia}
                </a>
              ) : (
                <p className="font-semibold">{show.socialMedia}</p>
              )}
            </div>
          )}

          {/* Important Info */}
          {show.importantInfo && (
            <div className="mb-8 border-l-4 border-black pl-4">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Important info</p>
              <p>{show.importantInfo}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
