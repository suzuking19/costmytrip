"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CityGrid, SearchBox } from "./index";
import { CityCard } from "./card/types";

interface HomeContentProps {
  cities: CityCard[];
  isSignedIn: boolean;
}

interface SearchTag {
  id: string;
  text: string;
  type: "city" | "country";
}

export default function HomeContent({ cities, isSignedIn }: HomeContentProps) {
  const handleCitySelect = (cityId: string) => {
    // TODO: Implement city filtering or navigation
    console.log("Selected city:", cityId);
  };

  const handleSearchTagsChange = (tags: SearchTag[]) => {
    // TODO: Implement filtering based on search tags (OR condition with first tag priority)
    console.log("Search tags changed:", tags);
  };

  return (
    <>
      {/* Header with SVG and Text */}
      <motion.div
        className="flex items-center justify-center mb-6 mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Image
            src="/mrdoll.svg"
            alt="Mr. Doll"
            width={40}
            height={40}
            className="mr-4"
          />
        </motion.div>
        <motion.h1
          className="text-3xl font-semibold text-indigo-600"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          Heyyy, Where you go ?
        </motion.h1>
      </motion.div>

      {/* Search Box */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <SearchBox
          cities={cities}
          onCitySelect={handleCitySelect}
          onSearchTagsChange={handleSearchTagsChange}
        />
      </motion.div>

      {/* City Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <CityGrid cities={cities} isSignedIn={isSignedIn} />
      </motion.div>
    </>
  );
}
