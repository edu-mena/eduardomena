"use client";

import { useEffect, useState } from "react";

interface MultiPhraseTypewriterProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const TERMINAL_PROMPT = "M3N4@PORTFOLIO";
const PROMPT_COLOR = "text-pink-500";
const TERMINAL_PROMPT1 = ":";
const PROMPT_COLOR1 = "text-gray-500";
const TERMINAL_PROMPT2 = "~";
const PROMPT_COLOR2 = "text-blue-500";
const TERMINAL_PROMPT3 = "$ ";
const PROMPT_COLOR3 = "text-gray-500"; 

export const MultiPhraseTypewriter = ({
  phrases,
  className = "",
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseDuration = 1500,
}: MultiPhraseTypewriterProps) => {
  const [charIndex, setCharIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  const currentPhrase = phrases[phraseIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => setCharIndex((i) => i + 1), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((i) => i - 1), deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, phase, currentPhrase, typingSpeed, deletingSpeed, pauseDuration, phrases.length]);

  return (
    <span className={className}>
      <span className={PROMPT_COLOR}>{TERMINAL_PROMPT}</span>
      <span className={PROMPT_COLOR1}>{TERMINAL_PROMPT1}</span>
      <span className={PROMPT_COLOR2}>{TERMINAL_PROMPT2}</span>
      <span className={PROMPT_COLOR3}>{TERMINAL_PROMPT3}</span>
      <span className="text-white"> </span>
      {currentPhrase.slice(0, charIndex)}
      <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-current align-middle"></span>
    </span>
  );
};

export default MultiPhraseTypewriter;