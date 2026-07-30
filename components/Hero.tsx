"use client";

import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { MultiPhraseTypewriter } from "./ui/MultiPhraseTypewriter";

const Hero = () => {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-screen w-screen flex flex-col items-center justify-center">
      {/* Imagem de fundo */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay escuro para manter o texto legível sobre a imagem */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Degradê na base do hero, a desvanecer para o fundo da página */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[rgb(5, 15, 6)]" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-20">
        {/* Typewriter - z-0 para ficar atrás da imagem */}
        <div className="relative z-0 -mb-5">
          <MultiPhraseTypewriter
            phrases={[
              "Olá, Humano!",
              "Daqui Eduardo Mena",
              "Bem-vindo ao meu Portfólio",
              "Explore muito :)"
            ]}
            className="font-mono text-[#00FF00] text-sm md:text-lg lg:text-xl text-center leading-tight h-[1.25em]"
            typingSpeed={50}
            deletingSpeed={30}
            pauseDuration={1800}
          />
        </div>

        {/* Imagem de Perfil - z-10 para ficar acima do typewriter mas atrás do botão */}
        <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 -mb-16">
          <Image
            src="/hero/hero.png"
            alt="Perfil"
            fill
            priority
            className="object-contain object-center drop-shadow-2xl"
          />
        </div>

        {/* Botão - z-20 para sobrepor a parte inferior da imagem */}
        <div className="relative z-20 pt-6">
          <MagicButton
            title="Ver Portfólio"
            icon={<FaLocationArrow />}
            position="right"
            handleClick={() =>
              document.getElementById("whatIDO")?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;