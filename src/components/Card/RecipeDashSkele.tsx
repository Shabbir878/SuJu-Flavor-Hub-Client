import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const RecipeDashSkele = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Recipe Image */}
      <Skeleton>
        <h1 className="h-40 w-full object-cover rounded-t-lg bg-gray-300 relative">
          {/* Visually Hidden Text for Accessibility */}
          <span className="sr-only">Loading Recipe Image...</span>
        </h1>
      </Skeleton>

      {/* Recipe Details */}
      <div className="px-4 py-3">
        {/* Recipe Title */}
        <Skeleton>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {/* Visually Hidden Text for Accessibility */}
            <span className="sr-only">Loading Recipe Title...</span>
          </h2>
        </Skeleton>

        {/* Recipe Info */}
        <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 mt-2">
          <div className="flex items-center">
            <Skeleton>
              {/* Star Icon with Visually Hidden Rating */}
              <span className="text-blue-500">&#9733;</span>
              <p className="ml-2 text-sm text-gray-600">
                <span className="sr-only">Loading Rating...</span>
              </p>
            </Skeleton>
          </div>
        </div>

        {/* Recipe Publisher */}
        <Skeleton>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {/* Visually Hidden Text for Accessibility */}
            <span className="sr-only">Loading Publisher Information...</span>
          </p>
        </Skeleton>

        {/* Action Buttons */}
        <div className="flex justify-end p-3 gap-2">
          <Skeleton>
            <button
              aria-label="Publish Recipe"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition duration-300"
            >
              {/* Visually Hidden Text for Accessibility */}
              <span className="sr-only">Loading Publish Button...</span>
            </button>
          </Skeleton>

          <Skeleton>
            <button
              aria-label="Delete Recipe"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full text-sm transition duration-300"
            >
              {/* Visually Hidden Text for Accessibility */}
              <span className="sr-only">Loading Delete Button...</span>
            </button>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};

export default RecipeDashSkele;
