"use client";

import { useEffect, useRef, useState } from "react";

export default function AddressDropdown({ address }: { address: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const encoded = encodeURIComponent(address);
  const appleMapsUrl = `https://maps.apple.com/?q=${encoded}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encoded}`;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-lg font-semibold text-gray-900 hover:underline text-left"
      >
        {address}
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-20 bg-white border-2 border-black rounded-sm shadow-md min-w-[160px]">
          <a
            href={appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-lg font-semibold hover:bg-black hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            Apple Maps
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-lg font-semibold hover:bg-black hover:text-white transition-colors border-t border-black/10"
            onClick={() => setOpen(false)}
          >
            Google Maps
          </a>
        </div>
      )}
    </div>
  );
}
