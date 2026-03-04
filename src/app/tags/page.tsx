// Created: 2026-03-04
import { getAllTags } from "@/lib/posts";
import Link from "next/link";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">태그 목록</h1>
      {tags.length === 0 ? (
        <p className="text-gray-400">태그가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm hover:border-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <span className="font-medium">#{tag}</span>
              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-1.5 py-0.5">
                {count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
