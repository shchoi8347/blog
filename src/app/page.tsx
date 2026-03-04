// Created: 2026-03-04
import Link from "next/link";
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 5);
  const tags = getAllTags().slice(0, 10);
  const categories = getAllCategories();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          ✍️ My Blog
        </h1>
        <p className="text-gray-500 text-lg">개발과 생각을 기록하는 공간</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/blog"
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            블로그 보기
          </Link>
          <Link
            href="/about"
            className="bg-white text-indigo-600 px-6 py-2.5 rounded-full text-sm font-semibold border border-indigo-200 hover:bg-indigo-50 transition-colors"
          >
            소개
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Recent Posts */}
        <section className="lg:col-span-3 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📝 최근 포스트
          </h2>
          {recentPosts.length === 0 ? (
            <p className="text-gray-400 text-sm">아직 작성된 글이 없습니다.</p>
          ) : (
            recentPosts.map((post) => <PostCard key={post.slug} post={post} />)
          )}
          {posts.length > 5 && (
            <div className="text-center pt-4">
              <Link
                href="/blog"
                className="text-indigo-600 text-sm font-medium hover:underline"
              >
                모든 글 보기 →
              </Link>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {categories.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                카테고리
              </h3>
              <ul className="space-y-1.5">
                {categories.map(({ category, count }) => (
                  <li key={category}>
                    <Link
                      href={`/categories/${encodeURIComponent(category)}`}
                      className="flex justify-between items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      <span>{category}</span>
                      <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tags.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag }) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
