"use client";
import React from "react";

interface NoteSelectorProps {
    notes: { name: string; freq: number }[];
    selected: { name: string; freq: number };
    isSelecting: boolean;
    onChange: (note: { name: string; freq: number }) => void;
}

export default function NoteSelector({ notes, selected, isSelecting, onChange }: NoteSelectorProps) {
    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
            <input
                type="range"
                min={0}
                max={notes.length - 1}
                value={notes.findIndex(n => n.name === selected.name)}
                onChange={e => onChange(notes[Number(e.target.value)])}
                disabled={!isSelecting}
                className="w-full accent-[var(--accent-mid)]"
            />
            <div className="flex justify-between w-full text-xs text-[var(--foreground)] opacity-70 select-none">
                <span>{notes[0].name}</span>
                <span>{notes[notes.length - 1].name}</span>
            </div>
            <div className="flex gap-4 mt-2">
                <button
                    className="button-base button-secondary"
                    onClick={() => {
                        const idx = notes.findIndex(n => n.name === selected.name);
                        if (idx > 0) onChange(notes[idx - 1]);
                    }}
                    disabled={!isSelecting || notes.findIndex(n => n.name === selected.name) === 0}
                >
                    -
                </button>
                <button
                    className="button-base button-secondary"
                    onClick={() => {
                        const idx = notes.findIndex(n => n.name === selected.name);
                        if (idx < notes.length - 1) onChange(notes[idx + 1]);
                    }}
                    disabled={!isSelecting || notes.findIndex(n => n.name === selected.name) === notes.length - 1}
                >
                    +
                </button>
            </div>
            <span className="rounded bg-[var(--accent-mid)] text-[var(--background)] px-4 py-2 font-semibold min-w-[90px] text-center tabular-nums">
                {selected.name} ({selected.freq} Hz)
            </span>
        </div>
    );
}
