"use client";
import React, { useState, useRef, useEffect } from "react";
import { createToneController } from "./tone";
import GameShell from "./GameShell";
import PitchSelector from "./PitchSelector";

const tone = createToneController();

export default function PitchGame({ registerCancel }: { registerCancel?: (fn: () => void) => void }) {
    const [frequency, setFrequency] = useState(440);
    const [target, setTarget] = useState<number | null>(null);
    const [result, setResult] = useState<string>("");
    const [gameStarted, setGameStarted] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [step, setStep] = useState(10);
    const timeouts = useRef<number[]>([]);

    // Range for random pitch
    const minFreq = 200;
    const maxFreq = 1000;

    function startGame() {
        const steps = Math.floor((maxFreq - minFreq) / 10) + 1;
        const randomStep = Math.floor(Math.random() * steps);
        const random = minFreq + randomStep * 10;
        setTarget(random);
        setFrequency(440);
        setResult("");
        setGameStarted(true);
        setIsSelecting(false);
        tone.stop();
        tone.start(random);
        // Store timeouts so they can be cleared on cancel
        timeouts.current.push(window.setTimeout(() => {
            tone.stop();
            timeouts.current.push(window.setTimeout(() => {
                setIsSelecting(true);
                tone.start(440);
            }, 1000));
        }, 3000));
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
        const percentOff = target !== 0 ? ((diff / target) * 100).toFixed(2) : "0";
        if (diff === 0) {
            setResult(`🎉 Correct! You matched the pitch exactly at ${target} Hz! (Your guess: ${frequency} Hz)`);
        } else {
            setResult(`You were off by ${diff} Hz (${percentOff}%). The correct pitch was ${target} Hz. Your guess: ${frequency} Hz.`);
        }
        setGameStarted(false);
        tone.stop();
    }

    function cancelGame() {
        setGameStarted(false);
        setIsSelecting(false);
        setResult("");
        setFrequency(440);
        setTarget(null);
        tone.stop();
        // Clear all pending timeouts
        timeouts.current.forEach(id => clearTimeout(id));
        timeouts.current = [];
    }

    // Register cancel logic with parent
    useEffect(() => {
        if (registerCancel) registerCancel(cancelGame);
        // Cleanup: unregister on unmount
        return () => {
            if (registerCancel) registerCancel(() => { });
        };
    }, [registerCancel]);

    return (
        <GameShell
            gameStarted={gameStarted}
            isSelecting={isSelecting}
            result={result}
            onStart={startGame}
            onSubmit={submitGuess}
            onCancel={cancelGame}
            canSubmit={isSelecting}
            startLabel="Start New Game"
            submitLabel="Submit Guess"
            cancelLabel="Cancel"
            listenMessage="Listen to the target tone..."
        >
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
            {gameStarted && (
                <PitchSelector
                    frequency={frequency}
                    step={step}
                    isSelecting={isSelecting}
                    onChange={handleFrequencyChange}
                    minFreq={20}
                    maxFreq={20000}
                />
            )}
        </GameShell>
    );
}
