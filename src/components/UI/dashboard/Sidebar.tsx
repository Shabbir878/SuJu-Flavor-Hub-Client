"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import React from "react";
import {
  MdAdminPanelSettings,
  MdSpaceDashboard,
  MdSubscriptions,
} from "react-icons/md";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { verifyToken } from "@/src/utils/verifyToken";

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <span>Loading...</span>
  </div>
);

const Sidebar = () => {
  const searchParams = useSearchParams();
  const queryValue = searchParams?.get("key");

  const user = useAppSelector(selectCurrentUser);
  let currentUser;

  if (user?.token) {
    currentUser = verifyToken(user?.token);
  }
  const currentUserRole = (currentUser as any)?.role;

  return (
    <div className="min-h-screen fixed h-full flex bg-gradient-to-b from-indigo-800 to-blue-800 shadow-lg">
      {/* Dashboard Sidebar */}
      <div className="md:w-64 w-20 bg-gray-900 pt-6 shadow-xl">
        <ul className="menu flex flex-col items-center md:items-start p-4">
          {/* Logo */}
          <Link href="/dashboard?key=dashboard">
            <div className="flex justify-center mb-8 hover:scale-110 transition-all duration-300">
              <img
                alt="Logo"
                className="md:w-2/6 w-12 rounded-full border border-yellow-500 shadow-lg"
                src="https://purepng.com/public/uploads/large/purepng.com-female-chefcheftrained-professional-cookfood-preparationkitchenchefsexperiencedwomenfemale-1421526720163zk3zo.png"
              />
            </div>
          </Link>

          <hr className="border-yellow-500 w-full mb-4 opacity-40" />

          {/* Navigation Items */}
          {[
            {
              href: "/dashboard?key=dashboard",
              label: "Dashboard",
              icon: <MdSpaceDashboard />,
            },
            {
              href: "/dashboard/recipes?key=recipes",
              label: "Recipes",
              icon: <IoFastFood />,
            },
            {
              href: "/dashboard/membership?key=membership",
              label: "Membership",
              icon: <MdSubscriptions />,
            },
            ...(currentUserRole === "admin"
              ? [
                  {
                    href: "/dashboard/create-admin?key=create-admin",
                    label: "Create Admin",
                    icon: <MdAdminPanelSettings />,
                  },
                  {
                    href: "/dashboard/users?key=users",
                    label: "Users",
                    icon: <FaUsers />,
                  },
                ]
              : []),
          ].map(({ href, label, icon }) => (
            <li key={label} className="w-full mb-2">
              <Link href={href}>
                <div
                  className={`block px-4 py-3 text-white text-center md:text-left rounded-lg transition-all duration-300 
                    hover:bg-yellow-600 hover:shadow-xl ${queryValue === label.toLowerCase() ? "bg-yellow-600 shadow-xl font-bold" : ""}`}
                >
                  <span className="text-2xl md:hidden">{icon}</span>
                  <span className="hidden md:inline-block ml-2">{icon}</span>
                  <span className="hidden md:inline-block ml-2">{label}</span>
                </div>
              </Link>
            </li>
          ))}

          <hr className="border-yellow-500 w-full mb-4 opacity-40" />

          {/* Home */}
          <li className="w-full mb-2">
            <Link href="/">
              <div className="block px-4 py-3 text-white text-center md:text-left rounded-lg transition-all duration-300 hover:bg-yellow-600 hover:shadow-xl">
                <span className="material-icons md:hidden">
                  <FaHome />
                </span>
                <span className="hidden md:inline-block ml-2">
                  {<FaHome />}
                </span>
                <span className="hidden md:inline-block ml-2">Home</span>
              </div>
            </Link>
          </li>
        </ul>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-75 blur-lg" />
      </div>
    </div>
  );
};

// Wrap Sidebar with Suspense
const SidebarWithSuspense = () => (
  <Suspense fallback={<Loading />}>
    <Sidebar />
  </Suspense>
);

export default SidebarWithSuspense;
