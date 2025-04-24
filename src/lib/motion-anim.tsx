
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type ElementProps = {
  className?: string;
  id?: string;
}

type SectionProps = ElementProps & {
  children: React.ReactNode;
};

const MotionSection = motion.section;

export function Section({ children, className = '', id = '' }: SectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <MotionSection
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.865 } },
      }}
      className={`px-4 py-12 max-w-5xl mx-auto ${className}`}
      id={id}
    >
      {children}
    </MotionSection>
  );
}

export function Gestures() {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      style={{ width: 100, height: 100, backgroundColor: '#9911ff', borderRadius: 5 }}
    />
  );
}

export function GradientButton({ children, className = '' }: Omit<ElementProps, 'id'> & {
  children: React.ReactNode
}) {
  const gradientColorClass = 'bg-gradient-to-r from-orange-700 to-orange-400 text-white focus:ring-red-600';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 13 }}
      className={`cursor-pointer font-semibold rounded-xl px-4 py-2 shadow-md focus:outline-none ${gradientColorClass} ${className}`}
      onClick={() => alert('Sorry this feature is currently in development!')}
    >
      {children}
    </motion.button>
  );
}
