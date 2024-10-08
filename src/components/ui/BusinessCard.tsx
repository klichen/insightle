"use client";

import * as React from "react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { User } from "@/app/(dashboard)/UserDashboard";
import { Id } from "../../../convex/_generated/dataModel";

// Define the props interface
interface BusinessCardProps {
  imageSrc: string;
  title: string;
  subtext: string;
  currentUser: User;
  bizId: Id<'businesses'>;
}

// Reusable BusinessCard component
const BusinessCard: React.FC<BusinessCardProps> = ({
  // imageSrc,
  title,
  subtext,
  currentUser,
  bizId
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const sendFeedback = useMutation(api.feedback.sendFeedback)

  const handleSubmitFeedback = async () => {
    // console.log(bizId)
    await sendFeedback({ author: currentUser.name as string, authorId: currentUser._id, content: feedback, businessId: bizId });
    setIsModalOpen(false);
  }

  // Handle click event to open modal
  const handleClick = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Clickable BusinessCard */}
      <div
        className="w-full h-24 bg-white border border-gray-300 p-4 flex items-center cursor-pointer transition-all duration-300 hover:bg-gray-100 rounded-lg"
        onClick={handleClick}
      >

        {/* Title and Subtext on the Right */}
        <div>
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-sm text-gray-600">{subtext}</p>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded shadow-md max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-xl font-bold mb-4">Feedback Form</h2>
            <form>
              {/* Feedback Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Add a comment
                </label>
                <textarea
                  className="border rounded w-full py-2 px-3 text-gray-700 text-sm placeholder:text-xs"
                  placeholder=""
                  rows={4} // Set number of rows for the textarea
                  onChangeCapture={e => setFeedback(e.currentTarget.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSubmitFeedback}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessCard;
