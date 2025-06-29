"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { updateProfileAction } from "@/features/mypage/actions";
import { type UserProfile } from "@/features/mypage/queries";

interface SettingsFormProps {
  profile: UserProfile;
  userId: string;
}

export function SettingsForm({ profile, userId }: SettingsFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Debug: Log form data
      console.log("FormData entries:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: "${value}"`);
      }

      const result = await updateProfileAction(userId, formData);

      if (result.success) {
        setSuccess(true);
        // Redirect to mypage after a short delay
        setTimeout(() => {
          router.push("/mypage");
        }, 2000);
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          href="/mypage"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            Profile updated successfully! Redirecting to your profile...
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Form */}
      <form action={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="pb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              This information will be displayed on your public profile
            </p>
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={profile.username}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="username"
            />
            <p className="text-sm text-gray-500 mt-2">
              This will be displayed as @username on your profile
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bio
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={profile.description || ""}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-sm text-gray-500 mt-2">
              Write a short bio to help others get to know you
            </p>
          </div>
        </div>

        {/* Location & Languages Section */}
        <div className="space-y-6">
          <div className="pb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Location & Languages
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Help others find you based on your location and languages
            </p>
          </div>

          {/* Current City */}
          <div>
            <label
              htmlFor="current_city_id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Location
            </label>
            <input
              type="text"
              id="current_city_id"
              name="current_city_id"
              defaultValue={profile.current_city_id || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Enter city ID (e.g., tokyo-jp)"
            />
            <p className="text-sm text-gray-500 mt-2">
              Currently:{" "}
              {profile.current_city
                ? `${profile.current_city.name}, ${profile.current_city.country.name}`
                : "Not specified"}
            </p>
          </div>

          {/* Languages */}
          <div>
            <label
              htmlFor="spoken_languages"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Languages
            </label>
            <input
              type="text"
              id="spoken_languages"
              name="spoken_languages"
              defaultValue={profile.spoken_languages?.join(", ") || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="e.g., English, Japanese, Spanish"
            />
            <p className="text-sm text-gray-500 mt-2">
              Separate multiple languages with commas
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-6">
          <div className="pb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Social Media
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Connect your social media accounts to your profile
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Instagram */}
            <div>
              <label
                htmlFor="instagram_url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Instagram URL
              </label>
              <input
                type="url"
                id="instagram_url"
                name="instagram_url"
                defaultValue={profile.instagram_url || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="https://instagram.com/username"
              />
            </div>

            {/* X (Twitter) */}
            <div>
              <label
                htmlFor="x_url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                X (Twitter) URL
              </label>
              <input
                type="url"
                id="x_url"
                name="x_url"
                defaultValue={profile.x_url || ""}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="https://x.com/username"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>

          <Link
            href="/mypage"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-8 py-3 rounded-lg transition-all duration-200"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
