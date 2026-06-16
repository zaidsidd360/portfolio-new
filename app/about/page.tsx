import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "About",
  description:
    "Md Zaid Siddiqui is a software engineer in Hyderabad focused on search infrastructure, AI pipelines, and high-throughput APIs.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Zaid Siddiqui",
    description:
      "Software engineer focused on search infrastructure, AI pipelines, and high-throughput APIs.",
    url: "/about",
    type: "profile",
  },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 border-t border-line py-10 sm:grid-cols-[130px_1fr] sm:gap-16">
      <span className="label pt-1">{label}</span>
      <div className="max-w-[640px] space-y-4">{children}</div>
    </div>
  );
}

const prose =
  "text-[clamp(15px,2vw,17px)] font-light leading-[1.75] text-fg-muted";
const strong = "text-fg";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24">
        <div className="container">
          <span className="label">About</span>
          <h1 className="mb-10 mt-3 max-w-[760px] text-[clamp(30px,5.5vw,50px)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
            I care about the systems that stay fast under load.
          </h1>

          {/* Intro */}
          <div className={`max-w-[640px] space-y-5 ${prose}`}>
            <p>
              I&apos;m Zaid, a software engineer based in Hyderabad. I spend most of my
              time on the unglamorous parts of software that quietly decide whether a
              product feels good: latency, throughput, and what a single query really
              costs at scale. If something can be faster, I want to know why it
              isn&apos;t.
            </p>
            <p>
              I&apos;ve been building production systems for a couple of years now,
              mostly around <span className={strong}>search infrastructure</span>,{" "}
              <span className={strong}>AI pipelines</span>, and{" "}
              <span className={strong}>high-throughput APIs</span>. The thread through
              all of it is the same: take something slow or manual, find where the time
              actually goes, and make it disappear. B.Tech in Computer Science and
              Engineering.
            </p>
          </div>

          {/* Sections */}
          <div className="mt-14">
            <Row label="Now">
              <p className={prose}>
                I&apos;m a software engineer at <span className={strong}>Vujis</span>,
                working on search and AI features that run against real production load.
                On the side I&apos;m building{" "}
                <a
                  href="https://discovry.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Discovry
                </a>
                , an AI-first tool that automates Google Business Profile management for
                agencies: posts, review replies, rank tracking, and profile health
                across every client location. It&apos;s where I get to own the whole
                stack and ship on my own terms.
              </p>
            </Row>

            <Row label="How I work">
              <p className={prose}>
                I&apos;m happiest when I can measure the thing I&apos;m improving. I
                reach for profiling before intuition, keep deterministic code around the
                parts that genuinely need judgment, and care a lot about abstractions
                someone else can still read six months later. I&apos;d rather ship a
                narrow thing that works than a broad thing that mostly does.
              </p>
            </Row>

            <Row label="Outside the editor">
              <p className={prose}>
                When I&apos;m not building, I&apos;m usually drawn to the same things in
                different forms: astronomy, design, and open source. I maintain{" "}
                <a
                  href="https://www.npmjs.com/package/@zqui/react-terminal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  react-terminal
                </a>
                , a small Bash-like terminal component for React. The one running on the
                home page is my own library. Tinkering in public is half the fun.
              </p>
            </Row>

            <Row label="Elsewhere">
              <div className="flex flex-col gap-2.5">
                {[
                  { k: "Email", v: "zaidsidd360@gmail.com", href: "mailto:zaidsidd360@gmail.com" },
                  { k: "GitHub", v: "github.com/zaidsidd360", href: "https://github.com/zaidsidd360" },
                  { k: "LinkedIn", v: "linkedin.com/in/zaidsidd360", href: "https://linkedin.com/in/zaidsidd360" },
                  { k: "X", v: "x.com/zaidsidd360", href: "https://x.com/zaidsidd360" },
                  { k: "Resume", v: "download (PDF)", href: "/MdZaidSiddiquiResume.pdf" },
                ].map(({ k, v, href }) => (
                  <div key={k} className="flex items-baseline gap-6">
                    <span className="label w-16 shrink-0">{k}</span>
                    <a
                      href={href}
                      target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="link text-[14px]"
                    >
                      {v}
                    </a>
                  </div>
                ))}
              </div>
            </Row>
          </div>
        </div>
      </main>
    </>
  );
}
