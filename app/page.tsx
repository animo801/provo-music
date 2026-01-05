export default function Home() {
  const shows = [
    {
      id: 1,
      date: "Friday, December 12th 2025",
      bands: "The Wombats",
      genre: "Rock",
      price: "$15 per ticket",
      image: "/placeholder-show.jpg",
    },
    {
      id: 2,
      date: "Friday, December 12th 2025",
      bands: "Cougar Gold + Auhre + Megaritual",
      genre: "Mixed",
      price: "$15 per ticket",
      image: "/placeholder-show.jpg",
    },
    {
      id: 3,
      date: "Friday, December 12th 2025",
      bands: "The Wombats",
      genre: "Rock",
      price: "$15 per ticket",
      image: "/placeholder-show.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E8DCC8]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <h1 className="text-xl font-bold">Provo Music Scene</h1>
        <nav className="flex gap-8">
          <a href="#contact" className="text-lg hover:underline">
            Contact
          </a>
          <a href="#add-band" className="text-lg hover:underline">
            Add band
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 pt-12 pb-24 max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h2 className="text-6xl font-bold leading-none max-w-3xl">
            See every show in Provo in one place
          </h2>
        </div>

        {/* Show Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          {shows.map((show) => (
            <div
              key={show.id}
              className="bg-[#E8DCC8] border-2 border-black rounded-sm overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-[#C8D3DD]"></div>

              {/* Show Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-gray-600">{show.date}</p>
                  <span className="text-sm text-gray-600">{show.genre}</span>
                </div>
                <h3 className="text-2xl font-bold mb-6">{show.bands}</h3>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors">
                    Listen
                  </button>
                  <button className="flex-1 bg-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors">
                    {show.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
