"use client";
import DarkModeToggle from "./DarkModeToggle";
import PitchGame from "./PitchGame";
import NoteGame from "./NoteGame";
import { useState, useEffect, useRef } from "react";
import AppFooter from "./AppFooter";
import LogoSVG from "./LogoSVG";

export default function Home() {
  const [gameType, setGameType] = useState<"pitch" | "note">("pitch");
  const cancelRef = useRef<(() => void) | null>(null);

  // Stop all tones whenever the gameType changes
  useEffect(() => {
    if (typeof window !== "undefined" && "tone" in window) {
      const tone = (window as unknown as { tone?: { stop?: () => void } }).tone;
      tone?.stop?.();
    }
  }, [gameType]);

  // Call cancel when game mode changes
  function handleGameTypeChange(type: "pitch" | "note") {
    if (cancelRef.current) cancelRef.current();
    setGameType(type);
  }

  // Pass a registerCancel function to child, which sets cancelRef.current
  function registerCancel(fn: () => void) {
    cancelRef.current = fn;
  }

  return (
    <div className="relative grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <DarkModeToggle />
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center w-full max-w-md mx-auto">
        <div className="flex flex-col gap-4 w-full items-center mt-2 mb-2">
          <div className="flex flex-row items-center justify-center gap-4 w-full">
            <LogoSVG className="w-20 h-20 flex-shrink-0" />
            <div className="flex flex-col items-start">
              <h1 className="font-[family-name:var(--font-geist-mono)] text-4xl font-bold text-left">
                Welcome to the Pitch Tester
              </h1>
              <p className="text-lg text-left">
                Use this tool to test and compare different audio frequencies, or match
                musical notes by ear. Choose a game mode below!
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-2 mb-2">
            <button
              className={`button-base ${gameType === "pitch" ? "button-primary button-active" : "button-secondary"}`}
              onClick={() => handleGameTypeChange("pitch")}
            >
              Pitch Game
            </button>
            <button
              className={`button-base ${gameType === "note" ? "button-primary button-active" : "button-secondary"}`}
              onClick={() => handleGameTypeChange("note")}
            >
              Note Game
            </button>
          </div>
        </div>
        <div
          className="w-full bg-[var(--background)] rounded-2xl p-6 sm:p-8 flex flex-col items-center"
          style={{
            boxShadow: '0 8px 40px 0 var(--foreground), 0 2px 8px 0 rgba(0,0,0,0.10)',
            minHeight: '320px',
            height: '48vw',
            maxHeight: '520px',
            maxWidth: '100%',
            overflow: 'auto',
          }}
        >
          {gameType === "pitch"
            ? <PitchGame key="pitch" registerCancel={registerCancel} />
            : <NoteGame key="note" registerCancel={registerCancel} />}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
