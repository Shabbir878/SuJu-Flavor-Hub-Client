"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs"; // Assuming you're using dayjs for date formatting
import { FaCalendarAlt } from "react-icons/fa"; // Example icon for the membership duration

import CreateOrderModal from "@/src/components/modals/CreateOrderModal";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";

const Membership = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const { data: userData } = useGetMyDataQuery(undefined);
  const user = userData?.data[0];

  // Membership options with detailed information
  const memberships = [
    {
      price: 300,
      totalMonth: 1,
      label: "1 Month",
      benefits: ["Access to basic features", "Monthly newsletters"],
      popular: false,
    },
    {
      price: 1000,
      totalMonth: 6,
      label: "6 Months",
      benefits: [
        "Access to all features",
        "Monthly newsletters",
        "Exclusive content",
      ],
      popular: true,
    },
    {
      price: 1500,
      totalMonth: 12,
      label: "1 Year",
      benefits: [
        "Access to all features",
        "Monthly newsletters",
        "Exclusive content",
        "Priority support",
      ],
      popular: false,
    },
  ];

  // for hydration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Formatting the membership expiration date
  const formattedPremiumLastDate = user?.premiumLastDate
    ? dayjs(user.premiumLastDate).format("DD-MM-YYYY")
    : "N/A";

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white p-8">
      <h1 className="text-4xl font-bold text-teal-400 mb-10">Memberships</h1>

      {/* User's membership and payment information */}
      <div className="mb-8 text-center text-teal-400 dark:text-white">
        <h1 className="text-xl">
          Your total payment:{" "}
          <span className="text-teal-400">{user?.payment ?? "0"} Tk</span>
        </h1>
        <h1 className="text-xl">
          Your membership valid until:{" "}
          <span className="text-teal-400">{formattedPremiumLastDate}</span>
        </h1>
      </div>

      {/* Membership Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {memberships.map((membership, index) => (
          <div
            key={index}
            className={`membership-card flex flex-col justify-between bg-gray-800 p-6 rounded-xl shadow-lg transition-shadow duration-300 transform hover:shadow-xl hover:scale-105 h-full`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {membership.label} Membership
              </h2>
              <p className="text-teal-400 text-xl font-medium mb-1">
                <FaCalendarAlt className="inline-block mr-1" /> Duration:{" "}
                {membership.totalMonth} Month
                {membership.totalMonth > 1 ? "s" : ""}
              </p>
              <p className="text-teal-400 text-xl font-medium mb-4">
                Price: {membership.price} Tk
              </p>
              <h3 className="text-white font-semibold mb-2">Benefits:</h3>
              <ul className="list-disc list-inside text-teal-400 mb-4">
                {membership.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
            <button
              className="mt-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-full font-semibold tracking-wider shadow-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105"
              onClick={() => {
                setIsModalOpen(true); // Open modal on button click
              }}
            >
              {user?.premiumLastDate ? "Renew Now" : "Buy Now"}
            </button>
          </div>
        ))}
      </div>

      {/* Create Order Modal */}
      <CreateOrderModal
        isOpen={isModalOpen} // Add prop for modal state
        totalMonth={
          memberships.find((m) => m.label === "6 Months")?.totalMonth ?? 0
        } // Fallback to 0
        totalPrice={memberships.find((m) => m.label === "6 Months")?.price ?? 0} // Fallback to 0
        onClose={() => setIsModalOpen(false)} // Add close handler
      />
    </div>
  );
};

export default Membership;
