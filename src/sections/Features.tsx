import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { WordsPullUpMultiStyle } from '@/components/WordsPullUpMultiStyle';

const VIDEO_CARD_URL = '/videos/feature-card.mp4';

const ICON_AI_DEV = '/icons/icon-2.png';
const ICON_BACKEND = '/icons/icon-1.png';
const ICON_FRONTEND = '/icons/icon-3.png';

interface FeatureCard {
  number: string;
  title: string;
  icon: string;
  items: string[];
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    number: '01',
    title: 'AI 驱动开发',
    icon: ICON_AI_DEV,
    items: [
      'Codex / Claude Code',
      '结构化 Prompt 需求拆解',
      'AI 生成代码安全审查',
      '重构修复与测试补齐',
    ],
  },
  {
    number: '02',
    title: '后端与数据',
    icon: ICON_BACKEND,
    items: [
      'Python / FastAPI / SQLAlchemy',
      'MySQL / Redis / Alembic 迁移',
      'JWT 认证与接口鉴权',
    ],
  },
  {
    number: '03',
    title: '前端与部署',
    icon: ICON_FRONTEND,
    items: [
      'Vue3 / Pinia / Element Plus',
      'Docker Compose / Nginx',
      'GitHub Actions 自动构建',
    ],
  },
];

function FeatureCardItem({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.7,
        delay: (index + 1) * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-[#212121] rounded-2xl md:rounded-[1.5rem] p-6 md:p-8 flex flex-col gap-6 h-full"
    >
      {/* Icon */}
      <div>
        <img
          src={card.icon}
          alt={card.title}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
        />
      </div>

      {/* Title */}
      <div className="flex items-baseline gap-2">
        <span className="text-gray-500 text-xs sm:text-sm font-medium">
          {card.number}
        </span>
        <h3 className="text-lg sm:text-xl font-medium" style={{ color: '#E1E0CC' }}>
          {card.title}
        </h3>
      </div>

      {/* Checklist */}
      <ul className="flex flex-col gap-3 flex-1">
        {card.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check
              size={16}
              className="mt-0.5 shrink-0 text-primary"
              strokeWidth={2.5}
            />
            <span className="text-gray-400 text-xs sm:text-sm leading-snug">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Learn more */}
      <a
        href="#works"
        className="group flex items-center gap-2 text-sm font-medium text-primary mt-auto hover:gap-3 transition-all duration-200"
      >
        <span>查看相关项目</span>
        <ArrowRight
          size={16}
          className="transition-transform duration-200 -rotate-45"
        />
      </a>
    </motion.div>
  );
}

function VideoCard() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.7,
        delay: 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative rounded-2xl md:rounded-[1.5rem] overflow-hidden h-64 md:h-full"
    >
      <video
        src={VIDEO_CARD_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <p className="text-base sm:text-lg font-medium" style={{ color: '#E1E0CC' }}>
          “需求洞察”和“系统决策”
        </p>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="min-h-screen bg-black relative py-16 md:py-24 px-4 md:px-6">
      {/* Noise overlay */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'AI 提效，人工把关，二者缺一不可。',
                  className: 'text-primary',
                },
              ]}
              className="justify-center"
            />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mt-1">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: '让 AI 写代码，让人做判断。',
                  className: 'text-gray-500',
                },
              ]}
              className="justify-center"
            />
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          <VideoCard />
          {FEATURE_CARDS.map((card, i) => (
            <FeatureCardItem key={card.number} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
