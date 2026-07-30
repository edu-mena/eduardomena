'use client';

import { gridItems } from "@/data";
import dynamic from "next/dynamic";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const GridGlobe = dynamic(() => import("./ui/GridGlobe"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-900" />,
});

const Grid = () => {
  return (
    <section id="diversos">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;