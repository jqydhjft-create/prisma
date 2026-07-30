import { motion } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
}: WordsPullUpProps) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
          }}
        >
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: wi * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: 'inline-block', position: 'relative' }}
          >
            {word}
            {showAsterisk && wi === words.length - 1 && word.endsWith('a') && (
              <span
                className="absolute"
                style={{
                  top: '0.65em',
                  right: '-0.3em',
                  fontSize: '0.31em',
                  lineHeight: 1,
                }}
              >
                *
              </span>
            )}
            {wi < words.length - 1 && <span>{'\u00A0'}</span>}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
