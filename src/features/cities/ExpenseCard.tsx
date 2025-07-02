"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import {
  Calendar,
  Users,
  MapPin,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
} from "lucide-react";
import Tag from "@/components/elements/tag/Tag";
import { ExpenseCard } from "./types";

interface ExpenseCardComponentProps {
  expenseCard: ExpenseCard;
  isSignedIn: boolean;
  onBookmarkToggle?: (cardId: string) => void;
}

export default function ExpenseCardComponent({
  expenseCard,
  isSignedIn,
  onBookmarkToggle,
}: ExpenseCardComponentProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(expenseCard.isBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(expenseCard.bookmarkCount);

  const handleBookmarkClick = () => {
    if (!isSignedIn) {
      // TODO: Show sign-in modal or redirect
      return;
    }

    const newBookmarked = !isBookmarked;
    setIsBookmarked(newBookmarked);
    setBookmarkCount((prev) => (newBookmarked ? prev + 1 : prev - 1));

    if (onBookmarkToggle) {
      onBookmarkToggle(expenseCard.id);
    }
  };

  const handleLearnMore = () => {
    // Navigate to expense card detail page
    router.push(`/${expenseCard.cityId}/expense/${expenseCard.id}`);
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

  const formatCreatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Header section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {expenseCard.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {expenseCard.cityName}, {expenseCard.country}
            </span>
          </div>
        </div>
        <button
          onClick={handleBookmarkClick}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5 text-indigo-600" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
          <span className="font-medium">{bookmarkCount}</span>
        </button>
      </div>

      {/* Cost section */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-indigo-600">
            {expenseCard.dailyCost.toFixed(1)}
          </span>
          <span className="text-gray-600 ml-1">
            {" "}
            {expenseCard.currency} /person/day
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Total: {expenseCard.totalCost} {expenseCard.currency} for{" "}
          {expenseCard.duration} days
        </div>
      </div>

      {/* Trip details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <span>
            {formatDate(expenseCard.startDate)} -{" "}
            {formatDate(expenseCard.endDate)}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <Users className="h-4 w-4 text-gray-500 mr-2" />
          <span>
            {expenseCard.participants}{" "}
            {expenseCard.participants === "1" ? "person" : "people"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Tag
            text={expenseCard.travelType}
            color="secondary"
            variant="soft"
            size="sm"
          />
          <Tag
            text={expenseCard.position}
            color="accent"
            variant="soft"
            size="sm"
          />
        </div>
      </div>

      {/* Description */}
      <div className="bg-stone-50 rounded-lg p-3 mb-4 flex-grow">
        <p className="text-sm text-gray-700 line-clamp-3">
          {expenseCard.overallDescription}
        </p>
      </div>

      {/* Author section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-sm font-semibold ${getAvatarColor(
              expenseCard.author.username
            )}`}
          >
            {expenseCard.author.avatarUrl ? (
              <Image
                src={expenseCard.author.avatarUrl}
                alt={`${expenseCard.author.username} avatar`}
                width={32}
                height={32}
                className="object-cover rounded-full"
              />
            ) : (
              <span>{getInitials(expenseCard.author.username)}</span>
            )}
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">
              @{expenseCard.author.username}
            </span>
            <div className="text-xs text-gray-500">
              {formatCreatedDate(expenseCard.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Learn more button */}
      <button
        onClick={handleLearnMore}
        className="w-full mt-4 text-gray-600 hover:text-gray-800 py-2 px-4 font-medium transition duration-300 flex items-center justify-center hover:bg-gray-50 rounded-lg"
      >
        Learn more
        <ArrowRight className="h-4 w-4 ml-2" />
      </button>
    </motion.div>
  );
}
