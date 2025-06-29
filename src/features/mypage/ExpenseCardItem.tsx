"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, Eye, Bookmark } from "lucide-react";
import { ExpenseCard } from "@/features/mypage/queries";
import { toggleBookmarkAction } from "@/features/mypage/actions";

interface ExpenseCardItemProps {
  card: ExpenseCard;
  userId?: string;
  showBookmark?: boolean;
  isBookmarked?: boolean;
}

export function ExpenseCardItem({
  card,
  userId,
  showBookmark = false,
  isBookmarked = false,
}: ExpenseCardItemProps) {
  const handleBookmarkToggle = async () => {
    if (!userId) return;

    try {
      await toggleBookmarkAction(userId, card.id);
    } catch (error) {
      console.error("Bookmark toggle failed:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusColor = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    archived: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <Link
              href={`/trips/${card.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors block"
            >
              {card.title}
            </Link>
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  statusColor[card.status.name as keyof typeof statusColor] ||
                  statusColor.archived
                }`}
              >
                {card.status.name === "published"
                  ? "Published"
                  : card.status.name === "draft"
                  ? "Draft"
                  : card.status.name}
              </span>
            </div>
          </div>
          {showBookmark && userId && (
            <button
              onClick={handleBookmarkToggle}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked
                  ? "text-yellow-500 hover:text-yellow-600"
                  : "text-gray-400 hover:text-yellow-500"
              }`}
              title={isBookmarked ? "Remove bookmark" : "Add to bookmark"}
            >
              <Bookmark
                className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>
          )}
        </div>

        {card.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {card.description}
          </p>
        )}

        <div className="space-y-3 text-sm text-gray-600">
          {card.city && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>
                {card.city.name}, {card.city.country.name}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>
              {formatDate(card.start_date)} - {formatDate(card.end_date)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{card.number_of_travelers} people</span>
          </div>

          {card.travel_type && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                {card.travel_type.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {formatDate(card.created_at)}
          </span>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {card.status.name === "published" && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>0 views</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ExpenseCardsGridProps {
  cards: ExpenseCard[];
  userId?: string;
  showBookmark?: boolean;
  emptyMessage?: string;
}

export function ExpenseCardsGrid({
  cards,
  userId,
  showBookmark = false,
  emptyMessage = "No travel records yet",
}: ExpenseCardsGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Calendar className="h-12 w-12 mx-auto" />
        </div>
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <ExpenseCardItem
          key={card.id}
          card={card}
          userId={userId}
          showBookmark={showBookmark}
        />
      ))}
    </div>
  );
}
