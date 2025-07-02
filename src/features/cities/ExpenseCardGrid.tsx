"use client";

import { useState, useMemo } from "react";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import ExpenseCardComponent from "./ExpenseCard";
import { ExpenseCard } from "./types";

interface ExpenseCardGridProps {
  expenseCards: ExpenseCard[];
  isSignedIn: boolean;
  onBookmarkToggle?: (cardId: string) => void;
}

type SortOption = "newest" | "oldest" | "cost-low" | "cost-high" | "popular";
type FilterOption = "all" | "solo" | "couple" | "family" | "friends";

export default function ExpenseCardGrid({
  expenseCards,
  isSignedIn,
  onBookmarkToggle,
}: ExpenseCardGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const filteredAndSortedCards = useMemo(() => {
    let filtered = expenseCards;

    // Filter by travel type
    if (filterBy !== "all") {
      filtered = filtered.filter(
        (card) => card.travelType.toLowerCase() === filterBy
      );
    }

    // Sort cards
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "cost-low":
          return a.dailyCost - b.dailyCost;
        case "cost-high":
          return b.dailyCost - a.dailyCost;
        case "popular":
          return b.bookmarkCount - a.bookmarkCount;
        default:
          return 0;
      }
    });

    return sorted;
  }, [expenseCards, sortBy, filterBy]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="solo">Solo</option>
              <option value="couple">Couple</option>
              <option value="family">Family</option>
              <option value="friends">Friends</option>
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center space-x-2">
            {sortBy.includes("cost") ? (
              <SortAsc className="h-5 w-5 text-gray-500" />
            ) : (
              <SortDesc className="h-5 w-5 text-gray-500" />
            )}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="cost-low">Cost: Low to High</option>
              <option value="cost-high">Cost: High to Low</option>
              <option value="popular">Most Bookmarked</option>
            </select>
          </div>
        </div>

        {/* Results summary */}
        <div className="text-sm text-gray-600 mt-4">
          {filteredAndSortedCards.length} expense card
          {filteredAndSortedCards.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Cards Grid */}
      {filteredAndSortedCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCards.map((card) => (
            <ExpenseCardComponent
              key={card.id}
              expenseCard={card}
              isSignedIn={isSignedIn}
              onBookmarkToggle={onBookmarkToggle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            No expense cards found
          </div>
          <div className="text-gray-400">
            Try adjusting your filter criteria
          </div>
        </div>
      )}
    </div>
  );
}
