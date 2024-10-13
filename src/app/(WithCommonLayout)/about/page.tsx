import React from "react";

import Team from "@/src/components/UI/Team";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 dark:from-blue-400 dark:to-teal-500 mb-4">
            About SuJu Flavor Hub
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Welcome to SuJu Flavor Hub, where foodies come together to celebrate
            the art of cooking, explore exotic flavors, and share culinary
            experiences in an interactive and inspiring environment.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl font-bold text-orange-500 dark:text-teal-400 mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            SuJu Flavor Hub aims to be the ultimate platform for food lovers
            everywhere. We envision a vibrant space where cooks of all levels
            share their recipes, discover global flavors, and connect with a
            passionate community eager to try new ingredients and culinary
            techniques.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl font-bold text-orange-500 dark:text-teal-400 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is to inspire and educate food enthusiasts by providing
            a platform where they can access delicious recipes, share their own
            culinary creations, and engage with a supportive community. We
            strive to elevate cooking from a chore to an enjoyable and exciting
            adventure.
          </p>
        </div>

        {/* Why Us Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl font-bold text-orange-500 dark:text-teal-400 mb-6">
            Why SuJu Flavor Hub?
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <li>
              Unique, curated recipes from top chefs and home cooks alike.
            </li>
            <li>
              Personalized recommendations based on your taste preferences.
            </li>
            <li>Interactive cooking tools like timers and meal planners.</li>
            <li>
              Engage with a community of food lovers who share your passion.
            </li>
            <li>
              Exclusive access to seasonal and premium recipes for members.
            </li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-10 rounded-3xl shadow-2xl mb-16">
          <h2 className="text-3xl font-bold text-orange-500 dark:text-teal-400 mb-6">
            Meet the SuJu Team
          </h2>
          <Team />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
