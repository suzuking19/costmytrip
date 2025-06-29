import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type UserProfile as UserProfileType } from "@/features/mypage/queries";

interface PinnedCity {
  city: {
    id: string;
    name: string;
    country: {
      name: string;
    };
  };
}

interface MypageProfileProps {
  profile: UserProfileType;
  userMetadata: {
    avatar_url?: string;
    full_name?: string;
    [key: string]: unknown;
  };
  pinnedCities: PinnedCity[];
}

export function MypageProfile({
  profile,
  userMetadata,
  pinnedCities,
}: MypageProfileProps) {
  return (
    <div className="mb-16">
      {/* Profile Header with Image and Username */}
      <div className="text-center mb-12">
        {/* Profile Image */}
        <div className="mb-6">
          {userMetadata.avatar_url ? (
            <Image
              src={userMetadata.avatar_url}
              alt={profile.username}
              width={120}
              height={120}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-white text-3xl font-bold">
                {profile.username.charAt(1)?.toUpperCase() ||
                  profile.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Username */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          @{profile.username}
        </h1>
      </div>

      {/* Information Grid */}
      <div className="flex justify-center mb-8">
        <div className="max-w-2xl w-full p-8">
          {/* Information Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 underline">
              Information
            </h3>

            <div className="space-y-4">
              {/* Current Location */}
              <div>
                <span className="text-gray-600 font-medium">
                  current location :{" "}
                </span>
                <span className="text-gray-900">
                  {profile.current_city
                    ? `${profile.current_city.name}, ${profile.current_city.country.name}`
                    : "Not specified"}
                </span>
              </div>

              {/* Languages */}
              <div>
                <span className="text-gray-600 font-medium">languages : </span>
                <span className="text-gray-900">
                  {profile.spoken_languages &&
                  profile.spoken_languages.length > 0
                    ? profile.spoken_languages.join(", ")
                    : "Not specified"}
                </span>
              </div>

              {/* SNS */}
              <div>
                <span className="text-gray-600 font-medium">SNS : </span>
                <div className="inline-flex items-center space-x-4 ml-2">
                  {profile.instagram_url ? (
                    <Link
                      href={profile.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600 transition-colors font-medium"
                    >
                      Instagram
                    </Link>
                  ) : (
                    <span className="text-gray-300 font-medium">Instagram</span>
                  )}

                  {profile.x_url ? (
                    <Link
                      href={profile.x_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 transition-colors font-medium"
                    >
                      X (Twitter)
                    </Link>
                  ) : (
                    <span className="text-gray-300 font-medium">
                      X (Twitter)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pinned Cities Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 underline">
              Pinned Cities
            </h3>

            {pinnedCities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {pinnedCities.map((pinnedCity) => (
                  <span
                    key={pinnedCity.city.id}
                    className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full border border-green-200"
                  >
                    {pinnedCity.city.name}, {pinnedCity.city.country.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No pinned cities yet</p>
            )}
          </div>

          {/* Book Mark list Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 underline">
              Book Mark list
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              *This list is private and will not be visible to other users
            </p>
            <Link
              href="/mypage/bookmarks"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              View bookmarked travel plans →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
