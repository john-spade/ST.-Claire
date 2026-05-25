import { motion } from 'motion/react';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export default function ScrollRevealText({ text, className = '', wordClassName = '', delay = 0 }: ScrollRevealTextProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 15,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 100,
        duration: 0.5,
      }
    }
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] py-1">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
