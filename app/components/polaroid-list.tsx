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
    <div className="relative flex items-center justify-center w-full overflow-x-hidden px-2 pb-2 sm:px-4 sm:pb-4 md:px-8 md:pb-8 pt-20">
      <div className="relative flex flex-row items-center justify-center w-full">
        {polaroids.map((polaroid, index) => {
          const rotation = polaroid.rotation ?? (Math.random() - 0.5) * 20;
          const isHovered = hoveredIndex === index;
          const zIndex = isHovered ? 50 : index;

          return (
            <div
              key={index}
              className="relative flex items-center justify-center -mx-1 first:mx-0 sm:-mx-2 md:-mx-3"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isHovered && polaroid.alt && (
                <div
                  className="absolute -top-10 left-1/2 px-2 py-1 bg-black-custom text-white-custom text-xs rounded shadow-lg whitespace-nowrap z-50 pointer-events-none"
                  style={{
                    transform: `translateX(-50%) rotate(${
                      isHovered ? 0 : -rotation
                    }deg)`,
                  }}
                >
                  {polaroid.alt}
                  <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-black-custom rotate-45"></div>
                </div>
              )}
              <div
                className="transition-all duration-300 shadow-md"
                style={{
                  transform: `rotate(${isHovered ? 0 : rotation}deg) ${
                    isHovered ? "scale(1.05)" : "scale(1)"
                  }`,
                  zIndex,
                }}
              >
                <div className="w-20 sm:w-24 md:w-28 lg:w-32">
                  <PolaroidFrame src={polaroid.src} alt={polaroid.alt} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
