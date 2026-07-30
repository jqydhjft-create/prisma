import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import type { ContentBlock, Post } from '@/data/posts';

// 行内格式解析：**bold** 和 `code`
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-medium" style={{ color: '#E1E0CC' }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="font-mono text-[0.85em] text-primary/90 bg-primary/10 rounded px-1.5 py-0.5"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          className="text-xl sm:text-2xl font-medium mt-10 mb-4"
          style={{ color: '#E1E0CC' }}
        >
          {renderInline(block.text)}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-base sm:text-lg font-medium mt-6 mb-3 text-primary">
          {renderInline(block.text)}
        </h3>
      );
    case 'p':
      return (
        <p className="text-gray-300 text-sm sm:text-base leading-loose">
          {renderInline(block.text)}
        </p>
      );
    case 'ul':
      return (
        <ul className="flex flex-col gap-2.5 pl-1">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-gray-300 text-sm sm:text-base leading-relaxed"
            >
              <span className="text-primary mt-[0.6em] shrink-0 text-[8px]">
                ●
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-[#262626]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#161616]">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-medium text-primary/80 border-b border-[#262626]"
                  >
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-[#1c1c1c] last:border-b-0">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 align-top leading-relaxed ${
                        j === 0
                          ? 'text-gray-400 whitespace-nowrap'
                          : 'text-gray-300'
                      }`}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'code':
      return (
        <div className="rounded-xl overflow-hidden border border-[#262626]">
          <div className="bg-[#161616] px-4 py-2 border-b border-[#262626]">
            <span className="text-[10px] text-gray-500 font-mono uppercase">
              {block.lang}
            </span>
          </div>
          <pre className="bg-[#101010] p-4 overflow-x-auto">
            <code className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
              {block.code}
            </code>
          </pre>
        </div>
      );
    case 'quote':
      return (
        <blockquote className="border-l-2 border-primary/40 pl-5 py-1 my-2">
          <p className="text-primary/90 text-sm sm:text-base leading-loose italic">
            {renderInline(block.text)}
          </p>
        </blockquote>
      );
  }
}

export function NoteReader({ post, onBack }: { post: Post; onBack: () => void }) {
  // 进入文章时回到顶部（hash 路由不会自动重置滚动位置）
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [post.slug]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-black min-h-screen px-4 md:px-6 py-8 md:py-12"
    >
      <article className="max-w-3xl mx-auto bg-[#101010] rounded-2xl md:rounded-[2rem] px-6 py-10 md:px-12 md:py-16">
        {/* Back */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors duration-200 mb-10"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span>返回笔记列表</span>
        </button>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-[10px] sm:text-xs text-primary/70 border border-primary/20 rounded-full px-2.5 py-0.5">
            {post.category}
          </span>
          <span className="text-gray-500 text-xs font-mono">{post.date}</span>
          <span className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-medium leading-snug mb-8"
          style={{ color: '#E1E0CC' }}
        >
          {post.title}
        </h1>

        {/* Divider */}
        <div className="h-px bg-[#212121] mb-8" />

        {/* Content */}
        <div className="flex flex-col gap-5">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* Bottom back */}
        <div className="mt-14 pt-8 border-t border-[#212121] text-center">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            <span>返回笔记列表</span>
          </button>
        </div>
      </article>
    </motion.main>
  );
}
