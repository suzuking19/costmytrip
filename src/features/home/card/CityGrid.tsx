"use client";

import CityCardComponent from "./CityCard";
import { mockCityCards } from "../mockData";

interface CityGridProps {
  isSignedIn: boolean;
}

export default function CityGrid({ isSignedIn }: CityGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
      {mockCityCards.map((cityCard) => (
        <CityCardComponent
          key={cityCard.id}
          cityCard={cityCard}
          isSignedIn={isSignedIn}
        />
      ))}
    </div>
  );
}
