import Header from "@/app/components/Header";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee]">
      <Header />

      <main className="px-4 md:px-8 pt-12 pb-24 max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h2 className="text-6xl font-black leading-none mb-3">Contact us</h2>
          <p className="text-gray-600">Have a question or feedback? We'd love to hear from you.</p>
        </div>

        <iframe
          src="https://provomusicscene.notion.site/ebd//2d449e86e98580b69793f01093708ec5"
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
