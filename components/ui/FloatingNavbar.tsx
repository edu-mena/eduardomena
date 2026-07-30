"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
          setIsOpenMobile(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed z-[5000] top-4 md:top-10 inset-x-0 mx-auto flex justify-center w-full px-4",
          className
        )}
      >
        {/* Contentor Geral em Linha (Lado a lado em mobile e desktop) */}
        <div className="w-full max-w-6xl flex items-center justify-between gap-3 relative">
          
          {/* --- MOBILE NAVBAR (Ocupa o espaço à esquerda) --- */}
          <div className="md:hidden relative flex-1 flex flex-col items-center">
            {/* Fundo em segundo plano (Overlay global para escurecer a página) */}
            <AnimatePresence>
              {isOpenMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpenMobile(false)}
                  className="fixed inset-0 w-screen h-screen bg-black/80 backdrop-blur-md z-10 pointer-events-auto"
                />
              )}
            </AnimatePresence>

            {/* Contentor Principal do Menu Mobile */}
            <div className="relative z-20 w-full flex flex-col items-center">
              {/* Botão do Menu */}
              <div className="w-full px-5 py-3 rounded-xl border border-[#333] bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                <button
                  onClick={() => setIsOpenMobile(!isOpenMobile)}
                  className="w-full text-gray-300 hover:text-green-400 transition-colors focus:outline-none flex items-center justify-between font-mono text-xs uppercase tracking-widest"
                  aria-label="Menu"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-pink-500">~/</span> Menu
                  </div>
                  {isOpenMobile ? <IoClose size={20} /> : <BsThreeDotsVertical size={20} />}
                </button>
              </div>

              {/* Gaveta de Links */}
              <AnimatePresence>
                {isOpenMobile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 12 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 w-full bg-[#0a0a0a] border border-[#333] rounded-2xl shadow-2xl p-6 flex flex-col space-y-4 backdrop-blur-xl"
                  >
                    {navItems.map((navItem, idx: number) => (
                      <Link
                        key={`mobile-link-${idx}`}
                        href={navItem.link}
                        onClick={() => setIsOpenMobile(false)}
                        className="font-mono flex items-center gap-3 text-sm text-gray-300 hover:text-green-400 transition-colors group py-2 border-b border-[#222] last:border-none"
                      >
                        <span className="text-gray-600 group-hover:text-pink-500 transition-colors">
                          ~/
                        </span>
                        <span className="!cursor-pointer tracking-widest uppercase font-medium">
                          {navItem.name}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Elemento invisível à esquerda para equilibrar o espaço em desktop */}
          <div className="hidden md:block w-[180px]" />

          {/* --- DESKTOP NAVBAR (Centro) --- */}
          <div className="hidden md:flex px-10 py-4 rounded-xl border border-[#333] bg-[#0a0a0a]/90 backdrop-blur-md items-center justify-center space-x-8 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
            {navItems.map((navItem, idx: number) => (
              <Link
                key={`desktop-link-${idx}`}
                href={navItem.link}
                className="relative font-mono flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors group"
              >
                <span className="text-gray-600 group-hover:text-pink-500 transition-colors">
                  ~/
                </span>
                <span className="!cursor-pointer tracking-widest uppercase">
                  {navItem.name}
                </span>
              </Link>
            ))}
          </div>

          {/* --- BOTÃO DE DOWNLOAD DE CV (À Direita, Lado a Lado) --- */}
          <div className="flex items-center shrink-0">
            <a
              href="/cv/CV Eduardo Mena Baptista.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 md:px-5 md:py-4 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-mono text-xs md:text-sm tracking-wider uppercase transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
              title="Curriculum Vitae"
            >
              <span className="text-xs md:text-sm md:hidden text-gray-900">CV</span>
              <FaDownload className="hidden text-xs md:text-sm md:inline text-gray-900" />
              <span className="hidden md:inline font-semibold">Corriculum Vitae </span>
            </a>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};