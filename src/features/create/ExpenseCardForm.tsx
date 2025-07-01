"use client";

import React, { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  colors,
  travelTypes,
  positionTypes,
  expenseCategories,
} from "./constants";
import {
  submitExpenseCard,
  searchCities,
  type CitySearchResult,
} from "./queries";
import type {
  TripDetails,
  DailyExpense,
  SelectedCity,
  ExpenseCardData,
} from "./types";

export default function ExpenseCardForm() {
  const router = useRouter();

  // State for expense card form - Step 1 details
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    travelTitle: "",
    startDate: "",
    endDate: "",
    travelType: "",
    participants: "",
    position: "",
    overallDescription: "",
  });

  // State for location search - Database-based city search
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<SelectedCity | null>(null);
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);

  // State to control dropdown visibility on focus
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Ref for blur timeout
  const cityBlurTimeout = useRef<NodeJS.Timeout | null>(null);

  // State for multi-step form
  const [currentStep, setCurrentStep] = useState(1);

  // State for daily expenses - Step 2 details
  const [dailyExpenses, setDailyExpenses] = useState<DailyExpense[]>([]);

  // State for temporary input for new URL text per expense item
  const [newUrlText, setNewUrlText] = useState<Record<string, string>>({});

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for active day tab in Step 2
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // State for controlling the visibility of modals
  const [showTransportationWarningModal, setShowTransportationWarningModal] =
    useState(false);
  const [showBackWarningModal, setShowBackWarningModal] = useState(false);

  // State for status selection
  const [selectedStatus, setSelectedStatus] = useState<"editing" | "published">(
    "editing"
  );

  // Filtered cities based on search term (only city name)
  const filteredCities = useMemo(() => {
    if (!showCityDropdown && !citySearchTerm) return [];
    return searchResults.slice(0, 10);
  }, [searchResults, showCityDropdown, citySearchTerm]);

  // Handle input changes for trip details form (Step 1)
  const handleTripDetailsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTripDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle city search input change
  const handleCitySearchChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCitySearchTerm(value);
    setSelectedCity(null);
    setShowCityDropdown(true);

    if (value.trim()) {
      try {
        const results = await searchCities(value);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching cities:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Handle city input focus
  const handleCityFocus = async () => {
    setShowCityDropdown(true);
    if (cityBlurTimeout.current) {
      clearTimeout(cityBlurTimeout.current);
    }

    // Load initial city suggestions when focusing for the first time
    if (searchResults.length === 0 && !citySearchTerm) {
      try {
        const results = await searchCities(""); // Get some initial cities
        setSearchResults(results);
      } catch (error) {
        console.error("Error loading initial cities:", error);
      }
    }
  };

  // Handle city input blur
  const handleCityBlur = () => {
    cityBlurTimeout.current = setTimeout(() => {
      setShowCityDropdown(false);
    }, 150);
  };

  // Select a city from the dropdown
  const handleSelectCity = (city: CitySearchResult) => {
    const selectedCityData: SelectedCity = {
      id: city.id,
      name: city.name,
      country: city.country,
    };
    setSelectedCity(selectedCityData);
    setCitySearchTerm(`${city.name} - ${city.country}`);
    setShowCityDropdown(false);
  };

  // Calculate days between start and end date
  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime()) ||
      startDate > endDate
    ) {
      return 0;
    }
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  // Generate initial daily expenses based on duration
  const generateDailyExpenses = () => {
    const days = calculateDays(tripDetails.startDate, tripDetails.endDate);
    const expenses: DailyExpense[] = [];
    const currentDate = new Date(tripDetails.startDate);

    for (let i = 0; i < days; i++) {
      expenses.push({
        date: currentDate.toISOString().split("T")[0],
        items: [
          { category: "Food & Dining", amount: "", googleMapsLinks: [] },
          { category: "Accommodation", amount: "", googleMapsLinks: [] },
          { category: "Transportation", amount: "", googleMapsLinks: [] },
        ],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setDailyExpenses(expenses);
    setActiveDayIndex(0);
  };

  // Handle adding a new expense item
  const handleAddExpenseItem = (dayIndex: number) => {
    setDailyExpenses((prevExpenses) => {
      const newExpenses = [...prevExpenses];
      newExpenses[dayIndex].items.push({
        category: "",
        amount: "",
        googleMapsLinks: [],
      });
      return newExpenses;
    });
  };

  // Handle removing an expense item
  const handleRemoveExpenseItem = (dayIndex: number, itemIndex: number) => {
    setDailyExpenses((prevExpenses) => {
      const newExpenses = [...prevExpenses];
      newExpenses[dayIndex].items.splice(itemIndex, 1);
      return newExpenses;
    });
  };

  // Handle changes within an individual expense item
  const handleExpenseItemChange = (
    dayIndex: number,
    itemIndex: number,
    field: string,
    value: string
  ) => {
    setDailyExpenses((prevExpenses) => {
      const newExpenses = [...prevExpenses];
      newExpenses[dayIndex].items[itemIndex] = {
        ...newExpenses[dayIndex].items[itemIndex],
        [field]: value,
      };
      return newExpenses;
    });
  };

  // Handle input change for new URL text
  const handleNewUrlTextChange = (
    dayIndex: number,
    itemIndex: number,
    value: string
  ) => {
    setNewUrlText((prev) => ({
      ...prev,
      [`${dayIndex}-${itemIndex}`]: value,
    }));
  };

  // Handle adding a new URL
  const handleAddUrl = (dayIndex: number, itemIndex: number) => {
    const url = newUrlText[`${dayIndex}-${itemIndex}`]?.trim();
    if (url) {
      setDailyExpenses((prevExpenses) => {
        const newExpenses = [...prevExpenses];
        const currentLinks =
          newExpenses[dayIndex].items[itemIndex].googleMapsLinks || [];
        if (!currentLinks.includes(url)) {
          newExpenses[dayIndex].items[itemIndex].googleMapsLinks = [
            ...currentLinks,
            url,
          ];
        }
        return newExpenses;
      });
      setNewUrlText((prev) => ({
        ...prev,
        [`${dayIndex}-${itemIndex}`]: "",
      }));
    }
  };

  // Handle removing a URL
  const handleRemoveUrl = (
    dayIndex: number,
    itemIndex: number,
    urlIndex: number
  ) => {
    setDailyExpenses((prevExpenses) => {
      const newExpenses = [...prevExpenses];
      newExpenses[dayIndex].items[itemIndex].googleMapsLinks.splice(
        urlIndex,
        1
      );
      return newExpenses;
    });
  };

  // Handle "Next" button click (Step 1 to Step 2)
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Check for missing required fields
    const missingFields: string[] = [];
    if (!tripDetails.travelTitle) missingFields.push("Travel Title");
    if (!selectedCity) missingFields.push("Destination City");
    if (!tripDetails.startDate) missingFields.push("Start Date");
    if (!tripDetails.endDate) missingFields.push("End Date");
    if (!tripDetails.travelType) missingFields.push("Travel Type");
    if (!tripDetails.participants) missingFields.push("Number of Participants");
    if (!tripDetails.position) missingFields.push("Your Position");

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    const daysCount = calculateDays(tripDetails.startDate, tripDetails.endDate);
    if (daysCount <= 0) {
      setErrorMessage("End date must be on or after the start date.");
      return;
    }

    if (parseInt(tripDetails.participants) < 1) {
      setErrorMessage("Number of participants must be at least 1.");
      return;
    }

    generateDailyExpenses();
    setCurrentStep(2);
  };

  // Handle "Back" button click
  const handleBack = () => {
    setShowBackWarningModal(true);
  };

  // Confirm going back
  const confirmGoBack = () => {
    setCurrentStep(1);
    setErrorMessage("");
    setShowBackWarningModal(false);
  };

  // Cancel going back
  const cancelGoBack = () => {
    setShowBackWarningModal(false);
  };

  // Basic Google Maps URL validation
  const isValidGoogleMapsUrl = (url: string) => {
    // If URL is empty or just whitespace, consider it valid (optional field)
    if (!url || url.trim() === "") return true;

    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      const pathname = parsedUrl.pathname;

      const isGoogleMapsDomain =
        (hostname.includes("google.com") && pathname.includes("/maps")) ||
        hostname.includes("goo.gl") ||
        hostname.includes("google.co.jp") ||
        hostname.includes("maps.app.goo.gl");

      const isSecureProtocol =
        parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";

      return isGoogleMapsDomain && isSecureProtocol;
    } catch {
      return false;
    }
  };

  // Handle final form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      // Validate daily expenses
      const isValidDailyExpenses = dailyExpenses.every((dayExpense) => {
        return dayExpense.items.every((item) => {
          if (item.category && item.amount === "") {
            return false;
          }
          if (item.googleMapsLinks) {
            // Only validate non-empty links
            const nonEmptyLinks = item.googleMapsLinks.filter(
              (link) => link && link.trim() !== ""
            );
            if (nonEmptyLinks.some((link) => !isValidGoogleMapsUrl(link))) {
              return false;
            }
          }
          return true;
        });
      });

      if (!isValidDailyExpenses) {
        setErrorMessage(
          "Please enter amounts for selected categories and ensure Google Maps links are valid."
        );
        return;
      }

      const fullExpenseData: ExpenseCardData = {
        country: selectedCity ? selectedCity.country : "",
        city: selectedCity ? selectedCity.name : "",
        ...tripDetails,
        dailyExpenses: dailyExpenses,
        status: selectedStatus,
      };

      const result = await submitExpenseCard(fullExpenseData);

      if (result.success) {
        // Navigate to the appropriate page based on status
        if (selectedStatus === "published") {
          router.push("/mypage");
        } else {
          router.push("/mypage/editing");
        }
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit expense card."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate totals
  const totalActiveDayExpense = useMemo(() => {
    if (dailyExpenses.length === 0 || activeDayIndex === null) return 0;
    return dailyExpenses[activeDayIndex].items.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
  }, [dailyExpenses, activeDayIndex]);

  const totalTripExpense = useMemo(() => {
    if (dailyExpenses.length === 0) return 0;
    return dailyExpenses.reduce((totalSum, dayExpense) => {
      return (
        totalSum +
        dayExpense.items.reduce((daySum, item) => {
          return daySum + (parseFloat(item.amount) || 0);
        }, 0)
      );
    }, 0);
  }, [dailyExpenses]);

  const perPersonPerDayExpense = useMemo(() => {
    const totalDays = calculateDays(tripDetails.startDate, tripDetails.endDate);
    const participants = parseInt(tripDetails.participants);
    if (totalDays === 0 || participants === 0 || isNaN(participants)) return 0;
    return totalTripExpense / (totalDays * participants);
  }, [
    totalTripExpense,
    tripDetails.startDate,
    tripDetails.endDate,
    tripDetails.participants,
  ]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 pt-20"
      style={{ backgroundColor: colors.lightBeige }}
    >
      <div
        className="w-full max-w-3xl mx-auto p-8 rounded-xl shadow-xl space-y-8"
        style={{ backgroundColor: "#FFFFFF", color: colors.darkBlue }}
      >
        <h2
          className="text-3xl font-extrabold text-center"
          style={{ color: colors.darkBlue }}
        >
          Post Expense Card
        </h2>

        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Trip Details */}
        {currentStep === 1 && (
          <div
            className="space-y-6 p-6 rounded-lg shadow-md border"
            style={{
              backgroundColor: colors.lightBeige,
              borderColor: colors.teal,
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: colors.darkBlue }}
            >
              Destination and Duration
            </h3>

            {/* Travel Title */}
            <div>
              <label
                htmlFor="travelTitle"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkBlue }}
              >
                Travel Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="travelTitle"
                name="travelTitle"
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                style={{
                  borderColor: colors.teal,
                  backgroundColor: "#FFFFFF",
                  color: colors.darkBlue,
                  outlineColor: colors.orange,
                }}
                value={tripDetails.travelTitle}
                onChange={handleTripDetailsChange}
                placeholder="e.g. Tokyo Cherry Blossom Trip"
              />
            </div>

            {/* City Selection */}
            <div className="relative">
              <label
                htmlFor="city-search"
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkBlue }}
              >
                Search City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city-search"
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                style={{
                  borderColor: colors.teal,
                  backgroundColor: "#FFFFFF",
                  color: colors.darkBlue,
                  outlineColor: colors.orange,
                }}
                placeholder="e.g. Tokyo"
                value={citySearchTerm}
                onChange={handleCitySearchChange}
                onFocus={handleCityFocus}
                onBlur={handleCityBlur}
              />
              {showCityDropdown && filteredCities.length > 0 && (
                <ul
                  className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto"
                  style={{ borderColor: colors.teal }}
                >
                  {filteredCities.map((city) => (
                    <li
                      key={`${city.id}-${city.name}`}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      style={{ color: colors.darkBlue }}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelectCity(city)}
                    >
                      {city.name} - {city.country}
                    </li>
                  ))}
                </ul>
              )}
              {selectedCity && (
                <p className="mt-2 text-sm" style={{ color: colors.teal }}>
                  Selected city:{" "}
                  <span className="font-semibold">
                    {selectedCity.name} - {selectedCity.country}
                  </span>
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0 mt-4">
              <div className="flex-1">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium"
                  style={{ color: colors.darkBlue }}
                >
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  style={{
                    borderColor: colors.teal,
                    backgroundColor: "#FFFFFF",
                    color: colors.darkBlue,
                    outlineColor: colors.orange,
                  }}
                  value={tripDetails.startDate}
                  onChange={handleTripDetailsChange}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium"
                  style={{ color: colors.darkBlue }}
                >
                  End Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                  style={{
                    borderColor: colors.teal,
                    backgroundColor: "#FFFFFF",
                    color: colors.darkBlue,
                    outlineColor: colors.orange,
                  }}
                  value={tripDetails.endDate}
                  onChange={handleTripDetailsChange}
                />
              </div>
            </div>

            {/* Travel Type */}
            <div>
              <label
                htmlFor="travelType"
                className="block text-sm font-medium"
                style={{ color: colors.darkBlue }}
              >
                Travel Type <span className="text-red-500">*</span>
              </label>
              <select
                name="travelType"
                id="travelType"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                style={{
                  borderColor: colors.teal,
                  backgroundColor: "#FFFFFF",
                  color: colors.darkBlue,
                  outlineColor: colors.orange,
                }}
                value={tripDetails.travelType}
                onChange={handleTripDetailsChange}
              >
                <option value="">Select travel type</option>
                {travelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of Participants */}
            <div>
              <label
                htmlFor="participants"
                className="block text-sm font-medium"
                style={{ color: colors.darkBlue }}
              >
                Number of Travelers <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="participants"
                id="participants"
                required
                min="1"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                style={{
                  borderColor: colors.teal,
                  backgroundColor: "#FFFFFF",
                  color: colors.darkBlue,
                  outlineColor: colors.orange,
                }}
                value={tripDetails.participants}
                onChange={handleTripDetailsChange}
                placeholder="e.g. 2"
              />
            </div>

            {/* Position */}
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium"
                style={{ color: colors.darkBlue }}
              >
                Your Occupation <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                id="position"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                style={{
                  borderColor: colors.teal,
                  backgroundColor: "#FFFFFF",
                  color: colors.darkBlue,
                  outlineColor: colors.orange,
                }}
                value={tripDetails.position}
                onChange={handleTripDetailsChange}
              >
                <option value="">Select occupation</option>
                {positionTypes.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Next Button */}
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: colors.orange,
                  color: colors.darkBlue,
                  borderColor: colors.orange,
                  boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Daily Expenses */}
        {currentStep === 2 && (
          <div
            className="space-y-6 p-6 rounded-lg shadow-md border"
            style={{
              backgroundColor: colors.lightBeige,
              borderColor: colors.teal,
            }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: colors.darkBlue }}
            >
              Record Daily Expenses
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please enter expenses for each day from {tripDetails.startDate} to{" "}
              {tripDetails.endDate}.
            </p>

            {/* Overall Description */}
            <div>
              <label
                htmlFor="overall-description"
                className="block text-sm font-medium"
                style={{ color: colors.darkBlue }}
              >
                Overall Description (Optional)
              </label>
              <textarea
                id="overall-description"
                rows={2}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 resize-y"
                style={{
                  borderColor: colors.teal,
                  backgroundColor: colors.lightBeige,
                  color: colors.darkBlue,
                  outlineColor: colors.orange,
                }}
                value={tripDetails.overallDescription}
                onChange={handleTripDetailsChange}
                name="overallDescription"
                placeholder="e.g. Overall expenses description for the trip"
              ></textarea>
            </div>

            {/* Transportation Warning */}
            <div
              className="flex items-center p-3 rounded-md shadow-sm"
              style={{
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                color: "#c2410c",
              }}
            >
              <strong className="mr-2">Important Note:</strong> Do not include
              round-trip transportation costs to the city.
              <button
                type="button"
                onClick={() => setShowTransportationWarningModal(true)}
                className="ml-2 w-6 h-6 flex items-center justify-center rounded-full font-bold text-lg"
                style={{
                  backgroundColor: colors.orange,
                  color: colors.lightBeige,
                }}
                aria-label="Transportation cost details"
              >
                ?
              </button>
            </div>

            {/* Day Tabs Navigation */}
            <div
              className="flex flex-wrap border-b mb-4"
              style={{ borderColor: colors.teal }}
            >
              {dailyExpenses.map((dayExpense, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveDayIndex(index)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeDayIndex === index
                      ? "font-bold"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{
                    color:
                      activeDayIndex === index
                        ? colors.orange
                        : colors.darkBlue,
                    borderColor:
                      activeDayIndex === index ? colors.orange : "transparent",
                    backgroundColor:
                      activeDayIndex === index ? "#FFFFFF" : "transparent",
                    borderTopLeftRadius: "0.375rem",
                    borderTopRightRadius: "0.375rem",
                  }}
                >
                  Day {index + 1}
                </button>
              ))}
            </div>

            {/* Content for the active day */}
            {dailyExpenses.length > 0 && (
              <div
                className="p-4 border rounded-md"
                style={{ borderColor: colors.teal, backgroundColor: "#FFFFFF" }}
              >
                <h4
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.darkBlue }}
                >
                  Day {activeDayIndex + 1}: {dailyExpenses[activeDayIndex].date}
                </h4>

                {/* Individual Expense Items */}
                <div className="space-y-3 mt-4">
                  {dailyExpenses[activeDayIndex].items.map(
                    (item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="border border-dashed border-gray-400 p-3 rounded-md relative"
                        style={{ borderColor: colors.teal }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveExpenseItem(activeDayIndex, itemIndex)
                          }
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl leading-none"
                          aria-label="Remove expense item"
                        >
                          ×
                        </button>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                          <div className="flex-1">
                            <label
                              htmlFor={`item-category-${activeDayIndex}-${itemIndex}`}
                              className="block text-sm font-medium"
                              style={{ color: colors.darkBlue }}
                            >
                              Category <span className="text-red-500">*</span>
                            </label>
                            <select
                              id={`item-category-${activeDayIndex}-${itemIndex}`}
                              required
                              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                              style={{
                                borderColor: colors.teal,
                                backgroundColor: colors.lightBeige,
                                color: colors.darkBlue,
                                outlineColor: colors.orange,
                              }}
                              value={item.category}
                              onChange={(e) =>
                                handleExpenseItemChange(
                                  activeDayIndex,
                                  itemIndex,
                                  "category",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select category</option>
                              {expenseCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor={`item-amount-${activeDayIndex}-${itemIndex}`}
                              className="block text-sm font-medium"
                              style={{ color: colors.darkBlue }}
                            >
                              Amount (USD){" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              id={`item-amount-${activeDayIndex}-${itemIndex}`}
                              min="0"
                              step="0.01"
                              required={!!item.category}
                              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                              style={{
                                borderColor: colors.teal,
                                backgroundColor: colors.lightBeige,
                                color: colors.darkBlue,
                                outlineColor: colors.orange,
                              }}
                              value={item.amount}
                              onChange={(e) =>
                                handleExpenseItemChange(
                                  activeDayIndex,
                                  itemIndex,
                                  "amount",
                                  e.target.value
                                )
                              }
                              placeholder="e.g. 25.50"
                            />
                          </div>
                        </div>

                        {/* Google Maps Link Input(s) */}
                        <div className="mt-3">
                          <label
                            htmlFor={`item-google-maps-link-input-${activeDayIndex}-${itemIndex}`}
                            className="block text-sm font-medium"
                            style={{ color: colors.darkBlue }}
                          >
                            Google Maps Link (Optional)
                          </label>
                          <div className="flex space-x-2 mb-2">
                            <input
                              type="text"
                              id={`item-google-maps-link-input-${activeDayIndex}-${itemIndex}`}
                              className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                              style={{
                                borderColor: colors.teal,
                                backgroundColor: colors.lightBeige,
                                color: colors.darkBlue,
                                outlineColor: colors.orange,
                              }}
                              value={
                                newUrlText[`${activeDayIndex}-${itemIndex}`] ||
                                ""
                              }
                              onChange={(e) =>
                                handleNewUrlTextChange(
                                  activeDayIndex,
                                  itemIndex,
                                  e.target.value
                                )
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddUrl(activeDayIndex, itemIndex);
                                }
                              }}
                              placeholder="e.g. https://maps.app.goo.gl/..."
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleAddUrl(activeDayIndex, itemIndex)
                              }
                              className="px-4 py-2 border rounded-md text-sm font-medium"
                              style={{
                                backgroundColor: colors.teal,
                                color: colors.lightBeige,
                                borderColor: colors.teal,
                              }}
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.googleMapsLinks &&
                              item.googleMapsLinks.map((link, urlIndex) => (
                                <span
                                  key={urlIndex}
                                  className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                    isValidGoogleMapsUrl(link)
                                      ? "bg-blue-200 text-blue-800"
                                      : "bg-red-200 text-red-800"
                                  }`}
                                >
                                  {isValidGoogleMapsUrl(link) ? (
                                    <a
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                      style={{ color: colors.darkBlue }}
                                    >
                                      Link {urlIndex + 1}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="ml-1 inline-block"
                                      >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line
                                          x1="10"
                                          y1="14"
                                          x2="21"
                                          y2="3"
                                        ></line>
                                      </svg>
                                    </a>
                                  ) : (
                                    <>Invalid URL</>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveUrl(
                                        activeDayIndex,
                                        itemIndex,
                                        urlIndex
                                      )
                                    }
                                    className="ml-2 text-red-800 hover:text-red-900 focus:outline-none"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                          </div>
                          <p
                            className="text-xs text-gray-500 mt-1"
                            style={{ color: colors.darkBlue }}
                          >
                            <span
                              className="font-semibold"
                              style={{ color: colors.teal }}
                            >
                              Tip:
                            </span>{" "}
                            Search for a location on Google Maps, then copy and
                            paste the link from the &quot;Share&quot; button.
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddExpenseItem(activeDayIndex)}
                  className="w-full px-4 py-2 border border-dashed rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4"
                  style={{
                    borderColor: colors.teal,
                    color: colors.teal,
                    backgroundColor: colors.lightBeige,
                    transition: "background-color 0.3s ease",
                  }}
                >
                  + Add Expense Item
                </button>
              </div>
            )}

            {/* Status Selection */}
            <div
              className="p-4 border rounded-md"
              style={{ borderColor: colors.teal, backgroundColor: "#FFFFFF" }}
            >
              <h4
                className="text-lg font-semibold mb-3"
                style={{ color: colors.darkBlue }}
              >
                Post Status
              </h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="editing"
                    checked={selectedStatus === "editing"}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value as "editing" | "published"
                      )
                    }
                    className="mr-2"
                  />
                  <span style={{ color: colors.darkBlue }}>
                    Save as draft (can be edited and published later)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={selectedStatus === "published"}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value as "editing" | "published"
                      )
                    }
                    className="mr-2"
                  />
                  <span style={{ color: colors.darkBlue }}>
                    Publish immediately (can be changed back to draft later)
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: colors.teal,
                  color: colors.lightBeige,
                  borderColor: colors.teal,
                  boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
              >
                Back
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm hover:scale-105 transition-transform duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: colors.orange,
                  color: colors.darkBlue,
                  borderColor: colors.orange,
                  boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
              >
                {isSubmitting
                  ? "Submitting..."
                  : selectedStatus === "published"
                  ? "Publish"
                  : "Save Draft"}
              </button>
            </div>
          </div>
        )}

        {/* Transportation Warning Modal */}
        {showTransportationWarningModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div
              className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative"
              style={{
                backgroundColor: colors.lightBeige,
                color: colors.darkBlue,
              }}
            >
              <button
                type="button"
                onClick={() => setShowTransportationWarningModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.darkBlue }}
              >
                Important Note: About Transportation Costs
              </h3>
              <p className="mb-4">
                Please do not include round-trip transportation costs to the
                city in your daily expenses.
              </p>
              <p
                className="mb-4 font-semibold"
                style={{ color: colors.darkBlue }}
              >
                Example:
              </p>
              <p className="mb-4">
                For a trip from Korea to Tokyo, do not include round-trip
                airfare between Incheon International Airport and Haneda
                Airport, and transportation costs from Haneda Airport to central
                Tokyo. These are considered separate from daily expenses within
                the city.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowTransportationWarningModal(false)}
                  className="px-6 py-2 rounded-md font-medium"
                  style={{
                    backgroundColor: colors.teal,
                    color: colors.lightBeige,
                  }}
                >
                  Understood
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Button Warning Modal */}
        {showBackWarningModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div
              className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full relative text-center"
              style={{
                backgroundColor: colors.lightBeige,
                color: colors.darkBlue,
              }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: colors.darkBlue }}
              >
                Discard Changes?
              </h3>
              <p className="mb-6">
                Going back will discard unsaved changes to daily expenses. Do
                you want to continue?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={cancelGoBack}
                  className="px-6 py-2 rounded-md font-medium"
                  style={{
                    backgroundColor: colors.teal,
                    color: colors.lightBeige,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmGoBack}
                  className="px-6 py-2 rounded-md font-medium"
                  style={{
                    backgroundColor: colors.orange,
                    color: colors.darkBlue,
                  }}
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expense Summary Section (Fixed at bottom-right) */}
      {currentStep === 2 && (
        <div
          className="fixed bottom-20 right-4 p-3 rounded-lg shadow-xl w-fit"
          style={{ backgroundColor: "#FFFFFF", color: colors.darkBlue }}
        >
          <h4 className="text-lg font-bold mb-2">Expense Summary</h4>
          <p className="text-sm">
            Current day total:{" "}
            <span className="font-semibold">
              ${totalActiveDayExpense.toFixed(2)}
            </span>
          </p>
          <p className="text-sm">
            Total trip cost:{" "}
            <span className="font-semibold">
              ${totalTripExpense.toFixed(2)}
            </span>
          </p>
          <p className="text-sm">
            Per person per day:{" "}
            <span className="font-semibold">
              ${perPersonPerDayExpense.toFixed(2)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
