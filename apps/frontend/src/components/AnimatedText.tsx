import React, { useEffect } from "react";
import { useAnimate, motion, stagger } from "motion/react";
import { cn } from "@repo/ui/lib/utils"; 

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    startAnimating();
  }, []);

  const startAnimating = () => {
    animate(
      "span",
      {
        opacity: 1,
        filter: "blur(0)",
        y: 0,
      },
      {
        duration: 0.2,
        ease: "easeInOut",
        delay: stagger(0.02),
      }
    );
  };

  return (
    <div
      ref={scope}
      className={cn("", className)}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={word + index}
          style={{
            opacity: 0,
            filter: "blur(10px)",
            y: 10,
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;
