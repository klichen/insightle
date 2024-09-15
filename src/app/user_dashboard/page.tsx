"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import BusinessCard from "@/components/ui/BusinessCard";

// List of businesses
const businesses = [
  {
    imageSrc: "/favicon.ico",
    title: "Tech Innovators Inc.",
    subtext: "Leading the way in tech solutions.",
  },
  {
    imageSrc: "/favicon.ico",
    title: "Green Thumb Landscaping",
    subtext: "Transforming outdoor spaces with care.",
  },
  // More items here if needed
];

const ITEMS_PER_PAGE = 4; // Number of items to load per scroll

export default function UserHomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  const [sortOption, setSortOption] = useState<string>("");
  const [visibleBusinesses, setVisibleBusinesses] = useState(businesses.slice(0, ITEMS_PER_PAGE)); // Initial visible items
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // Track if page is scrolled

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = businesses.filter(
      (business) =>
        business.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.subtext.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBusinesses(filtered);
    setVisibleBusinesses(filtered.slice(0, ITEMS_PER_PAGE)); // Reset visible businesses after search
    setHasMore(filtered.length > ITEMS_PER_PAGE); // Reset hasMore flag
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    // Add sorting logic here based on the selected option if needed
  };

  // Infinite scrolling logic
  const loadMoreItems = () => {
    if (loading) return; // Prevent multiple triggers of the loading function

    setLoading(true); // Start loading

    const nextItems = filteredBusinesses.slice(
      visibleBusinesses.length,
      visibleBusinesses.length + ITEMS_PER_PAGE
    );

    if (nextItems.length > 0) {
      setVisibleBusinesses((prevVisible) => [...prevVisible, ...nextItems]);
    }

    if (nextItems.length < ITEMS_PER_PAGE || visibleBusinesses.length + nextItems.length === filteredBusinesses.length) {
      setHasMore(false); // No more items to load
    }

    setLoading(false); // Finish loading
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 && hasMore) {
      loadMoreItems();
    }

    // Check if the page is scrolled down
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Listen for scroll events and check if there are more items when the page loads
  useEffect(() => {
    setHasMore(filteredBusinesses.length > ITEMS_PER_PAGE);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filteredBusinesses, visibleBusinesses, hasMore]);

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`bg-white text-black py-4 px-6 fixed w-full top-0 left-0 z-10 transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="text-2xl font-bold">My Website</div>
          <ul className="flex space-x-6">
            <li><a href="#home" className="hover:text-gray-500">Home</a></li>
            <li><a href="#about" className="hover:text-gray-500">About</a></li>
            <li><a href="#contact" className="hover:text-gray-500">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex justify-center items-center min-h-screen pt-20 pb-5">
        {/* Container for Search Bar and BusinessCards */}
        <div className="w-full max-w-5xl mx-auto flex flex-col space-y-6">

          {/* Header */}
          <div className="text-2xl font-bold text-left pt-20">
            Welcome to Our Business Directory
          </div>

          {/* Search Bar and Sort Box */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative w-2/3">
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="w-full p-2 border border-gray-300 rounded-md pr-10 h-10"
              />
              <img
                src="/favicon.ico"
                alt="Search"
                onClick={handleSearch}
                className="absolute right-3 top-2 cursor-pointer w-6 h-6"
              />
            </div>
            {/* Sort By Dropdown */}
            <div className="w-1/8">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full p-2 border border-gray-300 rounded-md h-10"
              >
                <option value="">Sort by</option>
                <option value="title">Title</option>
                <option value="subtext">Subtext</option>
              </select>
            </div>
          </div>

          {/* Business Cards */}
          <div className="w-full flex flex-col space-y-6 min-h-[500px]">
            {visibleBusinesses.length > 0 ? (
              visibleBusinesses.map((business, index) => (
                <BusinessCard
                  key={index}
                  imageSrc={business.imageSrc}
                  title={business.title}
                  subtext={business.subtext}
                />
              ))
            ) : (
              <div>No businesses found</div>
            )}
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center">
              <p>Loading more...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
