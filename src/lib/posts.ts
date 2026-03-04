// Created: 2026-03-04
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  categories: string[];
  description: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function getAllMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getAllPosts(): PostMeta[] {
  const files = getAllMarkdownFiles(postsDirectory);

  const posts = files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const relativePath = path.relative(postsDirectory, filePath);
    const slug = relativePath
      .replace(/\\/g, "/")
      .replace(/\.md$/, "")
      .replace(/\//g, "-");

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date ? String(data.date).substring(0, 10) : "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      categories: Array.isArray(data.categories) ? data.categories : [],
      description: data.description || "",
    } as PostMeta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = getAllMarkdownFiles(postsDirectory);

  for (const filePath of files) {
    const relativePath = path.relative(postsDirectory, filePath);
    const fileSlug = relativePath
      .replace(/\\/g, "/")
      .replace(/\.md$/, "")
      .replace(/\//g, "-");

    if (fileSlug === slug) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date ? String(data.date).substring(0, 10) : "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        categories: Array.isArray(data.categories) ? data.categories : [],
        description: data.description || "",
        contentHtml,
      };
    }
  }

  return null;
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const catMap = new Map<string, number>();
  for (const post of posts) {
    for (const cat of post.categories) {
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    }
  }
  return Array.from(catMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.categories.includes(category));
}
