"use client";

import { motion } from "motion/react";
import CityCardComponent from "./CityCard";
import { mockCityCards } from "../mockData";

interface CityGridProps {
  isSignedIn: boolean;
}

export default function CityGrid({ isSignedIn }: CityGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {mockCityCards.map((cityCard, index) => (
        <motion.div
          key={cityCard.id}
          className="w-full h-full flex"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          <CityCardComponent cityCard={cityCard} isSignedIn={isSignedIn} />
        </motion.div>
      ))}
    </div>
  );
}
