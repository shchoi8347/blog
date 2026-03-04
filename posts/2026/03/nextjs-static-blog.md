---
title: "Next.js App Router로 정적 블로그 만들기"
date: 2026-03-04
tags: [next.js, react, typescript, github-pages]
categories: [개발, 튜토리얼]
description: "Next.js 15 App Router와 Markdown을 활용해 GitHub Pages에 배포하는 정적 블로그를 만드는 방법을 소개합니다."
---

# Next.js App Router로 정적 블로그 만들기

## 왜 Next.js인가?

정적 사이트 생성(SSG)에는 여러 선택지가 있습니다. Gatsby, Hugo, Jekyll 등등... 그 중에서 Next.js를 선택한 이유는:

- **React 생태계** 활용 가능
- **App Router**의 간결한 구조
- **TypeScript** 기본 지원
- 활발한 커뮤니티

## 핵심 설정: Static Export

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",       // 정적 파일 생성
  trailingSlash: true,    // GitHub Pages 라우팅 호환
  images: {
    unoptimized: true,    // 이미지 최적화 비활성화 (정적 빌드용)
  },
};
```

## Markdown 파싱 구조

`gray-matter`로 frontmatter를 파싱하고, `remark`로 HTML로 변환합니다:

```typescript
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const { data, content } = matter(fileContents);
const processedContent = await remark().use(html).process(content);
const contentHtml = processedContent.toString();
```

## 파일 구조

포스트는 `posts/YYYY/MM/slug.md` 형식으로 관리합니다:

```
posts/
└── 2026/
    └── 03/
        ├── hello-world.md
        └── nextjs-static-blog.md
```

## GitHub Actions 자동 배포

`main` 브랜치에 push하면 자동으로 빌드 및 배포됩니다. 설정은 `.github/workflows/deploy.yml`을 참고하세요.

---

다음 포스트에서는 **댓글 기능 추가**와 **SEO 최적화**에 대해 다뤄보겠습니다. 👋
