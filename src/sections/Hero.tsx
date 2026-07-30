import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from '@/components/WordsPullUp';

// Hero 背景视频（单视频，光标 X 位置对称擦洗）
const HERO_VIDEO_URL = '/videos/hero-bg.mp4';

const NAV_ITEMS = [
  { label: '关于我', href: '#about' },
  { label: '技术栈', href: '#features' },
  { label: '作品', href: '#works' },
  { label: '笔记', href: '#notes' },
  { label: '联系我', href: '#contact' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseXRef = useRef<number | null>(null);

  // 触摸设备回退：自动播放（首渲染即检测，避免闪烁）
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window)
  );

  useEffect(() => {
    if (isTouch) return;
    const container = containerRef.current;
    if (!container) return;

    const scrub = (video: HTMLVideoElement | null, progress: number) => {
      // 关键：仅在上一次跳转渲染完成后再请求新跳转，防止抖动
      if (!video || video.seeking || !video.duration) return;
      const clamped = Math.max(0, Math.min(1, progress));
      const time = clamped * video.duration;
      if (Math.abs(video.currentTime - time) > 0.04) {
        video.currentTime = time;
      }
    };

    const processScrub = () => {
      rafRef.current = null;
      const clientX = mouseXRef.current;
      if (clientX === null) return;

      // 全局映射：光标 X 从容器左边界到右边界 → currentTime 0...duration
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const progress = x / rect.width;
      scrub(videoRef.current, progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(processScrub);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  return (
    <section className="h-screen w-full p-4 md:p-6">
      <div
        ref={containerRef}
        className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden"
      >
        {/* 背景视频：桌面光标擦洗，触摸设备自动播放；画面锚点在顶部 */}
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          autoPlay={isTouch}
          loop={isTouch}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-colors duration-200"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = '#E1E0CC';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color =
                    'rgba(225, 224, 204, 0.8)';
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content — bottom aligned */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10 pointer-events-none">
          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Left 8 cols: heading */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[15vw] 2xl:text-[16vw] font-medium leading-[0.85] tracking-[-0.04em]"
                style={{ color: '#E1E0CC' }}
              >
                <WordsPullUp text="Lvsi" showAsterisk={false} />
              </h1>
            </div>

            {/* Right 4 cols: description + CTA */}
            <div className="col-span-12 lg:col-span-4 flex flex-col items-start gap-6 pb-2 lg:pb-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-primary/70 text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.4 }}
              >
                AI 全栈开发工程师，以 Codex / Cursor / Claude Code 为核心生产力。
                擅长 Prompt 工程与需求拆解，从 Python FastAPI 后端到 Vue3 前端，
                再到 Docker 容器化部署，独立交付可运行的完整产品。
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pointer-events-auto"
              >
                <a
                  href="#works"
                  className="group flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-primary rounded-full pl-5 pr-2 py-2 text-black font-medium text-sm sm:text-base"
                >
                  <span>看看我的作品</span>
                  <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight
                      size={18}
                      style={{ color: '#E1E0CC' }}
                      strokeWidth={2}
                    />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
