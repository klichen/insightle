import * as React from "react";
import BusinessCard from "@/components/ui/BusinessCard"; // Updated import

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
  {
    imageSrc: "/favicon.ico",
    title: "Cityscape Cafe",
    subtext: "The best coffee in town with a skyline view.",
  },
  {
    imageSrc: "/favicon.ico",
    title: "FitLife Gym",
    subtext: "Your fitness journey starts here.",
  },
  {
    imageSrc: "/favicon.ico",
    title: "Artisan Bakery Co.",
    subtext: "Handcrafted baked goods made with love.",
  },
];

export default function UserHomePage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white text-black py-4 px-6 fixed w-full top-0 left-0 z-10 shadow-md">
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
      <div className="flex justify-center items-center min-h-screen pt-20">
        {/* Container for BusinessCard components */}
        <div className="w-full max-w-5xl mx-auto flex flex-col space-y-6">
          {/* Map through the list of businesses */}
          {businesses.map((business, index) => (
            <BusinessCard
              key={index}
              imageSrc={business.imageSrc}
              title={business.title}
              subtext={business.subtext}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
