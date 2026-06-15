import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  getPostMeta,
  getPostSlugs,
  getPostSource,
  postExists,
  type PostFrontmatter,
} from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zaidsiddiqui.dev";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!postExists(slug)) return {};

  const { frontmatter } = await compileMDX<PostFrontmatter>({
    source: getPostSource(slug),
    options: { parseFrontmatter: true },
  });

  const url = `${siteUrl}/blog/${slug}`;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/blog/${slug}` },
    // Note: og:image / twitter:image are supplied automatically by the
    // dynamic opengraph-image.tsx and twitter-image.tsx in this segment.
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      publishedTime: frontmatter.date,
      authors: ["Md Zaid Siddiqui"],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  if (!postExists(slug)) notFound();

  const meta = getPostMeta(slug);
  const author = meta.author ?? "Md Zaid Siddiqui";

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source: getPostSource(slug),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeHighlight],
      },
    },
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    image: `${siteUrl}/og.png`,
    keywords: (frontmatter.tags ?? []).join(", "),
    articleSection: "Engineering",
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: author,
      url: siteUrl,
      sameAs: [
        "https://github.com/zaidsidd360",
        "https://linkedin.com/in/zaidsidd360",
        "https://twitter.com/zaidsidd360",
      ],
    },
    publisher: { "@type": "Person", name: author, url: siteUrl },
    url: `${siteUrl}/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${slug}` },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24">
        <div className="container">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span className="label">Blog</span>
          </Link>

          <header className="mb-10">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <time className="label" dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
              {(frontmatter.tags ?? []).map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-[clamp(28px,5vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
              {frontmatter.title}
            </h1>

            <div className="mt-5 flex items-center gap-2.5 text-[13px] text-fg-muted">
              <span className="text-fg">{author}</span>
              <span aria-hidden>·</span>
              <span>{meta.readingTime}</span>
            </div>
          </header>

          <article className="blog-prose">{content}</article>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
