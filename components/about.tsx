"use client";

import Image from "next/image";
import styles from "./modules/FeatureSection.module.css";

interface aboutSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

const TERMINAL_PROMPT = "@ADMIN";
const PROMPT_COLOR = "text-pink-500";
const TERMINAL_PROMPT1 = ":";
const PROMPT_COLOR1 = "text-gray-500";
const TERMINAL_PROMPT2 = "~";
const PROMPT_COLOR2 = "text-blue-500";
const TERMINAL_PROMPT3 = "$ ";
const PROMPT_COLOR3 = "text-gray-500";

const About = ({
  title,
  subtitle,
  description,
}: aboutSectionProps) => {
  return (
    <>
      <section className="relative w-full flex flex-col lg:flex-row items-center justify-between py-10 px-0 md:px-12 overflow-hidden gap-8 lg:gap-16" id="about">
        {/* Content */}
        <div className="relative z-10 max-w-2xl w-full">
          {/* Subtitle - Terminal with hover fill effect */}
          <p
            className={`${styles.subtitle} text-xs md:text-base mb-4 tracking-widest`}
            data-text={subtitle}
          >
            {subtitle}
          </p>

          {/* Main Title - Pixel/Retro Style */}
          <h1 className={`${styles.pixelTitle} text-3xl md:text-4xl lg:text-5xl mb-6`}>
            {title}
          </h1>

          {/* Description - Terminal Green */}
          <div className="mb-6">
            <span className={`${PROMPT_COLOR} font-mono tracking-wider text-sm md:text-base lg:text-lg leading-relaxed`}>{TERMINAL_PROMPT}</span>
            <span className={`${PROMPT_COLOR1} font-mono tracking-wider text-sm md:text-base lg:text-lg leading-relaxed`}>{TERMINAL_PROMPT1}</span>
            <span className={`${PROMPT_COLOR2} font-mono tracking-wider text-sm md:text-base lg:text-lg leading-relaxed`}>{TERMINAL_PROMPT2}</span>
            <span className={`${PROMPT_COLOR3} font-mono tracking-wider text-sm md:text-base lg:text-lg leading-relaxed`}>{TERMINAL_PROMPT3}</span>
            <span className={`${styles.description} text-sm md:text-base lg:text-lg leading-relaxed`}>
              {description}
            </span>
          </div>

          {/* Mobile/Tablet Image (Visível em ecrãs menores que LG, centralizada abaixo do texto se necessário) */}
          <div className="flex lg:hidden justify-center items-center w-full mt-6">
            <div className="relative w-full max-w-xs h-64">
              <Image
                src="/images/Perfil.jpg"
                alt="DevOps"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Desktop Image (Visível apenas em LG para cima) */}
        <div className="hidden lg:flex flex-1 justify-end items-center">
          <div className="relative w-full max-w-md h-96">
            <Image
              src="/images/Perfil.jpg"
              alt="DevOps"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;