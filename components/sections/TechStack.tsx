"use client";

import { useEffect, useRef } from "react";
import StackIcon from "tech-stack-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger);

const STACK = [
	{ name: "nextjs", label: "Next.js" },
	{ name: "react", label: "React" },
	{ name: "typescript", label: "TypeScript" },
	{ name: "tailwindcss", label: "Tailwind" },
	{ name: "shadcnui", label: "Shadcn UI" },
	{ name: "zustand", label: "Zustand" },
	{ name: "nodejs", label: "Node.js" },
	{ name: "expressjs", label: "Express" },
	{ name: "prisma", label: "Prisma" },
	{ name: "postgresql", label: "PostgreSQL" },
	{ name: "mongodb", label: "MongoDB" },
	{ name: "redis", label: "Redis" },
	{ name: "aws", label: "AWS" },
	{ name: "ec2", label: "AWS EC2" },
	{ name: "git", label: "Git" },
	{ name: "github", label: "GitHub" },
	{ name: "postman", label: "Postman" },
	{ name: "arc", label: "Arc" },
	{ name: "cursor", label: "Cursor" },
	{ name: "claude", label: "Claude" },
];

export default function TechStack() {
	const sectionRef = useRef<HTMLElement>(null);
	const { theme } = useTheme();

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".stack-item",
				{ opacity: 0, y: 10 },
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
					stagger: 0.05,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 82%",
						once: true,
					},
				},
			);
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} className="py-12 md:py-16">
			<div className="container">
				<div className="divider mb-16" />

				<div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-8 sm:gap-16 items-start">
					<span
						className="label font-bold"
						style={{ color: "var(--fg-muted)", paddingTop: "6px" }}
					>
						Stack
					</span>

					<div className="stack-grid">
						{STACK.map((tech) => (
							<div
								key={tech.name}
								className="stack-item"
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									gap: "8px",
									opacity: 0,
								}}
							>
								<StackIcon
									name={tech.name}
									variant={
										tech.name === "nextjs" ||
										tech.name === "expressjs" ||
										tech.name === "socketio" ||
										tech.name === "github" ||
										tech.name === "shadcnui"
											? (theme as "dark" | "light")
											: "grayscale"
									}
									style={{ width: "40px", height: "40px" }}
								/>
								<span
									style={{
										fontSize: "10px",
										fontFamily: "Ubuntu Mono, monospace",
										color: "var(--fg-muted)",
										textAlign: "center",
									}}
								>
									{tech.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
