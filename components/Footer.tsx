"use client";

import { FaLocationArrow, FaWhatsapp, FaPhone } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import styles from "./modules/RecentProjects.module.css";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 px-6 md:px-12" id="contact">
      <div className="flex flex-col items-center">
        <h1 className={`${styles.pixelTitle} text-2xl md:text-3xl lg:text-4xl mb-6 text-center`}>
          Deseja elevar a capacidade técnica na sua empresa?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Entre em contacto e vamos começar este seu novo capítulo.
        </p>

        {/* Botões de Ação Direta */}
        <div className="flex flex-wrap justify-center items-center gap-4 my-4">
          <a href="mailto:e.mena.baptista@gmail.com">
            <MagicButton
              title="Enviar Email"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>

          <a 
            href="https://wa.me/244927450909" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MagicButton
              title="WhatsApp"
              icon={<FaWhatsapp className="text-green-400 text-lg" />}
              position="right"
            />
          </a>

          <a href="tel:+244927450909">
            <MagicButton
              title="Ligar"
              icon={<FaPhone className="text-blue-400 text-sm" />}
              position="right"
            />
          </a>
        </div>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light mb-8">
          Copyright © 2026 Eduardo Mena Baptista
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              href="https://github.com/edu-mena"
              target="_blank"
              rel="noopener noreferrer"
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:border-green-400/50 transition-all"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;