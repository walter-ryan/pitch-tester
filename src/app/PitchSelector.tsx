"use client";
import React from "react";

interface PitchSelectorProps {
    frequency: number;
    step: number;
    isSelecting: boolean;
    onChange: (freq: number) => void;
    minFreq: number;
    maxFreq: number;
}

export default function PitchSelector({ frequency, step, isSelecting, onChange, minFreq, maxFreq }: PitchSelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <button
                className="button-base button-secondary rounded-full px-3 py-2 text-lg font-bold"
                onClick={() => onChange(Math.max(minFreq, frequency - step))}
                aria-label="Decrease frequency"
                disabled={!isSelecting}
            >
                -
            </button>
            <span className="rounded bg-[var(--accent-mid)] text-[var(--background)] px-4 py-2 font-semibold min-w-[90px] text-center tabular-nums">
                {frequency} Hz
            </span>
            <button
                className="button-base button-secondary rounded-full px-3 py-2 text-lg font-bold"
                onClick={() => onChange(Math.min(maxFreq, frequency + step))}
                aria-label="Increase frequency"
                disabled={!isSelecting}
            >
                +
            </button>
        </div>
    );
}
