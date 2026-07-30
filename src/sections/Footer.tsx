import { motion } from 'framer-motion';
import { Github, Mail} from 'lucide-react';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/jqydhjft-create/Ccx-', icon: Github },
  { label: '邮箱', href: '3302688297@qq.com', icon: Mail },
];

const NAV_LINKS = [
  { label: '关于我', href: '#about' },
  { label: '技术栈', href: '#features' },
  { label: '作品', href: '#works' },
  { label: '笔记', href: '#notes' },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-black px-4 md:px-6 pb-4 md:pb-6">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] px-6 py-12 md:px-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Top: CTA */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6">
              联系我
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6"
              style={{ color: '#E1E0CC' }}
            >
              有想法？聊聊吧。
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-8">
              无论是全职机会、项目合作，还是关于 AI 编程的技术交流，
              都欢迎给我写邮件 —— 我通常会在 48 小时内回复。
            </p>
            <a
              href="mailto:3302688297@qq.com"
              className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-primary rounded-full px-6 py-3 text-black font-medium text-sm sm:text-base"
            >
              <Mail size={18} />
              <span>3302688297@qq.com</span>
            </a>
          </motion.div>

          {/* Middle: links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-[#212121]">
            {/* Logo */}
            <span
              className="text-xl font-medium tracking-tight"
              style={{ color: '#E1E0CC' }}
            >
              Lvsi
            </span>

            {/* Nav */}
            <nav className="flex items-center gap-6 md:gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs sm:text-sm transition-colors duration-200"
                  style={{ color: 'rgba(225, 224, 204, 0.6)' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.color = '#E1E0CC';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.color =
                      'rgba(225, 224, 204, 0.6)';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    title={link.label}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="w-9 h-9 rounded-full bg-[#212121] flex items-center justify-center text-gray-400 hover:text-primary hover:bg-[#2a2a2a] transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Bottom: copyright */}
          <div className="pt-8 border-t border-[#212121] flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-gray-600 text-[10px] sm:text-xs">
              © {new Date().getFullYear()} Lvsi · 保留所有权利
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
