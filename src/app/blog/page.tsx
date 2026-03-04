// Created: 2026-03-04
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function BlogPage() {
  const posts = getAllPosts();

  // Group posts by YYYY-MM
  const grouped: Record<string, typeof posts> = {};
  for (const post of posts) {
    const month = post.date.substring(0, 7); // "YYYY-MM"
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(post);
  }

  const sortedMonths = Object.keys(grouped).sort((a, b) =>
    a < b ? 1 : -1
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900">Blog</h1>
        <span className="text-sm text-gray-400">{posts.length}개의 글</span>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p>아직 작성된 글이 없습니다.</p>
        </div>
      ) : (
        sortedMonths.map((month) => (
          <section key={month} className="space-y-4">
            <h2 className="text-lg font-bold text-gray-500 border-b border-gray-200 pb-2">
              {month}
            </h2>
            <div className="grid gap-4">
              {grouped[month].map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))
      )}

      {/* All Tags & Categories link */}
      {posts.length > 0 && (
        <div className="flex gap-4 pt-4 text-sm">
          <Link href="/tags" className="text-indigo-600 hover:underline">
            태그 목록 →
          </Link>
          <Link href="/categories" className="text-indigo-600 hover:underline">
            카테고리 목록 →
          </Link>
        </div>
      )}
    </div>
  );
}
