import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from '@/components/WordsPullUpMultiStyle';
import { POSTS, type Post } from '@/data/posts';

function PostItem({ post, index }: { post: Post; index: number }) {
  return (
    <motion.a
      href={`#notes/${post.slug}`}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group block border-b border-[#212121] last:border-b-0 py-6 md:py-8 first:pt-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <h3
            className="text-lg sm:text-xl md:text-2xl font-medium leading-snug group-hover:text-primary transition-colors duration-300"
            style={{ color: '#E1E0CC' }}
          >
            {post.title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>
        </div>
        <ArrowUpRight
          size={20}
          className="shrink-0 mt-1.5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
        />
      </div>
    </motion.a>
  );
}

export function Notes() {
  return (
    <section id="notes" className="bg-black py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto bg-[#101010] rounded-2xl md:rounded-[2rem] px-6 py-12 md:px-12 md:py-20">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6">
            笔记
          </p>
          <div className="text-2xl sm:text-3xl md:text-4xl font-normal">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: '写作是思考的延续。',
                  className: 'text-primary',
                },
              ]}
            />
          </div>
        </div>

        {/* Post list */}
        <div className="flex flex-col">
          {POSTS.map((post, i) => (
            <PostItem key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
