"use client";

import { useEffect, useState } from "react";

// What I'm probably doing, in 2-hour blocks of Hyderabad time (index = hour / 2).
const STATUS_BY_SLOT = [
	"Asleep, or pretending to be.", // 12 to 2 am
	"Asleep. Unless prod is down.", // 2 to 4 am
	"Fully asleep. Leave a message.", // 4 to 6 am
	"Waking up. Coffee first.", // 6 to 8 am
	"Coffee, then code.", // 8 to 10 am
	"At work. Probably in a standup.", // 10 am to 12 pm
	"Lunch, then back to the queries.", // 12 to 2 pm
	"At work, deep in a query plan.", // 2 to 4 pm
	"At work, chasing a slow endpoint.", // 4 to 6 pm
	"Just got off work. Let me chill.", // 6 to 8 pm
	"Side projects o'clock.", // 8 to 10 pm
	"Shipping things I shouldn't at this hour.", // 10 pm to 12 am
];

// Saturday and Sunday, same 2-hour blocks.
const WEEKEND_STATUS_BY_SLOT = [
	"Asleep, or pretending to be.", // 12 to 2 am
	"Asleep. Unless prod is down.", // 2 to 4 am
	"Fully asleep. Leave a message.", // 4 to 6 am
	"Weekend. No alarm set.", // 6 to 8 am
	"Still in bed. It's the weekend.", // 8 to 10 am
	"Slow breakfast. No standups today.", // 10 am to 12 pm
	"Lunch, then maybe a side project.", // 12 to 2 pm
	"Building something nobody asked for.", // 2 to 4 pm
	"Out. Touching grass, allegedly.", // 4 to 6 pm
	"Weekend evening. Let me chill.", // 6 to 8 pm
	"Watching Silicon Valley, probably.", // 8 to 10 pm
	"Shipping things I shouldn't at this hour.", // 10 pm to 12 am
];

function hyderabadNow() {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "Asia/Kolkata",
		weekday: "short",
		hour: "numeric",
		minute: "2-digit",
		hourCycle: "h23",
	}).formatToParts(new Date());
	const weekday = parts.find((p) => p.type === "weekday")?.value;
	const isWeekend = weekday === "Sat" || weekday === "Sun";
	const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
	const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
	const h12 = hour % 12 === 0 ? 12 : hour % 12;
	return {
		time: `${h12}:${minute} ${hour < 12 ? "am" : "pm"}`,
		status: (isWeekend ? WEEKEND_STATUS_BY_SLOT : STATUS_BY_SLOT)[Math.floor(hour / 2)],
	};
}

type Mode = "dare" | "clock";

export default function HeroStatus({
	isMac,
	onOpenTerminal,
}: {
	isMac: boolean;
	onOpenTerminal: () => void;
}) {
	// Decided on the client only, so server HTML never disagrees with the random pick or the clock.
	const [mode, setMode] = useState<Mode | null>(null);
	const [now, setNow] = useState<ReturnType<typeof hyderabadNow> | null>(null);

	useEffect(() => {
		// The terminal is desktop-only, so phones always get the clock.
		const hasTerminal = window.matchMedia("(min-width: 768px)").matches;
		setMode(hasTerminal && Math.random() < 0.5 ? "dare" : "clock");
		setNow(hyderabadNow());
		const id = setInterval(() => setNow(hyderabadNow()), 30_000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="flex min-h-6 items-start gap-2.5 text-[15px] leading-6 text-fg-muted">
			<span
				className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
				aria-hidden
			/>
			{mode === "dare" && (
				<span>
					Press{" "}
					<button
						type="button"
						onClick={onOpenTerminal}
						aria-label="Open interactive terminal"
						className="inline-flex cursor-pointer items-center gap-1 align-baseline text-fg"
					>
						<kbd className="rounded border border-line px-1.5 font-mono text-[13px]">
							{isMac ? "⌘" : "Ctrl"}
						</kbd>
						<kbd className="rounded border border-line px-1.5 font-mono text-[13px]">
							J
						</kbd>
					</button>
					. I dare you.
				</span>
			)}
			{mode === "clock" && now && (
				<span>
					<span className="text-fg">{now.time}</span>
					<span aria-hidden> · </span>
					{now.status}
				</span>
			)}
		</div>
	);
}
