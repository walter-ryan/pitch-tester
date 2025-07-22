"use client";
import { useState, useEffect } from "react";
import { createToneController } from "./tone";
import GameShell from "./GameShell";
import NoteSelector from "./NoteSelector";

const tone = createToneController();

// Generate all piano notes from A0 (27.5 Hz) to C8 (4186.01 Hz)
function getAllPianoNotes() {
    const notes = [];
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    for (let octave = 0; octave <= 8; octave++) {
        for (let i = 0; i < noteNames.length; i++) {
            const noteName = noteNames[i] + octave;
            // Calculate frequency
            // A4 = 440 Hz, MIDI 69
            const midi = octave * 12 + i;
            const freq = 440 * Math.pow(2, (midi - 69) / 12);
            // Piano range: A0 (21) to C8 (108)
            if (midi >= 21 && midi <= 108) {
                notes.push({ name: noteName, freq: parseFloat(freq.toFixed(2)) });
            }
        }
    }
    return notes;
}

const NOTES = getAllPianoNotes();

export default function NoteGame({ registerCancel }: { registerCancel?: (fn: () => void) => void }) {
    const [selected, setSelected] = useState(NOTES.find(n => n.name === "C4") || NOTES[0]);
    const [target, setTarget] = useState<typeof NOTES[0] | null>(null);
    const [result, setResult] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);

    function startGame() {
        const randomIdx = Math.floor(Math.random() * NOTES.length);
        const randomNote = NOTES[randomIdx];
        setTarget(randomNote);
        setSelected(NOTES.find(n => n.name === "C4") || NOTES[0]);
        setResult("");
        setGameStarted(true);
        setIsSelecting(false);
        tone.stop();
        tone.start(randomNote.freq);
        setTimeout(() => {
            tone.stop();
            setTimeout(() => {
                setIsSelecting(true);
                tone.start((NOTES.find(n => n.name === "C4") || NOTES[0]).freq);
            }, 1000);
        }, 3000);
    }

    function handleNoteChange(note: typeof NOTES[0]) {
        setSelected(note);
        if (gameStarted && isSelecting && tone.isPlaying()) {
            tone.setFrequency(note.freq);
        }
    }

    function submitGuess() {
        if (!target) return;
        const selectedIdx = NOTES.findIndex(n => n.name === selected.name);
        const targetIdx = NOTES.findIndex(n => n.name === target.name);
        const semitoneDiff = Math.abs(selectedIdx - targetIdx);
        if (selected.name === target.name) {
            setResult(`🎉 Correct! You matched the note exactly: ${target.name} (${target.freq} Hz)`);
        } else {
            setResult(`You chose ${selected.name} (${selected.freq} Hz). The correct note was ${target.name} (${target.freq} Hz). You were off by ${semitoneDiff} semitone${semitoneDiff === 1 ? "" : "s"}.`);
        }
        setGameStarted(false);
        tone.stop();
    }

    function cancelGame() {
        setGameStarted(false);
        setIsSelecting(false);
        setResult("");
        setSelected(NOTES.find(n => n.name === "C4") || NOTES[0]);
        setTarget(null);
        tone.stop();
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
            listenMessage="Listen to the target note..."
        >
            {gameStarted && (
                <NoteSelector
                    notes={NOTES}
                    selected={selected}
                    isSelecting={isSelecting}
                    onChange={handleNoteChange}
                />
            )}
        </GameShell>
    );
}
