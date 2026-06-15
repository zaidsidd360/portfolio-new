import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getAllPostsMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on search infrastructure, performance, and building things, by Md Zaid Siddiqui.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog · Zaid Siddiqui",
    description:
      "Notes on search infrastructure, performance, and building things.",
    url: "/blog",
    type: "website",
  },
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24">
        <div className="container">
          <h1 className="text-[clamp(32px,6vw,52px)] font-bold tracking-[-0.03em] text-fg">
            Blog
          </h1>
          <p className="mt-3 mb-12 max-w-[560px] text-[15px] font-light leading-[1.6] text-fg-muted">
            Notes on search infrastructure, performance, and the things I build.
          </p>

          {posts.length === 0 ? (
            <p className="text-fg-muted">Nothing published yet. Soon.</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.slug} className="border-t border-line first:border-t-0">
                  <Link href={`/blog/${post.slug}`} className="group block py-6">
                    <div className="mb-1.5 flex items-baseline justify-between gap-4">
                      <h2 className="flex items-center gap-1.5 text-[clamp(17px,2.5vw,21px)] font-medium text-fg">
                        <span className="underline-offset-4 group-hover:underline">
                          {post.title}
                        </span>
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                          className="shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </h2>
                      <span className="label shrink-0">{formatDate(post.date)}</span>
                    </div>
                    <p className="max-w-[640px] text-[14px] font-light leading-[1.6] text-fg-muted">
                      {post.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {(post.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                      <span className="label">{post.readingTime}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
