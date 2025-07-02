"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, Trophy, ArrowRight } from "lucide-react";
import Tag from "@/components/elements/tag/Tag";
import { CityCard } from "./types";

interface CityCardComponentProps {
  cityCard: CityCard;
  isSignedIn: boolean;
}

export default function CityCardComponent({
  cityCard,
  isSignedIn,
}: CityCardComponentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLearnMore = async () => {
    if (!isSignedIn) {
      router.push("/signin");
      return;
    }

    setIsLoading(true);
    // Navigate to city page
    router.push(`/${cityCard.id}`);
  };

  const getInitials = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  const getAvatarColor = (username: string) => {
    // Generate a consistent color based on username
    const colors = [
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-green-500",
    ];
    const index = username.length % colors.length;
    return colors[index];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm transition-transform duration-200 hover:shadow-xl">
      {/* Header section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            {cityCard.name}
          </h2>
          <p className="text-sm text-gray-500">{cityCard.country}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-teal-600 mr-1" />
            <span className="text-gray-600 text-sm">
              {cityCard.pinCount} pinned
            </span>
          </div>
        </div>
      </div>

      {/* Average cost section */}
      <div className="mb-4">
        <span className="text-gray-600 text-lg">Avg : </span>
        <span className="text-4xl font-bold text-indigo-600">
          {cityCard.averageCost.toFixed(1)}
        </span>
        <span className="text-gray-600 text-lg ml-1">
          {" "}
          {cityCard.currency} /person/day
        </span>
      </div>

      {/* Contributions section */}
      <p className="text-gray-600 mb-6">
        {cityCard.contributionCount} contributions
      </p>

      {/* Top post section */}
      <div className="bg-stone-50 rounded-lg p-4 mb-6 border border-stone-200">
        <div className="flex items-center mb-2">
          <Trophy className="h-5 w-5 text-orange-500 mr-2" />
          <span className="text-gray-700 font-medium">Top Post by</span>
          <div
            className={`w-8 h-8 rounded-full ml-2 flex items-center justify-center text-white text-sm font-semibold ${getAvatarColor(
              cityCard.topPost.author.username
            )}`}
          >
            {cityCard.topPost.author.avatarUrl ? (
              <Image
                src={cityCard.topPost.author.avatarUrl}
                alt={`${cityCard.topPost.author.username} avatar`}
                width={32}
                height={32}
                className="object-cover rounded-full"
              />
            ) : (
              <span>{getInitials(cityCard.topPost.author.username)}</span>
            )}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            @{cityCard.topPost.author.username}
          </span>
        </div>

        <div className="flex items-baseline mb-3">
          <span className="text-3xl font-bold text-teal-600">
            {cityCard.topPost.cost.toFixed(1)}
          </span>
          <span className="text-gray-600 ml-1">
            {" "}
            {cityCard.currency} /person/day
          </span>
        </div>

        {/* Details */}
        <div className="text-gray-700 text-sm space-y-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <span>
              Duration : {formatDate(cityCard.topPost.startDate)} -{" "}
              {formatDate(cityCard.topPost.endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Type :</span>
            <Tag
              text={cityCard.topPost.travelType}
              color="secondary"
              variant="soft"
              size="sm"
              className="mr-1"
            />
            <Tag
              text={cityCard.topPost.position}
              color="accent"
              variant="soft"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Learn more button */}
      <button
        onClick={handleLearnMore}
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            Learn more
            <ArrowRight className="h-5 w-5 ml-2" />
          </>
        )}
      </button>
    </div>
  );
}
