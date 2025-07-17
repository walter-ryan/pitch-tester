export type ToneController = {
    start: (frequency: number) => void;
    stop: () => void;
    setFrequency: (frequency: number) => void;
    isPlaying: () => boolean;
};

export function createToneController(): ToneController {
    let audioCtx: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;

    function start(frequency: number) {
        stop();
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) {
            throw new Error('Web Audio API is not supported in this browser');
        }
        audioCtx = new AudioContextClass();
        oscillator = audioCtx.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        oscillator.connect(audioCtx.destination);
        oscillator.start();
    }

    function stop() {
        if (oscillator) {
            oscillator.stop();
            oscillator.disconnect();
            oscillator = null;
        }
        if (audioCtx) {
            audioCtx.close();
            audioCtx = null;
        }
    }

    function setFrequency(frequency: number) {
        if (oscillator) {
            oscillator.frequency.value = frequency;
        }
    }

    function isPlaying() {
        return !!oscillator;
    }

    return { start, stop, setFrequency, isPlaying };
}
