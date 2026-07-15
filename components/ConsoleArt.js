"use client";

import { useEffect } from "react";

export default function ConsoleArt() {
  useEffect(() => {
    // Only run in browser, and only run once
    if (typeof window === "undefined" || window.__consoleArtShown) return;
    window.__consoleArtShown = true;

    const catArt = `
 /\\_/\\   Hey there, fellow developer!
( o.o )  Looking under the hood?
 > ^ <   I'm Ubaid. Let's build something awesome.
    `;
    
    console.log(
      \`%c\${catArt}\`,
      "color: #a67c52; font-family: monospace; font-size: 14px; font-weight: bold;"
    );
    console.log(
      "%cCheck out my GitHub: https://github.com/notUbaid",
      "color: #a3e635; font-size: 12px; font-weight: bold;"
    );
  }, []);

  return null;
}
