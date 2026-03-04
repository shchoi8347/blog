// Created: 2026-03-04
export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 mx-auto mb-6 flex items-center justify-center text-4xl">
          👨‍💻
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          안녕하세요 👋
        </h1>
        <p className="text-indigo-600 font-medium mb-6">Developer & Writer</p>
        <p className="text-gray-600 leading-relaxed mb-8">
          이 블로그는 개발하면서 배운 것들, 생각한 것들을 기록하는 공간입니다.
          <br />
          마크다운으로 글을 작성하고, GitHub Pages에 호스팅합니다.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-50 rounded-2xl p-4">
            <div className="text-2xl font-bold text-indigo-600">Next.js</div>
            <div className="text-xs text-gray-500 mt-1">Framework</div>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4">
            <div className="text-2xl font-bold text-purple-600">Tailwind</div>
            <div className="text-xs text-gray-500 mt-1">Styling</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-4">
            <div className="text-2xl font-bold text-green-600">Markdown</div>
            <div className="text-xs text-gray-500 mt-1">Content</div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
