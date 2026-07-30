"use client";

import { navItems } from "@/data";

import dynamic from "next/dynamic";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import RecentProjects from "@/components/RecentProjects";
import ExperienceTimeline from "@/components/Experiencetimeline";
import TechStack from "@/components/Techstack";
import Grid from "@/components/Grid";
import About from "@/components/about";
import Footer from "@/components/Footer";

const Approach = dynamic(() => import("@/components/Approach"), {
  ssr: false,
  loading: () => <div className="w-full py-20" />,
});


const Home = () => {
  return (
    <main className="relative bg-black-600 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <FeatureSection 
          subtitle="O que eu sou?" 
          title="Engenheiro DevOps" 
          description="Criando estruturas sólidas e seguras pemitindo o desenvolvimento progressivo e escalável de websites e aplicativos móveis, desafio moderno atual."
        />
        <RecentProjects />
        <TechStack />
        <ExperienceTimeline />
        <Approach />
        <Grid />
        <About
          subtitle="Quem Sou?" 
          title="Eduardo Mena baptista" 
          description="Profissional apaixonado por tecnologia com experiência em gestão de projetos digitais, operações administrativas e programação com foco em desenvolvimento web. Durante o meu percorso visitei áreas como design gráfico, docência, programação frontend e gestão administrativa o que me permitiu combinar estas habilidades para me tornar no que sou agora. "
        />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
