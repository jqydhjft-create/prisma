import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { WordsPullUpMultiStyle } from '@/components/WordsPullUpMultiStyle';

interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  link: string;
  repo?: string;
  gradient: string;
  icon: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Image2 Video Pipeline',
    description:
      '图生视频批量生产管线：将分镜脚本与素材提示词自动转化为图像生成、视频生成任务，自带浏览器控制台、任务队列、清单管理与产物下载，支持 Codex / MCP 集成。',
    tags: ['Python', '本地服务', 'MCP', '视频生成'],
    year: '2026',
    link: 'https://github.com/jqydhjft-create/2-Video',
    repo: 'https://github.com/jqydhjft-create/2-Video',
    gradient: 'from-[#2b2b1e] to-[#1a1a12]',
    icon: '/works/project-image2video.png',
  },
  {
    title: 'TeamFlow 智能任务协作平台',
    description:
      '面向小型团队的任务协作系统：项目管理、看板拖拽排序、成员权限、评论动态与数据统计。全程由 Codex / Cursor 驱动开发，独立完成需求拆解、Prompt 设计到 Docker 部署。',
    tags: ['Vue3', 'FastAPI', 'MySQL', 'Redis'],
    year: '2026',
    link: 'https://github.com/jqydhjft-create/Teamflow',
    repo: 'https://github.com/jqydhjft-create/Teamflow',
    gradient: 'from-[#1e2b2b] to-[#121a1a]',
    icon: '/works/project-teamflow.png',
  },
  {
    title: 'StoryForge AI',
    description:
      'AI 驱动的长篇故事创作工作台：把"从一句灵感到可持续续写的小说"拆成可确认、可审阅的智能体流水线——世界观、人物圣经、幕时间线、场景细纲、逐章写作与连续性审阅，支持 OpenAI / DeepSeek API，本地持久化可导出备份。',
    tags: ['React', 'TypeScript', 'PWA', 'AI Agent'],
    year: '2026',
    link: 'https://github.com/jqydhjft-create/StoryForgeAI',
    repo: 'https://github.com/jqydhjft-create/StoryForgeAI',
    gradient: 'from-[#2b1e24] to-[#1a1216]',
    icon: '/works/project-storyforge.png',
  },
  {
    title: '这个个人网站',
    description:
      '你现在看到的这个网站 —— Vite + React + Tailwind + Framer Motion，全程由 AI 辅助构建。',
    tags: ['Vite', 'React', 'Framer Motion'],
    year: '2026',
    link: '#',
    repo: '#',
    gradient: 'from-[#2b261e] to-[#1a1712]',
    icon: '/works/project-website.png',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.link}
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-[#212121] hover:bg-[#262626] transition-colors duration-300 flex flex-col"
    >
      {/* Cover */}
      <div
        className={`relative h-44 sm:h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
      >
        <img
          src={project.icon}
          alt={`${project.title} 图标`}
          loading="lazy"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-1 ring-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:ring-white/20 transition-all duration-500 select-none"
        />
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur rounded-full px-3 py-1">
          <span className="text-[10px] sm:text-xs text-primary">{project.year}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-base sm:text-lg font-medium leading-snug"
            style={{ color: '#E1E0CC' }}
          >
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-gray-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>

        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs text-primary/70 border border-primary/20 rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
          {project.repo && (
            <span
              className="ml-auto text-gray-500 hover:text-primary transition-colors"
              title="查看源码"
            >
              <Github size={16} />
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}

export function Works() {
  return (
    <section id="works" className="bg-black py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6">
            精选作品
          </p>
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: '每一个项目，都是一次认真的表达。',
                  className: 'text-primary',
                },
              ]}
              className="justify-center"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
