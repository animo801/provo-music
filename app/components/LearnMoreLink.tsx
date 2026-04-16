"use client";

import Link from "next/link";

export default function LearnMoreLink({ href }: { href: string }) {
  function handleClick() {
    sessionStorage.setItem("listScrollY", String(window.scrollY));
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="flex-1 bg-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors text-center"
    >
      See details{" "}
    </Link>
  );
}
