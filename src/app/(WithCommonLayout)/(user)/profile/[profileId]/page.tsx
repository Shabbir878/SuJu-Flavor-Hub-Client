"use client";
import { Button } from "@nextui-org/button";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import RecipeCard from "@/src/components/Card/RecipeCard";
import CreateRecipeModal from "@/src/components/modals/CreateRecipeModal";
import UpdateProfileModal from "@/src/components/modals/UpdateProfileModal";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import {
  useAddFollowerMutation,
  useDeleteFollowerMutation,
  useGetAllFollowerQuery,
} from "@/src/redux/features/follower/followerApi";
import { useGetAllRecipeQuery } from "@/src/redux/features/recipe/recipeApi";
import {
  useGetMyDataQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/hooks";
import RecipeSkeleton from "@/src/components/Card/RecipeSkeleton";

const ProfilePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const id = params?.profileId;
  const myData = useAppSelector(selectCurrentUser);
  const myUserId = myData?.user?._id;
  const myUserEmail = myData?.user?.email;
  const { data: singleUser } = useGetSingleUserQuery(id);
  const user = singleUser?.data;
  const [updateUser, {}] = useUpdateUserMutation();
  const { data: allFollower } = useGetAllFollowerQuery(undefined);
  const [addFollower, {}] = useAddFollowerMutation();
  const [deleteFollow, {}] = useDeleteFollowerMutation();
  const { data: currentUserData } = useGetMyDataQuery(undefined);
  const currentUserFollowing = currentUserData?.data[0]?.following;
  const { data: allRecipe } = useGetAllRecipeQuery(undefined);

  const filterRecipe = allRecipe?.data?.filter(
    (recipe: any) => recipe?.publishUserId == id
  );

  const findFollowe = allFollower?.data?.find(
    (item: any) => item?.userId == id && item?.followerEmail == myUserEmail
  );

  const handleUpdateFollow = async () => {
    const followerData = { userId: id, followerEmail: myUserEmail };
    const res = await addFollower(followerData);

    if (res?.data) {
      const updatedFollowerCount = (await (user?.follower || 0)) + 1;

      await updateUser({ id, data: { follower: updatedFollowerCount } });

      const updatedFollowingCount = (await (currentUserFollowing || 0)) + 1;

      await updateUser({
        id: myUserId,
        data: { following: updatedFollowingCount },
      });
    }
  };

  const handleUpdateUnfollow = async () => {
    const res = await deleteFollow(findFollowe?._id);

    if (res?.data) {
      const updatedFollowerCount = (await (user?.follower || 0)) - 1;

      await updateUser({ id, data: { follower: updatedFollowerCount || 0 } });

      const updatedFollowingCount = (await (currentUserFollowing || 0)) - 1;

      await updateUser({
        id: myUserId,
        data: { following: updatedFollowingCount },
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white  transition-colors duration-300">
      {/* Profile Banner */}
      <div className="relative bg-gradient-to-r from-teal-500 to-purple-600 h-60 shadow-md">
        <div className="absolute bottom-3 left-4 flex items-center space-x-4 w-full">
          {/* Profile Picture */}
          <img
            alt={`${user?.name}'s profile`}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            height={500}
            src={
              user?.profileImg || "https://i.ibb.co.com/z89cgQr/profile.webp"
            }
            width={500}
          />

          <div className="text-white w-full">
            <h2 className="text-3xl font-bold">
              {user?.name}{" "}
              <span className={`text-lg text-yellow-300`}>
                {user?.premium ? "Premium" : "Free"}
              </span>
            </h2>
            <h3 className="text-md mt-1">{user?.bio}</h3>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm">
                {user?.follower} followers | {user?.following} following
              </p>
              <div className="flex pr-6 md:pr-20 gap-2">
                {id != myUserId ? (
                  <div>
                    {findFollowe ? (
                      <Button
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                        onClick={handleUpdateUnfollow}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                        onClick={handleUpdateFollow}
                      >
                        Follow
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="md:flex gap-2 text-center">
                    <div className="pb-1">
                      <UpdateProfileModal />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto md:px-4 mt-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
          {/* Main Content (Posts) */}
          <div className="w-full md:w-10/12">
            <div className="bg-gradient-to-r from-pink-300 to-orange-300 dark:from-gray-800 dark:to-gray-900 mx-2 px-6 py-4 rounded-lg shadow-xl flex justify-between items-center">
              <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                What&apos;s on your mind?
              </h3>
              <button>
                <CreateRecipeModal />
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 md:p-4 rounded-lg shadow-md mt-4">
              <h3 className="font-semibold text-lg mb-2 text-center pt-2 text-gray-800 dark:text-gray-200">
                Recent Posts
              </h3>

              {/* Example of Posts */}
              <div className="bg-default-50 p-4 rounded-lg shadow-lg mt-6">
                <div className="grid grid-cols-1 gap-4">
                  {filterRecipe?.length ? (
                    filterRecipe?.map((recipe: any) => (
                      <RecipeCard key={recipe?._id} recipe={recipe} />
                    ))
                  ) : (
                    <div className="text-center text-sm">
                      {[...Array(4)].map((index) => (
                        <RecipeSkeleton key={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
