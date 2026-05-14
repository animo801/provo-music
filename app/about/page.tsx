import Header from "@/app/components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#E2F6FF]">
      <Header />

      <main className="px-4 md:px-8 pt-12 pb-24 max-w-[900px] mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-7xl font-bold font-display leading-none uppercase mb-6">
            About
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Welcome to ProvoMusicScene.com
          </p>
        </div>

        <div className="space-y-10 text-lg leading-relaxed">
          <p>
            ProvoMusicScene.com addresses fragmented local music information by creating a shared,
            open-access information layer that brings together local shows, artists, and venues into
            one reliable, centralized hub for the Utah County music scene.
          </p>

          <p>
            ProvoMusicScene helps you discover shows, find artists, and stay informed about Utah
            County&apos;s music community — without digging through stories, messages, emails, and
            individual venue calendars.
          </p>

          <p className="font-bold">No genre bias, no pay-to-play, no gatekeeping.</p>

          <div>
            <h3 className="text-2xl font-bold font-display uppercase mb-4">What&apos;s included</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Community-powered directory</li>
              <li>Centralized public event calendar</li>
              <li>Artist submission and discovery tools</li>
              <li>Real-time scene analytics and data collection</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-display uppercase mb-4">What we&apos;re not</h3>
            <ul className="space-y-2 text-gray-700">
              <li>A promotion or booking service</li>
              <li>A curated &ldquo;best of&rdquo; list with preferential visibility</li>
              <li>Pay-to-play promotion</li>
              <li>A replacement for venues or media</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-display uppercase mb-4">Get involved</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Submit bands and shows</li>
              <li>Join our Discord server</li>
              <li>Promote within the community</li>
              <li>Support us via Ko-fi</li>
            </ul>
          </div>

          <div className="border-t-2 border-black pt-8">
            <p className="text-gray-600">
              Questions?{" "}
              <a
                href="mailto:misc.provomusic@gmail.com"
                className="underline hover:no-underline"
              >
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
