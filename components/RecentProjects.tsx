"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa6";
import { projects } from "@/data";
import styles from "./modules/RecentProjects.module.css";

const SCROLL_SPEED = 40;
const RESUME_DELAY = 1500;
const LOOP_COPIES = 2;
const MAX_FRAME_DELTA = 100;
const DRAG_THRESHOLD = 5;

const TERMINAL_PROMPT = "M3N4@PORTFOLIO";
const TERMINAL_PROMPT1 = ":";
const TERMINAL_PROMPT2 = "~";
const TERMINAL_PROMPT3 = "$ ";
const TERMINAL_PROMPT4 = ">>> ";

const RecentProjects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [activeThumbByProject, setActiveThumbByProject] = useState<Record<number, number>>({});

  const autoTimer = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const modalOpenRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const draggedRef = useRef(false); 
  const pendingClickIndexRef = useRef<number | null>(null);
  const pendingThumbRef = useRef<{ projectIndex: number; thumbIndex: number } | null>(null);
  const pendingLinkRef = useRef<string | null>(null);

  const selectedProjectData = selectedProject !== null ? projects[selectedProject] : null;
  const projectImages = selectedProjectData
    ? Array.isArray(selectedProjectData.img)
      ? selectedProjectData.img
      : [selectedProjectData.img]
    : [];

  const loopedProjects = Array.from({ length: LOOP_COPIES }).flatMap((_, setIndex) =>
    projects.map((project, originalIndex) => ({
      project,
      key: `${project.id}-${setIndex}`,
      originalIndex,
      isDuplicate: setIndex !== 0,
    }))
  );

  const normalize = (value: number) => {
    const width = singleSetWidthRef.current;
    if (!width) return 0;
    return ((value % width) + width) % width;
  };

  const applyTransform = () => {
    const track = carouselTrackRef.current;
    if (track) track.style.transform = `translateX(${-offsetRef.current}px)`;
  };

  const pauseNow = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    isPausedRef.current = true;
  };

  const resumeNow = () => {
    if (modalOpenRef.current) return;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    isPausedRef.current = false;
  };

  const resumeSoon = (delay = RESUME_DELAY) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!modalOpenRef.current) isPausedRef.current = false;
    }, delay);
  };

  useEffect(() => {
    modalOpenRef.current = selectedProject !== null;
    if (modalOpenRef.current) {
      pauseNow();
    } else {
      resumeSoon(300);
    }
  }, [selectedProject]);

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const measure = () => {
      singleSetWidthRef.current = track.scrollWidth / LOOP_COPIES;
      offsetRef.current = normalize(offsetRef.current);
      applyTransform();
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const step = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const delta = Math.min(timestamp - lastTimeRef.current, MAX_FRAME_DELTA);
      lastTimeRef.current = timestamp;

      if (!isPausedRef.current && !isDraggingRef.current) {
        offsetRef.current = normalize(offsetRef.current + (SCROLL_SPEED * delta) / 1000);
        applyTransform();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    draggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;

    const targetEl = e.target as HTMLElement;
    const thumbEl = targetEl.closest<HTMLElement>("[data-thumb-index]");
    const linkEl = targetEl.closest<HTMLElement>("[data-project-link]");
    const cardEl = targetEl.closest<HTMLElement>("[data-project-index]");

    if (thumbEl) {
      pendingThumbRef.current = {
        projectIndex: Number(thumbEl.dataset.parentIndex),
        thumbIndex: Number(thumbEl.dataset.thumbIndex),
      };
      pendingClickIndexRef.current = null;
      pendingLinkRef.current = null;
    } else if (linkEl) {
      pendingLinkRef.current = linkEl.getAttribute("href");
      pendingClickIndexRef.current = null;
      pendingThumbRef.current = null;
    } else {
      pendingClickIndexRef.current = cardEl ? Number(cardEl.dataset.projectIndex) : null;
      pendingThumbRef.current = null;
      pendingLinkRef.current = null;
    }

    pauseNow();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > DRAG_THRESHOLD) draggedRef.current = true;
    offsetRef.current = normalize(dragStartOffsetRef.current - deltaX);
    applyTransform();
  };

  const endDrag = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (!draggedRef.current) {
      if (pendingThumbRef.current) {
        const { projectIndex, thumbIndex } = pendingThumbRef.current;
        setActiveThumbByProject((prev) => ({ ...prev, [projectIndex]: thumbIndex }));
      } else if (pendingLinkRef.current) {
        window.open(pendingLinkRef.current, "_blank", "noopener,noreferrer");
      } else if (pendingClickIndexRef.current !== null) {
        handleOpenModal(pendingClickIndexRef.current);
      }
    }

    pendingClickIndexRef.current = null;
    pendingThumbRef.current = null;
    pendingLinkRef.current = null;

    resumeSoon();
  };

  const handleWheel: React.WheelEventHandler = (e) => {
    pauseNow();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    offsetRef.current = normalize(offsetRef.current + delta);
    applyTransform();
    resumeSoon();
  };
  
  const handleCardKeyboardClick = (e: React.MouseEvent, index: number) => {
    if (e.detail !== 0) return;
    handleOpenModal(index);
  };

  const handleThumbKeyboardClick = (
    e: React.MouseEvent,
    projectIndex: number,
    thumbIndex: number
  ) => {
    if (e.detail !== 0) return;
    setActiveThumbByProject((prev) => ({ ...prev, [projectIndex]: thumbIndex }));
  };

  useEffect(() => {
    if (!selectedProjectData || !autoPlay) {
      if (autoTimer.current) clearInterval(autoTimer.current);
      return;
    }

    autoTimer.current = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % projectImages.length);
    }, 5000);

    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [selectedProjectData, autoPlay, projectImages.length]);

  const handleImageNav = (dir: "prev" | "next") => {
    setAutoPlay(false);
    setImageIndex((prev) =>
      dir === "next"
        ? (prev + 1) % projectImages.length
        : (prev - 1 + projectImages.length) % projectImages.length
    );

    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setAutoPlay(true);
    }, 6000);
  };

  const handleOpenModal = (index: number) => {
    setSelectedProject(index);
    setImageIndex(0);
    setAutoPlay(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setImageIndex(0);
    setAutoPlay(false);
    if (autoTimer.current) clearInterval(autoTimer.current);
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
  };

  return (
    <div className="py-20" id="projects">
      <h1 className={`${styles.pixelTitle} text-3xl md:text-4xl lg:text-5xl mb-8 text-center`}>
        Projectos mais Recentes
      </h1>

      <p className={`${styles.modalTerminalLine} text-center max-w-[50rem] mb-16 mx-auto`}>
        <span className={styles.promptUser}>{TERMINAL_PROMPT}</span>
        <span className={styles.promptColon}>{TERMINAL_PROMPT1}</span>
        <span className={styles.promptTilde}>{TERMINAL_PROMPT2}</span>
        <span className={styles.promptDollar}>{TERMINAL_PROMPT3}</span>
        <span className={styles.modalDescription}>Arraste e selecione para poder ver o detalhe de cada projecto construído por mim enquanto desenvolvedor web freelancer</span>
      </p>

      <div className="relative w-full max-w-9xl mx-auto">
        <div className={styles.carouselContainer}>
          <div
            ref={carouselTrackRef}
            className={styles.carouselTrack}
            onMouseEnter={pauseNow}
            onMouseLeave={() => {
              endDrag();
              resumeNow();
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            onWheel={handleWheel}
          >
            {loopedProjects.map(({ project, key, originalIndex, isDuplicate }) => {
              const allImages = Array.isArray(project.img) ? project.img : [project.img];
              const activeThumb = activeThumbByProject[originalIndex] ?? 0;
              const mainImage = allImages[activeThumb] ?? allImages[0];
              const mainTech = project.iconLists?.[0];

              return (
                <div key={key} className={styles.carouselSlide} aria-hidden={isDuplicate || undefined}>
                  <div className={styles.projectCard}>
                    {/* ÁREA CLICÁVEL — abre o modal. JANELA MACOS */}
                    <div
                      role="button"
                      tabIndex={isDuplicate ? -1 : 0}
                      data-project-index={originalIndex}
                      className={styles.cardClickArea}
                      onClick={(e) => handleCardKeyboardClick(e, originalIndex)}
                    >
                      <div className={styles.windowContainer}>
                        {/* Window Header */}
                        <div className={styles.windowHeader}>
                          <div className={styles.windowControls}>
                            <div className={`${styles.controlDot} ${styles.close}`} />
                            <div className={`${styles.controlDot} ${styles.minimize}`} />
                            <div className={`${styles.controlDot} ${styles.maximize}`} />
                          </div>
                          <div className={styles.windowTitle}>{project.title}.png</div>
                        </div>

                        {/* Imagem */}
                        <div className={styles.windowImage}>
                          <img
                            src={mainImage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </div>

                    {/* LINHA 1: imagens adicionais (miniaturas) */}
                    {allImages.length > 1 && (
                      <div className={styles.cardThumbRow}>
                        {allImages.map((imgSrc, imgIdx) => (
                          <button
                            key={imgIdx}
                            type="button"
                            tabIndex={isDuplicate ? -1 : 0}
                            data-thumb-index={imgIdx}
                            data-parent-index={originalIndex}
                            onClick={(e) => handleThumbKeyboardClick(e, originalIndex, imgIdx)}
                            className={`${styles.cardThumb} ${
                              imgIdx === activeThumb ? styles.cardThumbActive : ""
                            }`}
                          >
                            <img
                              src={imgSrc}
                              alt={`${project.title} preview ${imgIdx + 1}`}
                              className="w-full h-full object-cover"
                              draggable={false}
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* LINHA 2: nome do projeto (link) + tecnologia principal */}
                    <div className={styles.cardInfoRow}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isDuplicate ? -1 : 0}
                        data-project-link="true"
                        className={styles.cardProjectLink}
                      >
                        <span className={styles.promptUser}>{TERMINAL_PROMPT4}</span>
                        {project.title}
                      </a>
                      {mainTech && (
                        <div className={styles.cardTechBadge}>
                          <img src={mainTech} alt="tech" className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* LINHA 3: descrição, truncada a 2 linhas */}
                    <p className={styles.cardDescription}>{project.des}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedProject !== null && selectedProjectData && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Botão Fechar */}
            <button onClick={handleCloseModal} className={styles.closeButton}>
              x
            </button>

            {/* Container com Imagem + Info */}
            <div className={styles.modalGrid}>
              {/* ESQUERDA: Informações (estilo FeatureSection) */}
              <div className={styles.modalInfo}>
                <h2 className={`${styles.modalPixelTitle} text-2xl md:text-3xl lg:text-4xl`}>
                  {selectedProjectData.title}
                </h2>

                <p className={styles.modalDate}>{selectedProjectData.date}</p>

                <p className={styles.modalTerminalLine}>
                  <span className={styles.promptUser}>{TERMINAL_PROMPT}</span>
                  <span className={styles.promptColon}>{TERMINAL_PROMPT1}</span>
                  <span className={styles.promptTilde}>{TERMINAL_PROMPT2}</span>
                  <span className={styles.promptDollar}>{TERMINAL_PROMPT3}</span>
                  <span className={styles.modalDescription}>{selectedProjectData.des}</span>
                </p>

                {/* Tecnologias */}
                <div className={styles.techContainer}>
                  <p className={styles.techLabel}>Stack:</p>
                  <div className={styles.techIcons}>
                    {selectedProjectData.iconLists.map((icon, i) => (
                      <div key={i} className={styles.techIcon}>
                        <img src={icon} alt="tech" className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA — mesmo estilo do botão primário da FeatureSection */}
                <a
                  href={selectedProjectData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                >
                  <span className={styles["top-key"]} />
                  <span className={styles.text}>
                    Ver Projecto
                    <FaArrowRight className="ml-2 inline text-sm" />
                  </span>
                  <span className={styles["bottom-key-1"]} />
                  <span className={styles["bottom-key-2"]} />
                </a>
              </div>

              {/* DIREITA: Imagem horizontal, sem chrome de macOS */}
              <div className={styles.modalImageWrap}>
                <div className={styles.modalImageBlob} />
                <div className={styles.modalImageContainer}>
                  <img
                    src={projectImages[imageIndex]}
                    alt={selectedProjectData.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Setas de Navegação */}
                  {projectImages.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageNav("prev")}
                        className={styles.navButton}
                        style={{ left: "12px" }}
                      >
                        <FaChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => handleImageNav("next")}
                        className={styles.navButton}
                        style={{ right: "12px" }}
                      >
                        <FaChevronRight size={18} />
                      </button>

                      {/* Dots */}
                      <div className={styles.dotsContainer}>
                        {projectImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setAutoPlay(false);
                              setImageIndex(i);
                              if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
                              inactivityTimer.current = setTimeout(() => {
                                setAutoPlay(true);
                              }, 6000);
                            }}
                            className={`${styles.dot} ${i === imageIndex ? styles.activeDot : ""}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Auto-play indicator */}
                  {autoPlay && projectImages.length > 1 && (
                    <div className={styles.autoplayIndicator}>
                      <div className={styles.autoplayBar} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProjects;