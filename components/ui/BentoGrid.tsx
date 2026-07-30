'use client';

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

// ← ADICIONE ESTA LINHA
const GridGlobe = dynamic(() => import("./GridGlobe"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-900" />,
});

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { cn } from "@/lib/utils";

import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
import TypewriterBento from "./Typewriterbento";
import styles from "./Bentogrid.module.css";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["Vite", "NodeJS", "NextJS"];

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = "e.mena.baptista@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  
  const hasBackgroundImage = img && id !== 4;
  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-lg border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-0",
        styles.bentoWindow,
        hasBackgroundImage && "min-h-[15rem]", // Adicione a condição aqui!
        className
      )}
    >
      {/* WINDOW HEADER */}
      <div className={styles.windowHeader}>
        <div className={styles.windowControls}>
          <div className={`${styles.controlDot} ${styles.close}`} />
          <div className={`${styles.controlDot} ${styles.minimize}`} />
          <div className={`${styles.controlDot} ${styles.maximize}`} />
        </div>
        <div className={styles.windowTitle}>
          {id === 1 && "portfolio.exe"}
          {id === 2 && "learning.py"}
          {id === 3 && "stack.json"}
          {id === 4 && "mission.rs"}
          {id === 5 && "design.cpp"}
          {id === 6 && "contact.sh"}
        </div>
      </div>

      {/* WINDOW CONTENT */}
      <div className={cn(styles.windowContent, "flex-1")}>
        {/* Image Background - For id 1, 5, 6 */}
        {img && id !== 4 && (
          <div className={`${styles.imageBackground}`}>
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          </div>
        )}

        {/* Logo - For id 4 (mission.rs) - Positioned on the right */}
        {img && id === 4 && (
          <div className="absolute -right-6 -bottom-10  h-32 w-32 lg:h-40 lg:w-40 flex items-center justify-center z-10">
            <img
              src={img}
              alt={img}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        )}

        {/* Spare Image - Not for id 4 */}
        {spareImg && id !== 4 && (
          <div className="absolute -right-10 -bottom-10 w-full opacity-100">
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          </div>
        )}

        {/* Content */}
        <div className={cn(titleClassName, "relative z-10 flex flex-col justify-between h-full p-5 lg:p-8")}>
          

          {/* Title with Typewriter Effect for specific items */}
          <div className="space-y-4 flex flex-col flex-1 relative">
            {(id === 2 || id === 3 || id === 4) ? (
              <TypewriterBento text={title as string} singleLine={true}/>
            ) : (
              <div className={`font-sans text-lg lg:text-3xl font-bold z-10 relative truncate ${id === 6 ? "text-center" : ""}`}>
                {title}
              </div>
            )}

            {/* 3D Globe for id 2 */}
            {id === 2 && <GridGlobe />}

            {/* Tech stack for id 3 - Fixed positioning */}
            {id === 3 && (
              <div className="absolute -right-40 -top-10 flex gap-2 w-full mt-4 justify-center">
                <div className="flex flex-col gap-1 md:gap-1 lg:gap-2">
                  {leftLists.map((item, i) => (
                    <span
                      key={i}
                      className="lg:py-2 lg:px-2 py-1 px-2 text-xs lg:text-sm opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E] whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="lg:py-2 lg:px-2 py-1 px-2 rounded-lg text-center bg-[#10132E]"></span>
                </div>
                <div className="flex flex-col gap-1 md:gap-1 lg:gap-2">
                  <span className="lg:py-2 lg:px-2 py-1 px-2 rounded-lg text-center bg-[#10132E]"></span>
                  {rightLists.map((item, i) => (
                    <span
                      key={i}
                      className="lg:py-2 lg:px-2 py-1 px-2 text-xs lg:text-sm opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E] whitespace-nowrap"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Copy Email Button for id 6 - Bottom */}
          {id === 6 && (
            <div className="mt-5 relative flex justify-center">
              <div className={`absolute -bottom-5 right-1/2 translate-x-1/2 ${copied ? "block" : "block"}`}>
                <Lottie
                  animationData={animationData}
                  loop={copied}
                  autoplay={copied}
                  style={{ height: 200, width: 400 }}
                />
              </div>

              <MagicButton
                title={copied ? "Email copiado!" : "Copie o meu email"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}

          {/* Description - Bottom for id 5 */}
          {id === 5 && (
            <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] mt-auto">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};