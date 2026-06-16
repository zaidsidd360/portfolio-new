import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { EXPERIENCE } from "@/lib/data";
import { ExperienceRole } from "@/components/ExperienceRole";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Where Md Zaid Siddiqui has worked and what he shipped: search infrastructure, AI pipelines, and high-throughput systems across engineering roles.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience · Zaid Siddiqui",
    description:
      "Systems built and the problems that made them interesting, across engineering roles.",
    url: "/experience",
    type: "profile",
  },
};

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24">
        <div className="container">
          <span className="label">Experience</span>
          <h1 className="mb-16 mt-3 max-w-[760px] text-[clamp(30px,5.5vw,50px)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
            Systems I&apos;ve built, and the problems that made them interesting.
          </h1>

          <div className="space-y-16">
            {EXPERIENCE.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="border-t border-line pt-12 first:border-t-0 first:pt-0"
              >
                <ExperienceRole job={job} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
