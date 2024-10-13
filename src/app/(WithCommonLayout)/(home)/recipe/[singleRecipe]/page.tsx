// "use client";

// import { useParams } from "next/navigation";

// import RecipeDetailCard from "@/src/components/Card/RecipeDetailCard";
// import { useGetSingleRecipeQuery } from "@/src/redux/features/recipe/recipeApi";

// const SingleRecipe = () => {
//   const { singleRecipe: recipeId } = useParams();
//   const { data: singleRecipe } = useGetSingleRecipeQuery(recipeId);

//   console.log(recipeId);
//   const recipeData = singleRecipe?.data[0];

//   return (
//     <div className="h-[90vh]">
//       <div className="flex h-full justify-center items-center">
//         {recipeData ? (
//           <RecipeDetailCard recipe={recipeData} />
//         ) : (
//           <p>Loading...</p> // Handle loading or empty state
//         )}
//       </div>
//     </div>
//   );
// };

// export default SingleRecipe;

"use client"; // Ensure this component is a client component

import { useParams } from "next/navigation";

import RecipeDetailCard from "@/src/components/Card/RecipeDetailCard";
import { useGetSingleRecipeQuery } from "@/src/redux/features/recipe/recipeApi";

const SingleRecipe = () => {
  const { singleRecipe: recipeId } = useParams(); // Extract recipe ID from the URL

  const {
    data: singleRecipe,
    error,
    isLoading,
  } = useGetSingleRecipeQuery(recipeId);

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error fetching recipe details: {error.message}</p>;

  // Get the recipe data
  const recipeData = singleRecipe?.data[0];

  // Handle no recipe found case
  if (!recipeData) return <p>No recipe found.</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
      <RecipeDetailCard recipe={recipeData} />
    </div>
  );
};

export default SingleRecipe;
