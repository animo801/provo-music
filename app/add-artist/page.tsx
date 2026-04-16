import Header from "@/app/components/Header";

export default function AddArtistPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee]">
      <Header />

      <main className="px-4 md:px-8 pt-12 pb-24 max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl md:text-7xl font-[900] leading-none uppercase mb-3">Add an artist</h2>
          <p className="text-gray-600">Fill out the form below to submit an artist for review.</p>
        </div>

        <iframe
          src="https://provomusicscene.notion.site/ebd//2ad49e86e985814c8b5ddc8622c0c4f5"
          width="100%"
          height="600"
          frameBorder="0"
          allowFullScreen
          className="border-2 border-black rounded-sm"
        />
      </main>
    </div>
  );
}
