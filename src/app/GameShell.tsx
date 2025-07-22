"use client";
import React, { useEffect } from "react";

interface GameShellProps {
    gameStarted: boolean;
    isSelecting: boolean;
    result: string;
    onStart: () => void;
    onSubmit: () => void;
    onCancel?: () => void;
    canSubmit: boolean;
    children: React.ReactNode;
    startLabel?: string;
    submitLabel?: string;
    cancelLabel?: string;
    listenMessage?: string;
}

export default function GameShell({
    gameStarted,
    isSelecting,
    result,
    onStart,
    onSubmit,
    onCancel,
    canSubmit,
    children,
    startLabel = "Start New Game",
    submitLabel = "Submit Guess",
    cancelLabel = "Cancel",
    listenMessage = "Listen to the target...",
}: GameShellProps) {
    // Cancel any playing tone if the component unmounts (e.g., gamemode changes)
    useEffect(() => {
        return () => {
            // Try to stop any global tone controller if it exists
            if (typeof window !== "undefined" && "tone" in window) {
                const tone = (window as unknown as { tone?: { stop?: () => void } }).tone;
                tone?.stop?.();
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            {!gameStarted && (
                <button className="button-base button-secondary" onClick={onStart}>
                    {startLabel}
                </button>
            )}
            {gameStarted && (
                <>
                    {children}
                    <div className="flex gap-2 mt-2">
                        <button
                            className="button-base button-primary"
                            onClick={onSubmit}
                            disabled={!canSubmit}
                        >
                            {submitLabel}
                        </button>
                        {onCancel && (
                            <button
                                className="button-base button-secondary"
                                onClick={onCancel}
                            >
                                {cancelLabel}
                            </button>
                        )}
                    </div>
                    {!isSelecting && (
                        <div className="mt-2 text-base text-[var(--foreground)] opacity-80">{listenMessage}</div>
                    )}
                </>
            )}
            <div className="mt-4 text-lg font-semibold text-center text-[var(--foreground)] min-h-[2.5em] flex items-center justify-center">
                {result || <span className="opacity-0">placeholder</span>}
            </div>
        </div>
    );
}
