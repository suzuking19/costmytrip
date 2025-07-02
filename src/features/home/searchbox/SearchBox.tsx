"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CityCard } from "../card/types";
import SearchTag from "./SearchTag";

interface SearchBoxProps {
  cities: CityCard[];
  onCitySelect?: (cityId: string) => void;
  onSearchTagsChange?: (tags: SearchTag[]) => void;
}

interface SearchSuggestion {
  id: string;
  name: string;
  country: string;
  type: "city" | "country";
  matchText: string;
}

interface SearchTag {
  id: string;
  text: string;
  type: "city" | "country";
}

export default function SearchBox({
  cities,
  onCitySelect,
  onSearchTagsChange,
}: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchTags, setSearchTags] = useState<SearchTag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on search term
  const generateSuggestions = (term: string): SearchSuggestion[] => {
    if (!term.trim()) return [];

    const normalizedTerm = term.toLowerCase().trim();
    const citySuggestions: SearchSuggestion[] = [];
    const countrySuggestions: SearchSuggestion[] = [];

    cities.forEach((city) => {
      const cityName = city.name.toLowerCase();
      const countryName = city.country.toLowerCase();

      // Check city name match (priority)
      if (cityName.includes(normalizedTerm)) {
        citySuggestions.push({
          id: city.id,
          name: city.name,
          country: city.country,
          type: "city",
          matchText: `${city.name}, ${city.country}`,
        });
      }
      // Check country name match (lower priority)
      else if (countryName.includes(normalizedTerm)) {
        countrySuggestions.push({
          id: city.id,
          name: city.name,
          country: city.country,
          type: "country",
          matchText: `${city.name}, ${city.country}`,
        });
      }
    });

    // Remove duplicates and sort by priority (cities first, then countries)
    const allSuggestions = [...citySuggestions, ...countrySuggestions];
    const uniqueSuggestions = allSuggestions.filter(
      (suggestion, index, self) =>
        index === self.findIndex((s) => s.id === suggestion.id)
    );

    return uniqueSuggestions.slice(0, 5); // Limit to 5 suggestions
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const newSuggestions = generateSuggestions(value);
    setSuggestions(newSuggestions);
    setIsOpen(newSuggestions.length > 0);
    setSelectedIndex(-1);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    addSearchTag(suggestion);
    setSearchTerm("");
    setIsOpen(false);
    setSelectedIndex(-1);
    onCitySelect?.(suggestion.id);
  };

  // Add search tag
  const addSearchTag = (suggestion: SearchSuggestion) => {
    const newTag: SearchTag = {
      id: suggestion.id,
      text: suggestion.matchText,
      type: suggestion.type,
    };

    // Check if tag already exists
    const tagExists = searchTags.some(
      (tag) => tag.id === newTag.id && tag.type === newTag.type
    );

    if (!tagExists) {
      const updatedTags = [...searchTags, newTag];
      setSearchTags(updatedTags);
      onSearchTagsChange?.(updatedTags);
    }
  };

  // Remove search tag
  const removeSearchTag = (tagToRemove: SearchTag) => {
    const updatedTags = searchTags.filter(
      (tag) => !(tag.id === tagToRemove.id && tag.type === tagToRemove.type)
    );
    setSearchTags(updatedTags);
    onSearchTagsChange?.(updatedTags);
  };

  // Handle direct search (when user types and presses Enter without selecting suggestion)
  const handleDirectSearch = () => {
    const trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      // Try to find exact match first
      const exactMatch = suggestions.find(
        (suggestion) =>
          suggestion.name.toLowerCase() === trimmedTerm.toLowerCase() ||
          suggestion.country.toLowerCase() === trimmedTerm.toLowerCase()
      );

      if (exactMatch) {
        addSearchTag(exactMatch);
      } else {
        // Create a generic search tag
        const genericTag: SearchTag = {
          id: `search-${Date.now()}`,
          text: trimmedTerm,
          type: "city", // Default type for manual search
        };
        const updatedTags = [...searchTags, genericTag];
        setSearchTags(updatedTags);
        onSearchTagsChange?.(updatedTags);
      }

      setSearchTerm("");
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isOpen && selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleDirectSearch();
      }
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        searchRef.current?.blur();
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search by city name or country (e.g., Tokyo, Japan)"
          className="w-full px-4 py-3 text-lg bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            onClick={handleDirectSearch}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Tags */}
      <AnimatePresence>
        {searchTags.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {searchTags.map((tag, index) => (
              <motion.div
                key={`${tag.id}-${tag.type}-${index}`}
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <SearchTag
                  text={tag.text}
                  onRemove={() => removeSearchTag(tag)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={`${suggestion.id}-${suggestion.type}`}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                  index === selectedIndex
                    ? "bg-indigo-50 text-indigo-700"
                    : "hover:bg-gray-50"
                } ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === suggestions.length - 1 ? "rounded-b-lg" : ""
                }`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: index * 0.02 }}
                whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">
                      {suggestion.name}
                    </span>
                    <span className="text-gray-500 ml-2">
                      {suggestion.country}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 capitalize">
                    {suggestion.type === "city" ? "City" : "Country"}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
