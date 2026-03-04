// Created: 2026-03-04
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-8"
      >
        ← 목록으로
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((cat) => (
            <Link
              key={cat}
              href={`/categories/${encodeURIComponent(cat)}`}
              className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full hover:bg-indigo-100"
            >
              {cat}
            </Link>
          ))}
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-3">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-gray-500 text-lg mb-4">{post.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full hover:bg-gray-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
          <time className="text-sm text-gray-400">{post.date}</time>
        </div>
      </header>

      {/* Content */}
      <div
        className="prose prose-indigo max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
