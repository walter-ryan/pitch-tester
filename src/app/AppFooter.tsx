import Image from "next/image";

export default function AppFooter() {
    return (
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            <span className="text-[var(--foreground)]">PitchTester, created and maintained by Walter Ryan</span>

            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://github.com/walter-ryan/pitch-tester"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    aria-hidden
                    src="/github-mark.svg"
                    alt="GitHub icon"
                    width={16}
                    height={16}
                />
                View this project on GitHub
            </a>
        </footer>
    );
}
