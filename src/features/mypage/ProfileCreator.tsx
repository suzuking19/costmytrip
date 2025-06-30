"use client";

import React, { useState } from "react";
import { createProfileAction } from "@/features/mypage/actions";
import { validateUsername } from "@/utils/validation";

interface ProfileCreatorProps {
  userId: string;
}

export function ProfileCreator({ userId }: ProfileCreatorProps) {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    // Clear errors when user starts typing
    setError(null);

    // Validate in real-time
    if (value.trim()) {
      const validation = validateUsername(value.trim());
      setValidationError(validation.isValid ? null : validation.error || null);
    } else {
      setValidationError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    // Validate username format
    const validation = validateUsername(username.trim());
    if (!validation.isValid) {
      setError(validation.error || "Invalid username format");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createProfileAction(userId, username.trim());

      if (result.success) {
        // Refresh the page to show the created profile
        window.location.reload();
      } else {
        setError(result.error || "Failed to create profile");
      }
    } catch (err) {
      console.error("Profile creation error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to CostMyTrip!
          </h1>
          <p className="text-gray-600">
            Let&apos;s create your profile to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your username"
              disabled={isLoading}
            />
            {validationError && (
              <p className="text-red-600 text-sm mt-1">{validationError}</p>
            )}
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={isLoading || !username.trim() || !!validationError}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating Profile..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
