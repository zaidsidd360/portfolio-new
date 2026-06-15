import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
  author?: string;
  canonical?: string;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
}

function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function postExists(slug: string): boolean {
  return fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`));
}

export function getPostSource(slug: string): string {
  return fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
}

export function getPostMeta(slug: string): PostMeta {
  const { data, content } = matter(getPostSource(slug));
  const fm = data as PostFrontmatter;
  return { ...fm, slug, readingTime: readingTime(content) };
}

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map(getPostMeta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
