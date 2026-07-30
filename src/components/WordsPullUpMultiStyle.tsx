import { motion } from 'framer-motion';

export interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export function WordsPullUpMultiStyle({
  segments,
  className = '',
}: WordsPullUpMultiStyleProps) {
  // Flatten all segments into words, preserving per-word className
  const words: Array<{ word: string; className: string }> = [];
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w.length > 0) {
        words.push({ word: w, className: seg.className || '' });
      }
    });
  });

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {words.map((item, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'inline-block' }}
          className={item.className}
        >
          {item.word}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
}
