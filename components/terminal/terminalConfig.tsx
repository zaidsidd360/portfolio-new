"use client";

import type { CSSProperties, ReactElement } from "react";
import { themeBridge } from "./themeBridge";

/**
 * Terminal theme that piggybacks on the site's CSS variables, so the embedded
 * terminal automatically follows the light/dark theme toggle.
 */
export const monoTheme = {
  terminalBg: "transparent",
  topBarBg: "color-mix(in srgb, var(--fg) 4%, transparent)",
  promptColor: "var(--fg)",
  pwdColor: "var(--fg-muted)",
  textColor: "var(--fg-muted)",
  predictionColor: "var(--border)",
};

const RESUME_FILE = "/MdZaidSiddiquiResume.pdf";

// ---- small presentational helpers -----------------------------------------

const row: CSSProperties = { display: "flex", gap: "10px", lineHeight: 1.7 };
const key: CSSProperties = {
  color: "var(--fg)",
  minWidth: "88px",
  display: "inline-block",
  fontWeight: 500,
};
const link: CSSProperties = {
  color: "var(--fg)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
};
const dim: CSSProperties = { color: "var(--fg-muted)" };

function Block({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "2px 0 6px" }}>{children}</div>;
}

// ---- command outputs --------------------------------------------------------

function Help(): ReactElement {
  const cmds: [string, string][] = [
    ["help", "show this list"],
    ["whoami", "the short version"],
    ["experience", "where I've shipped (alias: work)"],
    ["contact", "how to reach me (alias: socials)"],
    ["resume", "download my resume as PDF"],
    ["ls", "list files in this pseudo-fs"],
    ["cat <file>", "read a file (try: cat about.txt)"],
    ["echo <text>", "print text"],
    ["theme <dark|light>", "switch the whole site's theme"],
    ["date", "current date & time"],
    ["clear", "clear the screen"],
  ];
  return (
    <Block>
      <div style={{ ...dim, marginBottom: "6px" }}>Available commands:</div>
      {cmds.map(([c, d]) => (
        <div key={c} style={row}>
          <span style={{ ...key, minWidth: "150px", fontFamily: "inherit" }}>{c}</span>
          <span style={dim}>{d}</span>
        </div>
      ))}
      <div style={{ ...dim, marginTop: "8px" }}>
        Tip: press the red dot (top-left) or hit <span style={{ color: "var(--fg)" }}>Esc</span> to close.
      </div>
    </Block>
  );
}

function Whoami(): ReactElement {
  return (
    <Block>
      <div style={{ color: "var(--fg)", fontWeight: 500 }}>Md Zaid Siddiqui</div>
      <div style={dim}>Software Engineer · Hyderabad, India</div>
      <div style={dim}>
        Building APIs, search infrastructure, and AI pipelines at scale. Currently at{" "}
        <a style={link} href="https://vujis.com" target="_blank" rel="noopener noreferrer">
          Vujis
        </a>
        , shipping{" "}
        <a style={link} href="https://discovry.app" target="_blank" rel="noopener noreferrer">
          Discovry
        </a>{" "}
        on the side.
      </div>
    </Block>
  );
}

function Experience(): ReactElement {
  const jobs = [
    {
      role: "Software Engineer",
      company: "Vujis",
      period: "Mar 2025 – Present",
      points: [
        "OpenAI pipelines processing 50k+ records/day, –60% manual analysis",
        "OpenSearch across 3+ modules, query time –72% (1.8s → 500ms)",
        "8+ Node.js APIs, latency –64%, throughput 10× (2k → 20k rows)",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Scallio Digital",
      period: "Aug 2024 – Feb 2025",
      points: [
        "Lead-nurturing platform, 5k+ users, render cycles –20%",
        "20+ REST endpoints on AWS w/ CI/CD, 99.9% uptime",
      ],
    },
    {
      role: "Software Developer",
      company: "Mocero Health",
      period: "Dec 2023 – Jul 2024",
      points: [
        "Notion-like markdown editor, 200+ users, crash rate –65%",
        "S3 storage, 1k+ daily uploads, upload latency –30%",
      ],
    },
  ];
  return (
    <Block>
      {jobs.map((j) => (
        <div key={j.company} style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ color: "var(--fg)", fontWeight: 500 }}>
              {j.role} · {j.company}
            </span>
            <span style={{ ...dim, fontSize: "0.85em" }}>{j.period}</span>
          </div>
          {j.points.map((p, i) => (
            <div key={i} style={{ ...dim, paddingLeft: "12px" }}>
              <span style={{ color: "var(--fg)" }}>–</span> {p}
            </div>
          ))}
        </div>
      ))}
      <div style={dim}>
        Full history in the resume — type <span style={{ color: "var(--fg)" }}>resume</span>.
      </div>
    </Block>
  );
}

