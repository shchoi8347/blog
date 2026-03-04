// Created: 2026-03-04
import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(({ category }) => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const posts = getPostsByCategory(decoded);

  if (posts.length === 0) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/blog" className="text-sm text-indigo-600 hover:underline">
          ← Blog
        </Link>
        <span className="text-gray-300">|</span>
        <h1 className="text-2xl font-extrabold text-gray-900">{decoded}</h1>
        <span className="text-sm text-gray-400">{posts.length}개의 글</span>
      </div>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
