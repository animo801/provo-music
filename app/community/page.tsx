import Header from "@/app/components/Header";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#E2F6FF]">
      <Header />

      <main className="px-4 md:px-8 pt-12 pb-24 max-w-[900px] mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-7xl font-bold font-display leading-none uppercase mb-4">
            Community
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Building communication bridges across the local music ecosystem
          </p>
        </div>

        <div className="space-y-12 text-lg leading-relaxed">
          <div className="border-t-2 border-black pt-8">
            <h3 className="text-2xl font-bold font-display uppercase mb-4">
              Provo Music Scene Town Hall
            </h3>
            <p className="text-gray-700 mb-4">
              A regular monthly gathering hosted by{" "}
              <a
                href="https://www.instagram.com/3hiverecordlounge"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                3Hive Record Lounge
              </a>{" "}
              on the last Tuesday of each month at 7 PM. For details, contact The Toaster Oven via
              Instagram.
            </p>
            <p className="text-gray-600 mb-6">71 E Center St, Provo</p>
            <ul className="space-y-2 text-gray-700">
              <li>
                Written recaps available via{" "}
                <a
                  href="https://www.provomusicmagazine.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Provo Music Magazine
                </a>
              </li>
              <li>
                <a
                  href="https://www.provomusicscene.com/community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Meeting Agendas &amp; Minutes
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t-2 border-black pt-8">
            <h3 className="text-2xl font-bold font-display uppercase mb-4">Get Involved</h3>
            <ul className="space-y-3 text-gray-700">
              <li>Submit your band or show to the directory or calendar</li>
              <li>
                Join the{" "}
                <a
                  href="https://discord.gg/provomusicscene"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Provo Music Scene Discord server
                </a>
              </li>
              <li>
                Spread awareness in the community — tell your bandmates, your gigmates, your fans,
                your friends. Anyone and everyone in Utah County is welcome.
              </li>
              <li>
                Support the project through{" "}
                <a
                  href="https://ko-fi.com/provomusicscene"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Ko-fi
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t-2 border-black pt-8">
            <p className="text-gray-600">
              Questions?{" "}
              <a href="mailto:misc.provomusic@gmail.com" className="underline hover:no-underline">
                misc.provomusic@gmail.com
              </a>
            </p>
            <p className="text-gray-500 mt-2 text-base">
              Connecting artists, shows, and audiences across Utah County
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
