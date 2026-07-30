"use client";

import { useEffect, useState } from "react";
import styles from "./Bentogrid.module.css";

interface TypewriterBentoProps {
  text: string;
  singleLine?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  hideCursor?: boolean;
}

export const TypewriterBento = ({
  text,
  singleLine = false,
  typingSpeed = 50,
  deletingSpeed = 25,
  pauseDuration = 2000,
  hideCursor = false,
}: TypewriterBentoProps) => {
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charIndex < text.length) {
        timeout = setTimeout(() => setCharIndex((i) => i + 1), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((i) => i - 1), deletingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("typing"), typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, phase, text, typingSpeed, deletingSpeed, pauseDuration]);

  const className = singleLine ? styles.typewriterTextSingle : styles.typewriterText;

  return (
    <div className={className}>
      {text.slice(0, charIndex)}
      {!hideCursor && (
        <span className="inline-block w-[0.15em] h-[1.125rem] ml-0.5 bg-[#22c55e] align-middle animate-pulse" />
      )}
    </div>
  );
};

export default TypewriterBento;