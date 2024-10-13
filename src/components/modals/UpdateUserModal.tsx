"use client";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import FXSelect from "../form/FXSelect";
import Loading from "../UI/loading";

import FXModal from "./FXModal";

import { useUpdateUserMutation } from "@/src/redux/features/user/userApi";

const UpdateUserModal = ({ user }: { user: any }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data!.role == "") {
      data.role = user?.role;
    }
    const finalData = { id: user?._id, data };
    const res = await updateUser(finalData).unwrap();

    if (res?.data) {
      toast.success(res?.messaage);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        buttonClassName="px-3 py-1 bg-green-500 hover:bg-green-700 rounded-full text-sm transition duration-300"
        buttonText="Edit"
        title="Update Your Profile"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              required
              defaultValue={user?.name}
              label="User Name"
              name="name"
            />
          </div>
          <div className="py-1">
            <FXInput
              required
              defaultValue={user?.bio}
              label="User Bio"
              name="bio"
            />
          </div>
          <div className="py-1">
            <FXInput
              required
              defaultValue={user?.profileImg}
              label="User Profile Img URL"
              name="profileImg"
            />
          </div>
          <div className="py-1">
            <FXSelect
              defaultValue={user?.role}
              label={`${user?.role}`}
              name="role"
              options={[
                { label: "Admin", key: "admin" },
                { label: "User", key: "user" },
              ]}
            />
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default UpdateUserModal;
