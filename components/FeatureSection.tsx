"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { MdVisibility, MdClose } from "react-icons/md";
// Ícones das ferramentas (Simple Icons)
import { 
  SiNodedotjs, 
  SiDocker, 
  SiKubernetes, 
  SiGithubactions, 
  SiPostgresql, 
  SiEslint, 
  SiJest 
} from "react-icons/si";

import styles from "./modules/FeatureSection.module.css";

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
  useEyeIcon?: boolean;
}

const TERMINAL_PROMPT = "M3N4@PORTFOLIO";
const PROMPT_COLOR = "text-pink-500";
const TERMINAL_PROMPT1 = ":";
const PROMPT_COLOR1 = "text-gray-500";
const TERMINAL_PROMPT2 = "~";
const PROMPT_COLOR2 = "text-blue-500";
const TERMINAL_PROMPT3 = "$ ";
const PROMPT_COLOR3 = "text-gray-500";

// Dados do Slider do Workflow
const workflowSteps = [
  {
    title: "1. Desenvolvimento e Ambiente",
    description: "Node.js (runtime principal) e ESLint com Prettier (para formatação e qualidade de código).",
  },
  {
    title: "2. Banco de Dados e Infraestrutura",
    description: "Neon DB (banco PostgreSQL serverless), Drizzle ORM (mapeamento objeto-relacional com segurança de tipos), Docker (conteinerização) e Kubernetes (orquestração de containers).",
  },
  {
    title: "3. Segurança e Monitoramento",
    description: "Arcjet (proteção contra bots e ataques), Zod (validação de esquemas e dados) e Winston (gerenciamento de logs estruturados).",
  },
  {
    title: "4. Testes e Automação",
    description: "Jest e Supertest (para testes automatizados) e GitHub Actions (para pipelines de CI/CD e automação de deployment).",
  },
];

const FeatureSection = ({
  title,
  subtitle,
  description,
  buttonText = "Saber mais",
  useEyeIcon = true,
}: FeatureSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < workflowSteps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <section className="relative w-full flex items-center justify-between py-10 px-0 md:px-12 overflow-hidden gap-8 lg:gap-16" id="whatIDO">
        {/* Content */}
        <div className="relative z-10 max-w-2xl flex-3">
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

          {/* DevOps Tools Miniatures */}
          <div className="flex flex-wrap gap-4 mb-8 text-gray-500 text-2xl md:text-3xl">
            <SiNodedotjs className="hover:text-green-500 transition-colors cursor-help" title="Node.js" />
            <SiDocker className="hover:text-blue-500 transition-colors cursor-help" title="Docker" />
            <SiKubernetes className="hover:text-blue-600 transition-colors cursor-help" title="Kubernetes" />
            <SiPostgresql className="hover:text-blue-400 transition-colors cursor-help" title="PostgreSQL" />
            <SiGithubactions className="hover:text-white transition-colors cursor-help" title="GitHub Actions" />
            <SiEslint className="hover:text-purple-500 transition-colors cursor-help" title="ESLint" />
            <SiJest className="hover:text-red-500 transition-colors cursor-help" title="Jest" />
          </div>

          {/* Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Único Botão (adaptado do primaryButton original) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.primaryButton}
            >
              <span className={styles["top-key"]} />
              <span className={styles.text}>
                {useEyeIcon && <MdVisibility className="inline mr-2 text-lg" />}
                {buttonText}
              </span>
              <span className={styles["bottom-key-1"]} />
              <span className={styles["bottom-key-2"]} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="hidden lg:flex flex-1 justify-end items-center">
          <div className="relative w-full max-w-md h-96">
            <Image
              src="/images/devops.png"
              alt="DevOps"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Mobile Image */}
        <div className="hidden md:flex lg:hidden flex-1 justify-end items-center">
          <div className="relative w-full max-w-xs h-64">
            <Image
              src="/images/devops.png"
              alt="DevOps"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Modal / Slider (Workflow) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Caixa do Modal */}
          <div 
            className="bg-[#0f0f0f] border border-[#333] rounded-2xl p-6 md:p-8 shadow-2xl max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Fechar Modal */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <MdClose size={24} />
            </button>

            {/* Título do Modal */}
            <h3 className="text-xl md:text-2xl font-mono text-green-400 mb-6 font-bold tracking-tight">
              &gt; Como começo um projecto?
            </h3>

            {/* Conteúdo do Slider */}
            <div className="min-h-[140px] flex flex-col justify-center">
              <h4 className="text-lg font-semibold text-white mb-3">
                {workflowSteps[currentStep].title}
              </h4>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {workflowSteps[currentStep].description}
              </p>
            </div>

            {/* Controlos do Slider */}
            <div className="flex items-center justify-between mt-8">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`p-2 rounded-full border transition-all ${
                  currentStep === 0 
                    ? "border-gray-800 text-gray-700 cursor-not-allowed" 
                    : "border-gray-500 text-white hover:bg-gray-800 hover:border-white"
                }`}
              >
                <FaArrowLeft />
              </button>

              {/* Indicadores (Dots) */}
              <div className="flex gap-2">
                {workflowSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentStep === index ? "w-6 bg-green-400" : "w-2 bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextStep}
                disabled={currentStep === workflowSteps.length - 1}
                className={`p-2 rounded-full border transition-all ${
                  currentStep === workflowSteps.length - 1 
                    ? "border-gray-800 text-gray-700 cursor-not-allowed" 
                    : "border-gray-500 text-white hover:bg-gray-800 hover:border-white"
                }`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureSection;