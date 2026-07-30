"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./modules/RecentProjects.module.css";

const Approach = () => {
  return (
    <section className="w-full py-20">
      <h1 className={`${styles.pixelTitle} text-3xl md:text-4xl lg:text-5xl mb-8 text-center`}>
          Como Respondo aos problemas?
      </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        <Card
          title="Planeamento e Estratégia"
          icon={<AceternityIcon order="Primeira Fase" />}
          des="Colaborar com o gestor de Produto e de Projectos para decidir o melhor caminho para o destino em que se pretende chegar, definindo o escopo e o levantando os requisitos para poder se criar uma proposta de desenvolvimento com o cronograma especificado"
        >
        </Card>
        <Card
          title="Desenvolvimento e Atualizações de Progresso"
          icon={<AceternityIcon order="Sefunda Fase" />}
          des="Iniciar o desenvovimento e executar o plano definido na proposta de desenvolvimento fornecendo atualizações periódicas aos gestor de projecto e de produto."
        >
          
        </Card>
        <Card
          title="Entrega do Resultado «"
          icon={<AceternityIcon order="Terceira Fase" />}
          des="Concluir o desenvolvimento do projecto realizar a apresentação dos resultados obtidos em uma reunião com todas as partes competentes e reavaliar os requisitos para que se tenha certeza de que o que foi proposto antes do desenvolvimento é o que será entregue em produção."
        >
        </Card>
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative lg:h-[25rem]"
      style={{
        background: "rgb(5, 5, 5)",
        backgroundColor:
          "linear-gradient(90deg, rgb(3, 7, 4) 0%, rgb(0, 12, 0) 100%)",
      }}
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {icon}
        </div>
        <h2 className={`${styles.pixelTitle} dark:text-white text-center text-2xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200`}>
          {title}
        </h2>
        <p
          className="text-sm opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 mt-4 group-hover/canvas-card:text-white text-center
         group-hover/canvas-card:-translate-y-2 transition duration-200"
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};
const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000702,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          {order}
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
