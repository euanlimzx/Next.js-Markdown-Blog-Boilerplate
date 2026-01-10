"use client";

import { useState } from "react";
import { PolaroidFrame } from "./polaroid-frame";

interface Polaroid {
  src: string;
  alt?: string;
  rotation?: number;
}

interface PolaroidListProps {
  polaroids: Polaroid[];
}

export function PolaroidList({ polaroids }: PolaroidListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative flex items-center justify-center w-full overflow-x-hidden px-2 pb-2 sm:px-4 sm:pb-4 md:px-8 md:pb-8 pt-8">
      <div className="relative flex flex-row items-center justify-center w-full">
        {polaroids.map((polaroid, index) => {
          const rotation = polaroid.rotation ?? (Math.random() - 0.5) * 20;
          const isHovered = hoveredIndex === index;
          const zIndex = isHovered ? 50 : index;

          return (
            <div
              key={index}
              className="transition-all duration-300 flex items-center justify-center -mx-1 first:mx-0 sm:-mx-2 md:-mx-3"
              style={{
                transform: `rotate(${isHovered ? 0 : rotation}deg) ${
                  isHovered ? "scale(1.05)" : "scale(1)"
                }`,
                zIndex,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-20 sm:w-24 md:w-28 lg:w-32">
                <PolaroidFrame src={polaroid.src} alt={polaroid.alt} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
