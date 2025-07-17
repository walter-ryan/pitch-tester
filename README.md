# Pitch Tester

Pitch Tester is a web app for training your ear to recognize and match musical pitches. Built with Next.js, it lets you test your ability to match a randomly played frequency using interactive audio controls.

## Features

- **Pitch Matching Game:**
  - Click "Start New Game" to hear a random target tone (200–1000 Hz).
  - The target tone plays for 3 seconds, then pauses for 1 second.
  - After the pause, use the plus and minus buttons to adjust your guess frequency.
  - You can set the frequency step size for fine or coarse adjustments.
  - The app plays your guess tone continuously as you adjust it.
  - Submit your guess to see how close you were to the original pitch.
- **Dark Mode:** Toggle between light and dark themes with a button in the top right corner.
- **Responsive Design:** Works on desktop and mobile.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click **Start New Game**.
2. Listen to the target tone.
3. After the pause, adjust the frequency using the plus/minus buttons (set your preferred step size).
4. When you think your guess matches the target, click **Submit Guess**.
5. See how close you were!

## Technologies Used
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Web Audio API

---

Feel free to contribute or suggest improvements!
