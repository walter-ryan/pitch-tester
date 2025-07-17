"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);

    return (
        <button
            className="absolute top-4 right-4 z-10 rounded-full w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle dark mode"
            type="button"
        >
            {dark ? (
                // Sun SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <g stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </g>
                </svg>
            ) : (
                // Moon SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21 12.79A9 9 0 0 1 11.21 3a1 1 0 0 0-1.13 1.32A7 7 0 1 0 19.68 13.92 1 1 0 0 0 21 12.79Z" />
                </svg>
            )}
        </button>
    );
}
