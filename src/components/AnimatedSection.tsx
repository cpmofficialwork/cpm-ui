import React from 'react';
import { motion } from 'motion/react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
  delay = 0,
  direction = 'up',
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 40 };
      case 'down':
        return { opacity: 0, y: -40 };
      case 'left':
        return { opacity: 0, x: 40 };
      case 'right':
        return { opacity: 0, x: -40 };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 40 };
    }
  };

  return (
    <motion.section
      id={id}
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth cubic-bezier curve
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
