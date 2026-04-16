import Header from "@/app/components/Header";

export default function AddShowPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee]">
      <Header active="add-show" />

      <main className="px-8 pt-12 pb-24 max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl md:text-7xl font-[900] leading-none uppercase mb-3">Add a show</h2>
          <p className="text-gray-600">Fill out the form below to submit your show for review.</p>
        </div>

        <iframe
          src="https://provomusicscene.notion.site/ebd//2ae49e86e98580669db6cc46d143e7df"
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
