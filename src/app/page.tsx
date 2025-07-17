"use client";
import Image from "next/image";
import { createToneController } from "./tone";
import { useState, useEffect } from "react";

const tone = createToneController();

export default function Home() {
  const [frequency, setFrequency] = useState(440);
  const [target, setTarget] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");
  const [gameStarted, setGameStarted] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [dark, setDark] = useState(false);
  const [step, setStep] = useState(10);

  // Toggle dark mode class on document root
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // Range for random pitch
  const minFreq = 200;
  const maxFreq = 1000;

  function startGame() {
    // Only allow round numbers (multiples of 10) within the range
    const steps = Math.floor((maxFreq - minFreq) / 10) + 1;
    const randomStep = Math.floor(Math.random() * steps);
    const random = minFreq + randomStep * 10;
    setTarget(random);
    setFrequency(440);
    setResult("");
    setGameStarted(true);
    setIsSelecting(false);
    // Play target tone for 3 seconds, then pause 1 second, then allow selection
    tone.stop();
    tone.start(random);
    setTimeout(() => {
      tone.stop();
      setTimeout(() => {
        setIsSelecting(true);
        tone.start(440); // Start playing the initial guess frequency
      }, 1000);
    }, 3000);
  }

  function handleFrequencyChange(newFreq: number) {
    setFrequency(newFreq);
    if (gameStarted && isSelecting && tone.isPlaying()) {
      tone.setFrequency(newFreq);
    }
  }

  function submitGuess() {
    if (target == null) return;
    const diff = Math.abs(frequency - target);
    setResult(`You were off by ${diff} Hz. The correct pitch was ${target} Hz.`);
    setGameStarted(false);
    tone.stop();
  }

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button
        className="absolute top-4 right-4 z-10 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-2 font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle dark mode"
        type="button"
      >
        {dark ? "☀️" : "🌙"}
      </button>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="font-[family-name:var(--font-geist-mono)] text-4xl font-bold text-center">
          Welcome to the Pitch Tester
        </h1>
        <p className="text-lg text-center">
          Use this tool to test and compare different audio frequencies.
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 mb-2">
            <label htmlFor="step" className="text-sm font-medium">Step size:</label>
            <input
              id="step"
              type="number"
              min={1}
              max={200}
              value={step}
              onChange={e => setStep(Math.max(1, Math.min(200, Number(e.target.value))))}
              className="w-16 rounded border px-2 py-1 text-center"
            />
            <span className="text-sm">Hz</span>
          </div>
          {!gameStarted && (
            <button
              className="rounded bg-green-600 text-white px-4 py-2 font-semibold hover:bg-green-700 transition-colors"
              onClick={startGame}
            >
              Start New Game
            </button>
          )}

          {gameStarted && (
            <>
              <div className="flex items-center gap-2">
                <button
                  className="rounded-full bg-gray-200 text-black px-3 py-2 font-bold text-lg hover:bg-gray-300 transition-colors"
                  onClick={() => handleFrequencyChange(Math.max(20, frequency - step))}
                  aria-label="Decrease frequency"
                  disabled={!isSelecting}
                >
                  -
                </button>
                <span className="rounded bg-blue-600 text-white px-4 py-2 font-semibold">
                  {frequency} Hz
                </span>
                <button
                  className="rounded-full bg-gray-200 text-black px-3 py-2 font-bold text-lg hover:bg-gray-300 transition-colors"
                  onClick={() => handleFrequencyChange(Math.min(20000, frequency + step))}
                  aria-label="Increase frequency"
                  disabled={!isSelecting}
                >
                  +
                </button>
              </div>
              <button
                className="rounded bg-purple-600 text-white px-4 py-2 font-semibold hover:bg-purple-700 transition-colors mt-2"
                onClick={submitGuess}
                disabled={!isSelecting}
              >
                Submit Guess
              </button>
              {!isSelecting && (
                <div className="mt-2 text-base text-gray-600">Listen to the target tone...</div>
              )}
            </>
          )}

          {result && (
            <div className="mt-4 text-lg font-semibold text-center text-purple-700 dark:text-purple-300">
              {result}
            </div>
          )}
        </div>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
