"use client";

import { useState } from "react";
import { workExperience } from "@/data";
import styles from "./modules/RecentProjects.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="experience" className="py-20">
      {/* Título */}
      <h1 className={`${styles.pixelTitle} text-3xl md:text-4xl lg:text-5xl mb-8 text-center`}>
        Minha Experiência
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-0 md:px-4 max-w-7xl mx-auto">
        
        {workExperience.map((card, index) => {
          // No telemóvel, se não estiver expandido, esconde os cards a partir do índice 2
          const isHiddenOnMobile = !isExpanded && index >= 2;

          return (
            <div 
              key={card.id} 
              className={`bg-[#000000] border border-[#303030] border-[2px] p-6 shadow-sm flex flex-col md:flex-row justify-start items-center gap-4 max-w-[60rem] ${card.className} ${
                isHiddenOnMobile ? "hidden md:flex" : "flex"
              }`}
            >
              <div>
                <img src={card.thumbnail} alt="" className="w-[8rem] md:w-[10rem] object-contain" />
              </div>
              <div>
                <h1 className={`${styles.pixelTitle} text-sm md:text-lg lg:text-xl mb-4`}>
                  {card.title}
                </h1>
                <p className={`${styles.modalDescription} ${styles.modalTerminalLine} text-gray-400 text-sm md:text-base leading-relaxed`}>
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão Ver Mais / Ver Menos (Apenas visível em Mobile) */}
      {workExperience.length > 2 && (
        <div className="flex justify-center mt-8 md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-xl bg-[#111] border border-[#333] text-gray-300 hover:text-green-400 hover:border-green-400/50 transition-all shadow-md"
          >
            <span>{isExpanded ? "Ver menos" : "Ver mais experiências"}</span>
            {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default Experience;