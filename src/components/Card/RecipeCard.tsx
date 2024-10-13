/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { FiArrowUp, FiArrowDown, FiMessageSquare } from "react-icons/fi"; // Added FiMessageSquare for comments
import Link from "next/link";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";

import CommentModal from "../modals/CommentModal";

import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import {
  useAddRatingOrUpvoteMutation,
  useDeleteRatingOrUpvoteMutation,
  useGetAllRatingAndUpvoteQuery,
} from "@/src/redux/features/ratingAndUpvote/ratingAndUpvoteApi";
import {
  useGetAllRecipeQuery,
  useUpdateRecipeMutation,
} from "@/src/redux/features/recipe/recipeApi";
import { useGetAllCommentQuery } from "@/src/redux/features/comment/commentApi";

// Define TypeScript interfaces for better type safety
interface Recipe {
  _id: string;
  title: string;
  image: string;
  publishUserId: string;
  publishUserImage: string;
  publishUserName: string;
  instructions: string[];
  cookingTime: number;
  rating: number;
  isPremium: boolean;
  upvote: number;
  downvote: number;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  // State Variables
  const [recipeId, setRecipeId] = useState<string>("");
  const [userRating, setUserRating] = useState<number>(0);

  // Redux Selectors and API Hooks
  const user = useAppSelector(selectCurrentUser);
  const loggedUserEmail = user?.user?.email;

  const { data: getAllRecipe } = useGetAllRecipeQuery(undefined);
  const [updateRecipe] = useUpdateRecipeMutation();
  const [addUpvote] = useAddRatingOrUpvoteMutation();
  const [deleteUpvote] = useDeleteRatingOrUpvoteMutation();
  const { data: getAllRatingAndUpvote } =
    useGetAllRatingAndUpvoteQuery(undefined);
  const { data: allComment } = useGetAllCommentQuery(undefined);

  // Filter Comments Related to the Current Recipe
  const filterComment = allComment?.data?.filter(
    (comment: any) => comment?.postId === recipeId
  );

  //* Filter Upvotes, Downvotes, and Ratings by Current User
  const filterUpvoteAnimation = getAllRatingAndUpvote?.data?.filter(
    (item: any) =>
      item?.type === "upvote" && item?.userEmail === loggedUserEmail
  );

  const filterDownvoteAnimation = getAllRatingAndUpvote?.data?.filter(
    (item: any) =>
      item?.type === "downvote" && item?.userEmail === loggedUserEmail
  );

  const filtreRatingAnimation = getAllRatingAndUpvote?.data?.filter(
    (item: any) =>
      item?.type === "rating" && item?.userEmail === loggedUserEmail
  );

  //* Handler Functions

  // Handle Upvote Functionality
  const handleUpvote = useCallback(
    async (id: string) => {
      try {
        // Find the current recipe
        const findRecipe = getAllRecipe?.data?.find(
          (r: Recipe) => r._id === id
        );

        if (!findRecipe) return;

        // Check if the user has already upvoted
        const existingUpvote = getAllRatingAndUpvote?.data?.find(
          (item: any) =>
            item?.postId === id &&
            item?.type === "upvote" &&
            item?.userEmail === loggedUserEmail
        );

        if (existingUpvote) {
          // If already upvoted, remove the upvote
          const updatedUpvoteCount = findRecipe.upvote - 1;

          await updateRecipe({
            id,
            data: { upvote: updatedUpvoteCount },
          }).unwrap();

          await deleteUpvote(existingUpvote._id).unwrap();
        } else {
          // Add a new upvote
          const updatedUpvoteCount = findRecipe.upvote + 1;

          await updateRecipe({
            id,
            data: { upvote: updatedUpvoteCount },
          }).unwrap();

          await addUpvote({
            postId: id,
            userEmail: loggedUserEmail,
            type: "upvote",
          }).unwrap();

          // If the user had previously downvoted, remove the downvote
          const existingDownvote = getAllRatingAndUpvote?.data?.find(
            (item: any) =>
              item?.postId === id &&
              item?.type === "downvote" &&
              item?.userEmail === loggedUserEmail
          );

          if (existingDownvote) {
            const updatedDownvoteCount = findRecipe.downvote - 1;

            await updateRecipe({
              id,
              data: { downvote: updatedDownvoteCount },
            }).unwrap();

            await deleteUpvote(existingDownvote._id).unwrap();
          }
        }
      } catch (error) {
        console.error("Error handling upvote:", error);
      }
    },
    [
      addUpvote,
      deleteUpvote,
      getAllRatingAndUpvote?.data,
      getAllRecipe?.data,
      loggedUserEmail,
      updateRecipe,
    ]
  );