function Contact(): ReactElement {
  const rows: [string, string, string][] = [
    ["email", "zaidsidd360@gmail.com", "mailto:zaidsidd360@gmail.com"],
    ["github", "github.com/zaidsidd360", "https://github.com/zaidsidd360"],
    ["linkedin", "linkedin.com/in/zaidsidd360", "https://linkedin.com/in/zaidsidd360"],
    ["building", "discovry.app", "https://discovry.app"],
  ];
  return (
    <Block>
      {rows.map(([label, value, href]) => (
        <div key={label} style={row}>
          <span style={key}>{label}</span>
          <a
            style={link}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            {value}
          </a>
        </div>
      ))}
      <div style={{ ...dim, marginTop: "6px" }}>Open to full-time roles and interesting projects.</div>
    </Block>
  );
}

function downloadResume(): ReactElement {
  if (typeof document !== "undefined") {
    const a = document.createElement("a");
    a.href = RESUME_FILE;
    a.download = "MdZaidSiddiquiResume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  return (
    <Block>
      <span style={dim}>
        Downloading <span style={{ color: "var(--fg)" }}>MdZaidSiddiquiResume.pdf</span> … if nothing
        happens,{" "}
        <a style={link} href={RESUME_FILE} target="_blank" rel="noopener noreferrer">
          click here
        </a>
        .
      </span>
    </Block>
  );
}

function setSiteTheme(arg?: string): ReactElement {
  const value = (arg || "").trim().toLowerCase();

  if (value !== "dark" && value !== "light") {
    return (
      <Block>
        <span style={dim}>
          Usage: <span style={{ color: "var(--fg)" }}>theme &lt;dark|light&gt;</span>
        </span>
      </Block>
    );
  }

  if (!themeBridge.setSiteTheme) {
    return (
      <Block>
        <span style={dim}>Theme switching isn&apos;t available right now.</span>
      </Block>
    );
  }

  themeBridge.setSiteTheme(value);
  return (
    <Block>
      <span style={dim}>
        Site theme set to <span style={{ color: "var(--fg)" }}>{value}</span>.
      </span>
    </Block>
  );
}

// ---- exported config --------------------------------------------------------

export const commands = {
  help: () => <Help />,
  whoami: () => <Whoami />,
  experience: () => <Experience />,
  work: () => <Experience />,
  contact: () => <Contact />,
  socials: () => <Contact />,
  resume: () => downloadResume(),
  theme: (arg?: string) => setSiteTheme(arg),
};

export const directoryStructure = {
  "about.txt": {
    content:
      "Md Zaid Siddiqui — Software Engineer based in Hyderabad, India. " +
      "2+ years building production systems: AI pipelines, search infrastructure, " +
      "and high-throughput APIs. B.Tech in CSE. Run `whoami` or `experience` for more.",
  },
  "experience.txt": { content: "Run `experience` for the formatted version." },
  "contact.txt": { content: "Run `contact` for clickable links." },
  "resume.pdf": { content: "Binary file. Run `resume` to download it." },
};

export const welcomeMessage = (
  <div style={{ lineHeight: 1.7, paddingBottom: "6px" }}>
    <span style={{ color: "var(--fg)", fontWeight: 500 }}>zaidsh</span>{" "}
    <span style={dim}>— an interactive shell, built on my own</span>{" "}
    <a
      style={{ color: "var(--fg)", textDecoration: "underline", textUnderlineOffset: "2px" }}
      href="https://www.npmjs.com/package/@zqui/react-terminal"
      target="_blank"
      rel="noopener noreferrer"
    >
      @zqui/react-terminal
    </a>
    <span style={dim}>.</span>
    <br />
    <span style={dim}>
      Type <span style={{ color: "var(--fg)" }}>help</span> to get started.
    </span>
  </div>
);
