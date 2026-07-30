"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  text: string;
  className?: string;
  typingSpeed?: number; // ms por caractere ao escrever
  deletingSpeed?: number; // ms por caractere ao apagar
  pauseDuration?: number; // ms de pausa com o texto completo, antes de apagar
  loop?: boolean; // repetir infinitamente (escrever -> apagar -> escrever...)
}

export const TypewriterEffect = ({
  text,
  className = "",
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 1500,
  loop = true,
}: TypewriterEffectProps) => {
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charIndex < text.length) {
        timeout = setTimeout(() => setCharIndex((i) => i + 1), typingSpeed);
      } else if (loop) {
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
  }, [charIndex, phase, text, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={className}>
      {text.slice(0, charIndex)}
      <span className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-current align-middle" />
    </span>
  );
};

export default TypewriterEffect;