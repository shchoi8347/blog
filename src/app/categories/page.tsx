// Created: 2026-03-04
import { getAllCategories } from "@/lib/posts";
import Link from "next/link";

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900">카테고리</h1>
      {categories.length === 0 ? (
        <p className="text-gray-400">카테고리가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map(({ category, count }) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-center"
            >
              <div className="text-lg font-bold text-gray-800">{category}</div>
              <div className="text-sm text-gray-400 mt-1">{count}개의 글</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
