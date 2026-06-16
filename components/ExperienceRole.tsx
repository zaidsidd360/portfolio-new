import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Experience as Job } from "@/lib/data";

const METRIC_RE =
  /(?<![A-Za-z])(~?\d+(?:[.,]\d+)*(?:\s?(?:ms|GB|MB|KB|k\+|k|×|x|%|\+|s))?)/g;

function withMetrics(text: string): ReactNode {
  return text.split(METRIC_RE).map((seg, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-medium text-fg">
        {seg}
      </span>
    ) : (
      <Fragment key={i}>{seg}</Fragment>
    )
  );
}

function SubList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-5">
      <span className="label">{label}</span>
      <ul className="mt-2.5 space-y-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-[14px] font-light leading-[1.7] text-fg-muted"
          >
            <span className="select-none text-fg">›</span>
            <span>{withMetrics(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceRole({
  job,
  compact = false,
}: {
  job: Job;
  compact?: boolean;
}) {
  return (
    <div>
      {/* Header */}
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-[clamp(18px,2.6vw,23px)] font-bold tracking-[-0.01em] text-fg">
          {job.role}
        </h3>
        <span className="label shrink-0">{job.period}</span>
      </div>
      <div className="mb-5 flex items-center gap-2 text-[14px]">
        {job.current && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" aria-hidden />
        )}
        <span className="font-medium text-fg">{job.company}</span>
        <span className="text-fg-muted">·</span>
        <span className="label">{job.location}</span>
      </div>

      {compact ? (
        /* Homepage: just a one-line summary, no deep detail. */
        <p className="max-w-[640px] text-[15px] font-light leading-[1.7] text-fg-muted">
          {withMetrics(job.owned)}
        </p>
      ) : (
        <>
          <div>
            <span className="label">What I owned</span>
            <p className="mt-2.5 max-w-[640px] text-[15px] font-light leading-[1.7] text-fg-muted">
              {withMetrics(job.owned)}
            </p>
          </div>

          <SubList label="What I built" items={job.built} />
          <SubList label="Interesting problems" items={job.problems} />

          {job.writeup && (
            <Link
              href={`/blog/${job.writeup.slug}`}
              className="group mt-5 inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
            >
              {job.writeup.label}
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </>
      )}

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
