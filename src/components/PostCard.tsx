// Created: 2026-03-04
import Link from "next/link";
import { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {post.categories.map((cat) => (
          <Link
            key={cat}
            href={`/categories/${encodeURIComponent(cat)}`}
            className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full hover:bg-indigo-100 transition-colors"
          >
            {cat}
          </Link>
        ))}
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
          {post.title}
        </h2>
      </Link>

      {post.description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <time className="text-xs text-gray-400 shrink-0 ml-4">{post.date}</time>
      </div>
    </article>
  );
}