  // Handle Downvote Functionality
  const handleDownVote = useCallback(
    async (id: string) => {
      try {
        // Find the current recipe
        const findRecipe = getAllRecipe?.data?.find(
          (r: Recipe) => r._id === id
        );

        if (!findRecipe) return;

        // Check if the user has already downvoted
        const existingDownvote = getAllRatingAndUpvote?.data?.find(
          (item: any) =>
            item?.postId === id &&
            item?.type === "downvote" &&
            item?.userEmail === loggedUserEmail
        );

        if (existingDownvote) {
          // If already downvoted, remove the downvote
          const updatedDownvoteCount = findRecipe.downvote - 1;

          await updateRecipe({
            id,
            data: { downvote: updatedDownvoteCount },
          }).unwrap();

          await deleteUpvote(existingDownvote._id).unwrap();
        } else {
          // Add a new downvote
          const updatedDownvoteCount = findRecipe.downvote + 1;

          await updateRecipe({
            id,
            data: { downvote: updatedDownvoteCount },
          }).unwrap();

          await addUpvote({
            postId: id,
            userEmail: loggedUserEmail,
            type: "downvote",
          }).unwrap();

          // If the user had previously upvoted, remove the upvote
          const existingUpvote = getAllRatingAndUpvote?.data?.find(
            (item: any) =>
              item?.postId === id &&
              item?.type === "upvote" &&
              item?.userEmail === loggedUserEmail
          );

          if (existingUpvote) {
            const updatedUpvoteCount = findRecipe.upvote - 1;

            await updateRecipe({
              id,
              data: { upvote: updatedUpvoteCount },
            }).unwrap();

            await deleteUpvote(existingUpvote._id).unwrap();
          }
        }
      } catch (error) {
        console.error("Error handling downvote:", error);
      }
    },
    [
      addUpvote,
      deleteUpvote,
      getAllRatingAndUpvote?.data,
      getAllRecipe?.data,
      loggedUserEmail,
      updateRecipe,
    ]
  );

  // Handle Rating Submission
  const handleRating = useCallback(
    async (ratingValue: number, id: string) => {
      try {
        setUserRating(ratingValue); // Update local state for hover effect

        // Filter existing ratings for the recipe
        const existingRating = getAllRatingAndUpvote?.data?.find(
          (item: any) =>
            item?.postId === id &&
            item?.type === "rating" &&
            item?.userEmail === loggedUserEmail
        );

        if (existingRating) {
          // If user has already rated, you might want to update the rating
          // For simplicity, let's assume users can rate only once without updating
          alert("You have already rated this recipe.");

          return;
        }

        // Calculate new average rating
        const currentRecipe = getAllRecipe?.data?.find(
          (r: Recipe) => r._id === id
        );

        if (!currentRecipe) return;

        const totalRatings =
          getAllRatingAndUpvote?.data?.filter(
            (item: any) => item?.postId === id && item?.type === "rating"
          ).length || 0;

        const newTotalRatings =
          currentRecipe.rating * totalRatings + ratingValue;
        const newAverageRating = newTotalRatings / (totalRatings + 1);
        const roundedAverageRating = parseFloat(newAverageRating.toFixed(1));

        // Update the recipe's average rating
        await updateRecipe({
          id,
          data: { rating: roundedAverageRating },
        }).unwrap();

        // Add the new rating
        await addUpvote({
          postId: id,
          userEmail: loggedUserEmail,
          type: "rating",
          rating: ratingValue,
        }).unwrap();

        // Optionally, you can refetch the data or update the cache
      } catch (error) {
        console.error("Error handling rating:", error);
      }
    },
    [
      addUpvote,
      getAllRatingAndUpvote?.data,
      getAllRecipe?.data,
      loggedUserEmail,
      updateRecipe,
    ]
  );

  const router = useRouter();

