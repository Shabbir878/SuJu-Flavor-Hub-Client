"use client";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXSelect from "../form/FXSelect";
import { verifyToken } from "../../utils/verifyToken";
import Loading from "../UI/loading";
import FXTextarea from "../form/FXTextArea";

import FXModal from "./FXModal";

import { useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAddRecipeMutation } from "@/src/redux/features/recipe/recipeApi";
import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";

const CreateRecipeModal = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: currentUser, refetch } = useGetMyDataQuery(undefined);
  const userIsPremium = currentUser?.data[0]?.premium;
  const publishUserImage = currentUser?.data[0]?.profileImg;
  const publishUserName = currentUser?.data[0]?.name;
  let verifyUser: any;

  if (user?.token) {
    verifyUser = verifyToken(user?.token as string);
  }

  const publishUser = verifyUser?.email;
  const publishUserId = verifyUser?.userId;
  const [addRecipe, { isLoading }] = useAddRecipeMutation();

  // Correctly typed onSubmit function
  const onSubmit = async (data: any, { reset }: { reset: () => void }) => {
    data.isPremium = data?.isPremium === "true";

    const finalData = {
      ...data,
      publishUser,
      publishUserId,
      publishUserName,
      publishUserImage,
    };

    try {
      const res = await addRecipe(finalData).unwrap();

      console.log(res); // Log the response for debugging
      console.log("Recipe added successfully, showing toast message.");
      if (res?.data) {
        toast.success(res?.message);
      }

      // Reset the form after successful submission
      reset();
      // Refetch user data after successful submission
      refetch();
    } catch (error) {
      console.error(error); // Log any errors for debugging
      toast.error("Failed to add recipe"); // Show error message
    }
  };

  const selectOption = [
    { key: false, label: "Not Premium" },
    { key: true, label: "Premium" },
  ];

  return (
    <FXModal
      buttonClassName="bg-blue-500 text-white px-4 py-1 rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300"
      buttonText="Post"
      title="Create Recipe"
    >
      {isLoading && <Loading />}
      <FXForm onSubmit={onSubmit}>
        <div className="py-1">
          <FXInput required label="Title" name="title" />
        </div>
        <div className="py-1">
          <FXInput required label="Image URL" name="image" />
        </div>
        <div className="py-1">
          <FXInput
            required
            label="Cooking Time (minute)"
            name="cookingTime"
            type="number"
          />
        </div>

        {verifyUser && (verifyUser?.role === "admin" || userIsPremium) && (
          <div className="py-1">
            <FXSelect
              label="Premium or Not"
              name="isPremium"
              options={selectOption}
            />
          </div>
        )}
        <div className="py-1">
          <FXTextarea required label="Instructions" name="instructions" />
        </div>
        <div className="py-2">
          <Button className="w-full" type="submit">
            POST
          </Button>
        </div>
      </FXForm>
    </FXModal>
  );
};

export default CreateRecipeModal;
