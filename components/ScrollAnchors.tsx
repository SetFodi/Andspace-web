"use client";

import { useEffect } from "react";

export function ScrollAnchors() {
  useEffect(() => {
    const root = document.getElementById("site-scroll");
    if (!root) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a[href^="#"]');
      if (!link || !(link instanceof HTMLAnchorElement)) return;

      const id = link.hash.slice(1);
      if (!id) return;

      const section = document.getElementById(id);
      if (!section) return;

      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return null;
}