  const handleViewDetails = () => {
    // Navigate to the single recipe page with the recipe ID
    router.push(`/recipe/${recipe._id}`); // Adjust the path if needed
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Recipe Image */}
      <div className="relative">
        <img
          alt={recipe.title}
          className="w-full h-56 object-cover"
          loading="lazy"
          src={
            recipe.image || "https://i.ibb.co/6R6kXhQ/No-Image-Available.jpg"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40" />
      </div>

      {/* Recipe Details */}
      <div className="px-6 py-4">
        <div className="flex justify-start gap-3 items-center pb-3">
          <Link href={`/profile/${recipe.publishUserId}`}>
            <Avatar
              className="w-12 h-12 rounded-full border-2 border-teal-500 shadow-md"
              src={recipe.publishUserImage}
            />
          </Link>
          <Link
            className="text-sm font-semibold text-teal-500 dark:text-teal-300 hover:text-teal-300 dark:hover:text-teal-100 transition-colors duration-300"
            href={`/profile/${recipe.publishUserId}`}
          >
            {recipe.publishUserName}
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {recipe.title}
        </h2>
        <Link
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
          href={`/recipe/${recipe._id}`}
        >
          Instructions:{" "}
          {recipe.instructions?.slice(0, 50) || "See more details"}...
        </Link>
        <h3 className="mt-2 text-md font-medium text-gray-700 dark:text-gray-300">
          Cooking Time: {recipe.cookingTime} minutes
        </h3>

        {/* Rating and Premium Status */}
        <div className="flex items-center justify-between mt-4">
          {/* Rating */}
          <div className="flex items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300 mr-3">
              Avg. Rating:
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {recipe.rating}
            </span>
          </div>
          <span
            className={`text-sm font-semibold tracking-wide ${
              recipe.isPremium
                ? "text-indigo-500 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-1 rounded-full"
                : "text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full"
            }`}
          >
            {recipe.isPremium ? "Premium" : "Free"}
          </span>
        </div>

        {/* Rating Section */}
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-700 dark:text-gray-300 mr-4">
            My Rate:
          </span>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer transition-colors duration-200 ${
                  index <
                  (filtreRatingAnimation?.find(
                    (item: any) => item.postId === recipe._id
                  )?.rating || userRating)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                size={20}
                onClick={() => handleRating(index + 1, recipe._id)}
                onMouseEnter={() => setUserRating(index + 1)}
                onMouseLeave={() => setUserRating(0)}
              />
            ))}
        </div>

        <button
          className="view-details-button mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
          onClick={handleViewDetails}
        >
          View Details
        </button>

        {/* Upvote / Downvote Buttons */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <button
              aria-label="Upvote Recipe"
              className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                filterUpvoteAnimation?.some(
                  (item: any) => item.postId === recipe._id
                )
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => handleUpvote(recipe._id)}
            >
              <FiArrowUp className="mr-1" /> {recipe.upvote}
            </button>

            <button
              aria-label="Downvote Recipe"
              className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                filterDownvoteAnimation?.some(
                  (item: any) => item.postId === recipe._id
                )
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => handleDownVote(recipe._id)}
            >
              <FiArrowDown className="mr-1" /> {recipe.downvote}
            </button>
          </div>

          {/* Comment Modal */}
          {/* <button
            aria-label="Open Comments"
            className="flex items-center text-teal-500 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-100 transition-colors duration-300 focus:outline-none"
            onClick={() => setRecipeId(recipe._id)}
          >
            <FiMessageSquare className="mr-1" size={20} />
            <span className="text-sm">{filterComment?.length || 0}</span>
          </button> */}
          <button
            aria-label="Open Comments"
            className="flex items-center text-teal-500 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-100 transition-colors duration-300 focus:outline-none"
            onClick={() =>
              setRecipeId((prevId) => (prevId === recipe._id ? "" : recipe._id))
            } // Toggle functionality
          >
            <FiMessageSquare className="mr-1" size={20} />
            <span className="text-sm">{filterComment?.length || 0}</span>
          </button>
        </div>
      </div>

      {/* Comment Modal Component */}
      {recipeId && (
        <CommentModal
          comments={filterComment}
          id={recipeId}
          onClose={() => setRecipeId("")}
        />
      )}
    </div>
  );
};

export default React.memo(RecipeCard);
