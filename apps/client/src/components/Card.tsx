import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  title: string;
  body: string;
}

const variant = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const Card: React.FC<Props> = ({ title, body }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={control}
      className="block max-w-sm p-6 bg-white border border-pink-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
        <div className="h-1 mt-3 w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{body}</p>
    </motion.div>
  );
};

export default Card;
