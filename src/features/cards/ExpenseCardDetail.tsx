"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExpenseCardDetail } from "./types";

interface ExpenseCardDetailProps {
  expenseCard: ExpenseCardDetail;
}

const colors = {
  darkBlue: "#124261",
  teal: "#227461",
  orange: "#E48928",
  lightBeige: "#F3F1EF",
};

export default function ExpenseCardDetailComponent({
  expenseCard,
}: ExpenseCardDetailProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const getDurationInDays = () => {
    const start = new Date(expenseCard.startDate);
    const end = new Date(expenseCard.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const getDayTotal = (dayIndex: number) => {
    return expenseCard.dailyExpenses[dayIndex].items.reduce((sum, item) => {
      return sum + parseFloat(item.amount);
    }, 0);
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      "Food & Dining": "#E48928",
      Accommodation: "#124261",
      Transportation: "#227461",
      "Activities & Entertainment": "#8B5A3C",
      Shopping: "#D67B29",
      Others: "#6B7280",
    };
    return categoryColors[category] || "#6B7280";
  };

  return (
    <div
      className="min-h-screen py-8"
      style={{ backgroundColor: colors.lightBeige }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link
                href={`/${expenseCard.cityId}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {expenseCard.city}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium">Expense Details</li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {expenseCard.title}
              </h1>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold">
                    {expenseCard.city}, {expenseCard.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">{getDurationInDays()} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Travel Type</p>
                  <p className="font-semibold">{expenseCard.travelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Travelers</p>
                  <p className="font-semibold">
                    {expenseCard.numberOfTravelers}{" "}
                    {expenseCard.numberOfTravelers === 1 ? "person" : "people"}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {expenseCard.description}
              </p>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>By @{expenseCard.username}</span>
                <span>•</span>
                <span>{formatDate(expenseCard.createdAt)}</span>
                <span>•</span>
                <span>{expenseCard.bookmarkCount} bookmarks</span>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="bg-gray-50 rounded-lg p-6 min-w-[280px]">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Cost Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Cost:</span>
                    <span
                      className="font-bold text-xl"
                      style={{ color: colors.darkBlue }}
                    >
                      {formatCurrency(expenseCard.totalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Per Person/Day:</span>
                    <span className="font-semibold">
                      {formatCurrency(expenseCard.costPerPersonPerDay)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>
                      {formatDate(expenseCard.startDate)} -{" "}
                      {formatDate(expenseCard.endDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Expenses Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Daily Expenses
          </h2>

          {/* Day Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {expenseCard.dailyExpenses.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDayIndex(index)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeDayIndex === index
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  style={{
                    borderColor:
                      activeDayIndex === index ? colors.orange : "transparent",
                    color: activeDayIndex === index ? colors.orange : undefined,
                  }}
                >
                  Day {index + 1}
                  <br />
                  <span className="text-xs text-gray-400">
                    {formatDate(day.date)}
                  </span>
                  <br />
                  <span className="text-xs font-bold">
                    {formatCurrency(getDayTotal(index))}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Active Day Content */}
          {expenseCard.dailyExpenses[activeDayIndex] && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatDate(expenseCard.dailyExpenses[activeDayIndex].date)} -
                  Day {activeDayIndex + 1}
                </h3>
                <span
                  className="text-lg font-bold"
                  style={{ color: colors.darkBlue }}
                >
                  Total: {formatCurrency(getDayTotal(activeDayIndex))}
                </span>
              </div>

              <div className="space-y-4">
                {expenseCard.dailyExpenses[activeDayIndex].items.map(
                  (item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: getCategoryColor(
                                  item.category
                                ),
                              }}
                            ></span>
                            <span className="font-medium text-gray-900">
                              {item.category}
                            </span>
                            <span
                              className="text-lg font-bold"
                              style={{ color: colors.darkBlue }}
                            >
                              {formatCurrency(parseFloat(item.amount))}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-gray-600 mb-2">
                              {item.description}
                            </p>
                          )}
                          {item.googleMapsLinks.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.googleMapsLinks.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: colors.lightBeige,
                                    color: colors.teal,
                                  }}
                                >
                                  📍 View on Map
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href={`/${expenseCard.cityId}`}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to {expenseCard.city}
          </Link>
          <button
            className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.orange }}
          >
            {expenseCard.isBookmarked ? "Remove Bookmark" : "Bookmark"}
          </button>
        </div>
      </div>
    </div>
  );
}
