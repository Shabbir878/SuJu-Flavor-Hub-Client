import { Button } from "@nextui-org/button";
import { toast } from "sonner";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import Loading from "../UI/loading";

import FXModal from "./FXModal";

import {
  useGetMyDataQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";

const UpdateProfileModal = () => {
  const { data: user } = useGetMyDataQuery(undefined);
  const currentUser = user?.data[0];
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const onSubmit = async (data: any) => {
    const finalData = { id: currentUser?._id, data };
    const res = await updateUser(finalData).unwrap();

    if (res?.data) {
      toast.success(res?.messaage);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        buttonClassName="bg-default-200 text-default-700 hover:text-default-200 px-4 md:px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-default-700"
        buttonText="Edit profile"
        title="Update Your Profile"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              defaultValue={currentUser?.name}
              label="Name"
              name="name"
            />
          </div>
          <div className="py-1">
            <FXInput defaultValue={currentUser?.bio} label="Bio" name="bio" />
          </div>
          <div className="py-1">
            <FXInput
              defaultValue={currentUser?.profileImg}
              label="Profile Img URL"
              name="profileImg"
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

export default UpdateProfileModal;
