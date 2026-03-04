// Created: 2026-03-04

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} My Blog · Built with Next.js & Tailwind CSS
      </div>
    </footer>
  );
}
