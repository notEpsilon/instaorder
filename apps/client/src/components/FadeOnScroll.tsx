import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const variant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.6 } },
};

const FadeOnScroll: React.FC<Props> = ({ children, className }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={control}
    >
      {children}
    </motion.div>
  );
};

export default FadeOnScroll;
// closes #3
