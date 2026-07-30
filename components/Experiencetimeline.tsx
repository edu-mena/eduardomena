"use client";

import { Fragment, useRef, useState } from "react";
import { experienceData } from "@/data";
import styles from "./modules/Experiencetimeline.module.css";

// Distância horizontal entre pontos consecutivos na timeline.
const DOT_SPACING = 160;
// Largura de cada card. Sendo maior que DOT_SPACING, o card "transborda"
// para dentro do espaço da coluna vizinha, criando o efeito de sobreposição
// (como se as células de cima e de baixo partilhassem parte da mesma coluna).
const CARD_WIDTH = 240;
// Espaço extra nas laterais para o primeiro/último card não ficarem cortados.
const EDGE_PADDING = Math.max(0, (CARD_WIDTH - DOT_SPACING) / 2) + 16;

const ExperienceTimeline = () => {
  // Refs e States para o arrasto manual
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Funções manipuladoras de eventos de rato
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault(); // Previne seleção de texto durante o arrasto
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Multiplicador de velocidade do scroll
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "full-time": "text-gray-400",
      "estágio": "text-gray-400",
      "freelance": "text-gray-400",
      "remoto": "text-gray-400",
    };
    return colors[type] || "text-gray-400";
  };

  const CardComponent = ({ item }: { item: (typeof experienceData)[0] }) => (
    <div
      className={`${styles.card} bg-[#000000] border border-[#303030] p-6 min-w-[300px] flex-shrink-0 relative`}
      style={{ width: CARD_WIDTH }}
    >
      <span className="text-gray-400 text-xs font-mono tracking-wider">
        {item.period}
      </span>
      <p className="text-green-500 mt-2">{item.title}</p>
      <p className="text-gray-400 text-sm mt-1 uppercase">{item.companyname}</p>
      <p className="text-gray-500 text-xs mt-1">{item.location}</p>
      <div className="mt-3 absolute top-3 right-4">
        <span
          className={`${getTypeColor(
            item.type
          )} text-xs font-mono px-2 py-1 rounded bg-gray-800/50`}
        >
          {item.type}
        </span>
      </div>
    </div>
  );

  const DotComponent = () => (
    <div
      className={`${styles.dot} w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 shadow-lg shadow-green-400/50 flex-shrink-0`}
    />
  );

  return (
    <section id="experience" className="relative w-full py-16 px-0 md:px-12 overflow-hidden">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className={`${styles.pixelTitle} text-3xl md:text-4xl lg:text-5xl mb-8`}>
          Experiência
        </h2>
      </div>

      {/* Desktop: Horizontal Timeline with Scroll */}
      <div className="hidden md:block max-w-7xl mx-auto">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`${styles.scrollContainer} overflow-x-auto pb-8 pl-6 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } select-none scroll-smooth hover:scroll-auto hide-scrollbar`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Oculta scrollbar no Firefox/IE
        >
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${experienceData.length}, ${DOT_SPACING}px)`,
              gridTemplateRows: "auto auto auto",
              columnGap: 24,
              paddingLeft: EDGE_PADDING,
              paddingRight: EDGE_PADDING,
            }}
          >
            {/* Line */}
            <div
              className="pointer-events-none bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-800/50 self-center h-1 z-0"
              style={{
                gridRow: 2,
                gridColumn: `1 / span ${experienceData.length}`,
              }}
            />

            {experienceData.map((item, index) => {
              const isAbove = index % 2 === 0;
              const column = index + 1;
              const delay = { animationDelay: `${(index % 6) * 0.1 + 0.1}s` };

              return (
                <Fragment key={item.id}>
                  {/* Row 1 */}
                  <div
                    className="flex items-end justify-center pb-6"
                    style={{ gridColumn: column, gridRow: 1 }}
                  >
                    {isAbove && (
                      <div className={styles.timelineItemHorizontal} style={delay}>
                        <CardComponent item={item} />
                      </div>
                    )}
                  </div>

                  {/* Row 2 */}
                  <div
                    className="relative z-20 flex items-center justify-center"
                    style={{ gridColumn: column, gridRow: 2 }}
                  >
                    <DotComponent />
                  </div>

                  {/* Row 3 */}
                  <div
                    className="flex items-start justify-center pt-6"
                    style={{ gridColumn: column, gridRow: 3 }}
                  >
                    {!isAbove && (
                      <div className={styles.timelineItemHorizontal} style={delay}>
                        <CardComponent item={item} />
                      </div>
                    )}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden max-w-4xl mx-auto">
        {/* ... (Seu código mobile mantém-se exatamente igual) ... */}
        <div className="relative">
          <div className="absolute left-0.4 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-500/50 via-gray-500/30 to-gray-500/50 z-0" />
          <div className="space-y-8">
            {experienceData.map((item) => (
              <div key={item.id} className={`relative ${styles.timelineItemVertical} pl-8`}>
                <div className="absolute left-0 top-2 transform -translate-x-1.5 z-20">
                  <DotComponent />
                </div>
                <div
                  className={`${styles.card} bg-[#000000] border border-[#303030] p-6 min-w-[300px] flex-shrink-0 relative`}
                  style={{ width: CARD_WIDTH }}
                >
                  <span className="text-gray-400 text-xs font-mono tracking-wider">
                    {item.period}
                  </span>
                  <p className="text-green-500 mt-2">{item.title}</p>
                  <p className="text-gray-400 text-sm mt-1 uppercase">
                    {item.companyname}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{item.location}</p>
                  <div className="mt-3 absolute top-3 right-4">
                    <span
                      className={`${getTypeColor(
                        item.type
                      )} text-xs font-mono px-2 py-1 rounded bg-gray-800/50`}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;