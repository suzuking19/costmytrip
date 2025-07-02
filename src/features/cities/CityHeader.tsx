"use client";

import { MapPin, TrendingUp, Users, FileText } from "lucide-react";

interface CityHeaderProps {
  cityName: string;
  country: string;
  totalCards: number;
  averageCost: number;
  currency: string;
}

export default function CityHeader({
  cityName,
  country,
  totalCards,
  averageCost,
  currency,
}: CityHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* City info */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center mb-2">
            <MapPin className="h-6 w-6 text-teal-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">{cityName}</h1>
          </div>
          <p className="text-lg text-gray-600">{country}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Average cost */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">
                Average Cost
              </span>
            </div>
            <div className="text-2xl font-bold text-indigo-600">
              {averageCost.toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">{currency} /person/day</div>
          </div>

          {/* Total cards */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">
                Expense Cards
              </span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {totalCards}
            </div>
            <div className="text-sm text-gray-500">published</div>
          </div>

          {/* Contributors */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-teal-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">
                Contributors
              </span>
            </div>
            <div className="text-2xl font-bold text-teal-600">{totalCards}</div>
            <div className="text-sm text-gray-500">travelers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
