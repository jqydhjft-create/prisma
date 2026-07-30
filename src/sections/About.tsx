import { WordsPullUpMultiStyle } from '@/components/WordsPullUpMultiStyle';
import { ScrollRevealText } from '@/components/AnimatedLetter';

const HEADING_SEGMENTS = [
  { text: '我是Lvsi，', className: 'font-normal text-primary' },
  { text: '一名 全栈产品工程师、AI原生开发者。', className: 'italic font-serif text-primary' },
  {
    text: '我用 AI 编程工具构建完整的产品。',
    className: 'font-normal text-primary',
  },
];

const BODY_TEXT =
  '以 AI 编程工具为核心生产力的全栈开发者，熟练使用 Codex / Claude Code 完成需求拆解、Prompt 设计、AI 代码生成、人工审查、自测联调与部署交付。具备 Python / FastAPI / Vue3 / MySQL / Redis / Docker 全栈能力，尤其关注 AI 生成代码的安全性、稳定性与可维护性 —— 重点排查 SQL 注入、XSS、越权访问与性能风险。在明确需求下，能快速交付可运行、可维护的产品原型。';

export function About() {
  return (
    <section id="about" className="bg-black py-16 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-2xl md:rounded-[2rem] px-6 py-16 md:px-12 md:py-24 text-center">
        {/* Top label */}
        <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-8 md:mb-12">
          关于我
        </p>

        {/* Main heading */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[1.05] sm:leading-[1.0]">
          <WordsPullUpMultiStyle
            segments={HEADING_SEGMENTS}
            className="text-center"
          />
        </div>

        {/* Body paragraph with scroll-linked char reveal */}
        <div className="mt-10 md:mt-16 max-w-2xl mx-auto">
          <ScrollRevealText
            text={BODY_TEXT}
            className="text-xs sm:text-sm md:text-base"
            style={{ color: '#DEDBC8', lineHeight: 1.8 }}
          />
        </div>
      </div>
    </section>
  );
}
