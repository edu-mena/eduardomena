"use client";

import { useState } from "react";
import styles from "./modules/Techstack.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

type TechItem = {
  name: string;
  description: string;
};

type TechCategory = {
  title: string;
  colorClass: string;
  items: TechItem[];
};

const techStack: TechCategory[] = [
  {
    title: "DevOps & Ferramentas",
    colorClass: "text-green-400",
    items: [
      {
        name: "Git",
        description: "Sistema de controlo de versões distribuído para gestão eficiente do código-fonte."
      },
      {
        name: "GitHub",
        description: "Plataforma para alojamento de repositórios Git, colaboração e gestão de projetos de software."
      },
      {
        name: "GitHub Actions",
        description: "Serviço de integração e entrega contínua (CI/CD) para automatizar testes, builds e deploys."
      },
      {
        name: "Docker",
        description: "Plataforma para criação, distribuição e execução de aplicações em contentores."
      },
      {
        name: "Kubernetes",
        description: "Sistema de orquestração de contentores para automatizar implantação, escalabilidade e gestão de aplicações."
      }
    ],
  },
  {
    title: "Linguagens",
    colorClass: "text-green-400",
    items: [
      { name: "HTML", description: "Uso para estruturar a base semântica de todas as interfaces web que construo, focando-me na acessibilidade." },
      { name: "CSS", description: "Uso para estilizar as interfaces web que desenvolvo, garantindo uma experiência visual atraente e responsiva." },
      { name: "JavaScript", description: "Linguagem de programação principal para adicionar interatividade e funcionalidades dinâmicas às minhas aplicações web." },
      { name: "TypeScript", description: "Superset do JavaScript que adiciona tipagem estática, melhorando a qualidade e manutenibilidade do código." },
      { name: "Java", description: "Linguagem de programação orientada a objetos amplamente utilizada para desenvolvimento de aplicações empresariais." },
      { name: "C", description: "Linguagem de programação de baixo nível, utilizada para desenvolvimento de sistemas operacionais e aplicações performance-críticas." },
      { name: "C#", description: "Linguagem de programação moderna e orientada a objetos, amplamente utilizada no desenvolvimento de aplicações .NET." },
      { name: "PHP", description: "Linguagem de script server-side, amplamente utilizada para desenvolvimento web dinâmico." }
    ],
  },
  {
    title: "Frameworks & Runtime",
    colorClass: "text-green-400",
    items: [
      { name: ".NET", description: "Framework da Microsoft para desenvolvimento de aplicações cross-platform." },
      { name: "Windows Forms", description: "Framework para desenvolvimento de aplicações desktop com interface gráfica." },
      { name: "React", description: "Biblioteca para construção de interfaces de usuário interativas." },
      { name: "Next.js", description: "Framework para desenvolvimento de aplicações React com server-side rendering." },
      { name: "Node.js", description: "Runtime para execução de código JavaScript no lado do servidor." },
      { name: "Express.js", description: "Framework minimalista para desenvolvimento de aplicações web com Node.js." },
      { name: "NestJS", description: "Framework para construção de aplicações backend escaláveis e eficientes com Node.js." }
    ],
  },
  {
    title: "Bases de Dados",
    colorClass: "text-green-400",
    items: [
      {
        name: "MongoDB",
        description: "Base de dados NoSQL orientada a documentos, ideal para aplicações escaláveis e com dados flexíveis."
      },
      {
        name: "PostgreSQL",
        description: "Sistema de gestão de bases de dados relacional, conhecido pela sua robustez, desempenho e conformidade com SQL."
      },
      {
        name: "MySQL",
        description: "Sistema de gestão de bases de dados relacional amplamente utilizado em aplicações web e empresariais."
      },
      {
        name: "SQLite",
        description: "Base de dados relacional leve e embutida, ideal para aplicações locais, móveis e protótipos."
      }
    ],
  },
  {
    title: "Bibliotecas & Testes",
    colorClass: "text-green-400",
    items: [
      {
        name: "Drizzle ORM",
        description: "ORM moderno e fortemente tipado para TypeScript, focado em desempenho e simplicidade."
      },
      {
        name: "Arcjet",
        description: "Biblioteca de segurança para proteção de aplicações contra abusos, bots e ataques automatizados."
      },
      {
        name: "Zod",
        description: "Biblioteca para validação e tipagem de dados em TypeScript, garantindo segurança na manipulação de informações."
      },
      {
        name: "Winston",
        description: "Biblioteca para registo (logging) de eventos e monitorização de aplicações Node.js."
      },
      {
        name: "Jest",
        description: "Framework para testes unitários e de integração em aplicações JavaScript e TypeScript."
      },
      {
        name: "Supertest",
        description: "Biblioteca para testes de APIs HTTP, permitindo validar endpoints de forma automatizada."
      }
    ],
  },
];

const TechStack = () => {
  const [selectedTool, setSelectedTool] = useState<TechItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // No telemóvel, se não estiver expandido, mostramos apenas os primeiros 2 elementos
  const displayedCategories = isExpanded ? techStack : techStack.slice(0, 2);

  return (
    <>
      <section id="techstack" className="relative w-full py-16 px-0 md:px-12 overflow-hidden">
        {/* Title */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className={`${styles.pixelTitle} text-3xl md:text-4xl lg:text-5xl mb-8`}>
            Stack
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Em desktop mostramos tudo, em mobile depende do isExpanded */}
          {techStack.map((category, index) => {
            const isHiddenOnMobile = !isExpanded && index >= 2;
            
            return (
              <div
                key={category.title}
                className={`${styles.card} bg-[#0a0a0a] border border-[#222] rounded-xl p-6 shadow-lg flex flex-col ${
                  isHiddenOnMobile ? "hidden md:flex" : "flex"
                }`}
                style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
              >
                <h3 className={`${category.colorClass} text-sm md:text-base font-mono tracking-widest uppercase mb-5 flex items-center gap-2`}>
                  <span className="text-gray-600">{"//"}</span>
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {category.items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setSelectedTool(item)}
                      className="bg-[#151515] hover:bg-[#202020] border border-[#333] hover:border-[#555] text-gray-300 text-xs md:text-sm font-mono px-3 py-1.5 rounded-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão Ver Mais / Ver Menos (Apenas visível em Mobile) */}
        <div className="flex justify-center mt-10 md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-xl bg-[#111] border border-[#333] text-gray-300 hover:text-green-400 hover:border-green-400/50 transition-all shadow-md"
          >
            <span>{isExpanded ? "Ver menos" : "Ver mais categorias"}</span>
            {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </button>
        </div>
      </section>

      {/* Modal Overlay */}
      {selectedTool && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-start p-6 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedTool(null)}
        >
          <div 
            className="bg-[#111] border border-[#333] p-6 rounded-xl shadow-2xl max-w-sm w-full relative mb-4 ml-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedTool(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <h4 className="text-xl font-bold text-white mb-2 font-mono">
              {selectedTool.name}
            </h4>
            <div className="w-8 h-1 bg-green-400 mb-4 rounded-full"></div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              "{selectedTool.description}"
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TechStack;