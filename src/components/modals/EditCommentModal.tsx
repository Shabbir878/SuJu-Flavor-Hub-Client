"use client";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";

import FXModal from "./FXModal";

import {
  useGetSingleCommentQuery,
  useUpdateCommentMutation,
} from "@/src/redux/features/comment/commentApi";

// const EditCommentModal = ({ id }: { id: string }) => {
//   const { data: getSingleComment } = useGetSingleCommentQuery(id);
//   const currentComment = getSingleComment?.data?.comment;
//   const [updateComment] = useUpdateCommentMutation();

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const finlData = { id, data: { ...data } };
//     const res = await updateComment(finlData).unwrap();

//     if (res?.data) {
//       toast?.success(res?.messaage);
//     }
//   };

//   return (
//     <div>
//       {/* {isLoading && <Loading />} */}
//       <FXModal
//         buttonClassName="px-2 py- bg-green-500 hover:bg-green-700 rounded-full text-md transition duration-300 mr-2"
//         buttonText="edit"
//         title="Update Your Profile"
//       >
//         <FXForm onSubmit={onSubmit}>
//           <div className="py-1">
//             <FXInput
//               required
//               defaultValue={currentComment}
//               label="Comment"
//               name="comment"
//             />
//           </div>
//           <div className="flex justify-center pt-2 w-full pb-2">
//             <Button className="w-full" type="submit">
//               Update
//             </Button>
//           </div>
//         </FXForm>
//       </FXModal>
//     </div>
//   );
// };

const EditCommentModal = ({ id }: { id: string }) => {
  const { data: getSingleComment } = useGetSingleCommentQuery(id);
  const currentComment = getSingleComment?.data?.comment;
  const [updateComment] = useUpdateCommentMutation();

  const onSubmit: (
    data: FieldValues,
    formMethods: { reset: () => void }
  ) => Promise<void> = async (data, { reset }) => {
    const finlData = { id, data: { ...data } };
    const res = await updateComment(finlData).unwrap();

    if (res?.data) {
      toast.success(res?.message);
      reset(); // Optional: Reset the form after submission
    }
  };

  return (
    <div>
      <FXModal
        buttonClassName="px-2 py- bg-green-500 hover:bg-green-700 rounded-full text-md transition duration-300 mr-2"
        buttonText="edit"
        title="Update Your Profile"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput
              required
              defaultValue={currentComment}
              label="Comment"
              name="comment"
            />
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Update
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default EditCommentModal;
