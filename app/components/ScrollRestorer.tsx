"use client";

import { useEffect } from "react";

export default function ScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem("listScrollY");
    if (saved) {
      window.scrollTo({ top: Number(saved), behavior: "instant" });
      sessionStorage.removeItem("listScrollY");
    }
  }, []);

  return null;
}
