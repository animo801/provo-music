import { fetchArtists } from "@/app/lib/notion";
import Header from "@/app/components/Header";

export const revalidate = 60;

function instagramUrl(value: string): string {
  if (value.startsWith("http")) return value;
  const handle = value.replace(/^@/, "");
  return `https://www.instagram.com/${handle}/`;
}

export default async function ArtistsPage() {
  const artists = await fetchArtists();

  return (
    <div className="min-h-screen bg-[#E2F6FF]">
      <Header active="artists" />

      <main className="px-8 pt-12 pb-24 max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-7xl font-bold font-display leading-none uppercase">Artists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-[#E2F6FF] border-2 border-black rounded-sm overflow-hidden flex flex-col"
            >
              {artist.image ? (
                <img src={artist.image} alt={artist.name} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-[#C8D3DD]" />
              )}

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-2xl font-black mb-1">{artist.name}</h3>
                {artist.genre && (
                  <p className="text-sm text-gray-600 mb-4">{artist.genre}</p>
                )}

                <div className="flex flex-wrap gap-3 mt-auto">
                  {artist.music && (
                    <a
                      href={artist.music}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white py-2 px-4 text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Listen
                    </a>
                  )}
                  {artist.instagram && (
                    <a
                      href={instagramUrl(artist.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-black py-2 px-4 text-sm font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      Instagram
                    </a>
                  )}
                  {artist.website && (
                    <a
                      href={artist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-black py-2 px-4 text-sm font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
