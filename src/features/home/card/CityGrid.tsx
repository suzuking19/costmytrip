"use client";

import { motion } from "motion/react";
import Link from "next/link";
import CityCardComponent from "./CityCard";
import { CityCard } from "./types";

interface CityGridProps {
  cities: CityCard[];
  isSignedIn: boolean;
}

export default function CityGrid({ cities, isSignedIn }: CityGridProps) {
  // if date is empty
  if (cities.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.p
          className="text-lg text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let&apos;s Share your experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href={isSignedIn ? "/create" : "/signin"}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            <span className="mr-2">+</span>
            Create
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {cities.map((cityCard, index) => (
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
