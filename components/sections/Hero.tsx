"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { SquareTerminal, X } from "lucide-react";

// styled-components inside the library is client-only — skip SSR to avoid
// hydration/registry issues and keep it out of the initial bundle.
const HeroTerminalPanel = dynamic(
	() => import("@/components/terminal/HeroTerminalPanel"),
	{
		ssr: false,
		loading: () => (
			<div className="flex h-[clamp(380px,58vh,560px)] w-full items-center justify-center rounded-xl border border-line font-mono text-[13px] text-fg-muted">
				booting zaidsh…
			</div>
		),
	},
);

const TERMINAL_TAGLINES = [
	"you found the shell, now what?",
	"curiosity: approved.",
	"recruiters scroll. engineers hack.",
];

export default function Hero() {
	const ref = useRef<HTMLElement>(null);
	const [terminalOpen, setTerminalOpen] = useState(false);
	const [tagline, setTagline] = useState(TERMINAL_TAGLINES[0]);
	const [isMac, setIsMac] = useState(false);

	// Keep a ref of the open state so the (mount-only) keydown listener can read
	// the latest value without re-subscribing on every toggle.
	const openRef = useRef(terminalOpen);
	openRef.current = terminalOpen;

	const openTerminal = () => {
		setTagline(
			TERMINAL_TAGLINES[Math.floor(Math.random() * TERMINAL_TAGLINES.length)],
		);
		setTerminalOpen(true);
	};

	// Detect platform for the shortcut hint (⌘ on macOS, Ctrl elsewhere).
	useEffect(() => {
		const platform =
			(navigator as Navigator & { userAgentData?: { platform?: string } })
				.userAgentData?.platform ||
			navigator.platform ||
			navigator.userAgent;
		setIsMac(/mac|iphone|ipad|ipod/i.test(platform));
	}, []);

	// Cmd/Ctrl+J toggles the terminal. preventDefault stops Chrome's default
	// Ctrl+J (downloads) from firing.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
				e.preventDefault();
				if (openRef.current) {
					setTerminalOpen(false);
				} else {
					openTerminal();
				}
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	useEffect(() => {
		if (terminalOpen) return;
		const ctx = gsap.context(() => {
			gsap.from(".hero-line", {
				opacity: 0,
				y: 28,
				duration: 0.9,
				stagger: 0.12,
				ease: "power3.out",
				delay: 0.1,
			});
			gsap.from(".hero-sub", {
				opacity: 0,
				y: 14,
				duration: 0.7,
				ease: "power2.out",
				delay: 0.55,
			});
		}, ref);
		return () => ctx.revert();
	}, [terminalOpen]);

	return (
		<section
			ref={ref}
			className="min-h-screen flex flex-col justify-center pt-14"
		>
			<div className="container relative">
				{terminalOpen ? (
					<div className="terminal-enter">
						<div className="mb-4 flex items-center justify-between">
							<span className="text-fg-muted">{tagline}</span>
							<button
								onClick={() => setTerminalOpen(false)}
								aria-label="Close terminal"
								className="flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
							>
								<span className="label">esc</span>
								<X size={15} strokeWidth={1.5} />
							</button>
						</div>
						<HeroTerminalPanel
							onClose={() => setTerminalOpen(false)}
						/>
					</div>
				) : (
					<>
						{/* Status */}
						<div className="hero-line mb-10 flex items-center justify-between gap-2">
							<div className="flex items-center gap-2">
								<span
									className="inline-block h-1.5 w-1.5 rounded-full bg-green-500"
									aria-hidden
								/>
								<span className="label">
									Available for work
								</span>
							</div>
							<div className="group relative md:flex items-center hidden">
								<button
									type="button"
									onClick={openTerminal}
									aria-label="Open interactive terminal"
									className="cursor-pointer text-fg-muted transition-colors hover:text-fg"
								>
									<SquareTerminal className="animate-pulse" size={20} strokeWidth={1.5} />
								</button>
								{/* Shortcut hint on hover */}
								<span className="pointer-events-none absolute right-0 top-full z-10 mt-2 flex items-center gap-1 whitespace-nowrap rounded-md border border-line bg-bg px-2 py-1 font-mono text-[11px] text-fg-muted opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
									<kbd className="font-mono">{isMac ? "⌘" : "Ctrl"}</kbd>
									<span className="opacity-60">+</span>
									<kbd className="font-mono">J</kbd>
								</span>
							</div>
						</div>

						{/* Name */}
						<h1 className="mb-8 overflow-hidden text-[clamp(60px,12vw,130px)] font-bold leading-[0.92] tracking-[-0.035em]">
							<span className="hero-line block text-fg">
								Md Zaid
							</span>
							<span className="hero-line block text-fg">
								Siddiqui
							</span>
						</h1>

						{/* Role line */}
						<p className="hero-sub mb-12 max-w-[480px] text-[clamp(16px,2.2vw,20px)] font-light leading-[1.55] text-fg-muted">
							Software engineer. I build APIs, search
							infrastructure, and AI pipelines at scale. Currently
							building{" "}
							<a
								href="https://discovry.app"
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium text-fg underline underline-offset-[3px]"
							>
								Discovry
							</a>
							.
						</p>

						{/* CTAs */}
						<div className="hero-sub flex flex-wrap items-center gap-4">
							<a
								href="#experience"
								className="inline-flex items-center gap-2 rounded-full bg-fg px-[22px] py-2.5 text-[13px] font-medium text-bg no-underline transition-opacity hover:opacity-75"
							>
								See my work
								<svg
									width="13"
									height="13"
									viewBox="0 0 13 13"
									fill="none"
								>
									<path
										d="M2 6.5h9M7 2.5l4 4-4 4"
										stroke="currentColor"
										strokeWidth="1.3"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</a>
							<a
								href="mailto:zaidsidd360@gmail.com"
								className="link text-[13px]"
							>
								zaidsidd360@gmail.com
							</a>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
