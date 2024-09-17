'use client';

import { AvatarIcon } from '@radix-ui/react-icons'
import * as React from "react";
import { useState } from "react";
import BusinessCard from "@/components/ui/BusinessCard";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from '../../../convex/_generated/dataModel';

export interface User {
    _id: Id<'users'>;
    _creationTime: number;
    image?: string;
    name?: string;
    email?: string;
    isOwner?: boolean;
    isAnonymous?: boolean;
  }

export default function UserHomePage({ currentUser }: { currentUser: User }) {
  const businesses = useQuery(api.business.getBusinesses);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  if (!businesses) {
    return (
      <div>No business currently</div>
    );
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = businesses.filter(
      (business) =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const filteredBusinesses = handleSearch();

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`bg-white text-black py-4 px-6 fixed w-full top-0 left-0 z-10 transition-shadow duration-300`}
      >
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <div className="text-2xl font-bold">Insightle.</div>
          <div className="ml-auto mr--10">
            <AvatarIcon className="w-5 h-5"/>
          </div>
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
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((business, index) => (
                <BusinessCard
                  key={index}
                  currentUser={currentUser}
                  imageSrc={"/favicon.ico"}
                  title={business.name}
                  subtext={business.description}
                  bizId={business._id}
                />
              ))
            ) : (
              <div>No businesses found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
