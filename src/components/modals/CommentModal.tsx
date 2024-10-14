/* eslint-disable @typescript-eslint/no-unused-vars */

// import React, { useState } from "react";
// import { Button } from "@nextui-org/button";
// import { SubmitHandler, FieldValues } from "react-hook-form";
// import { Avatar } from "@nextui-org/avatar";
// import Link from "next/link";
// import { AiOutlineDelete } from "react-icons/ai";
// import { toast } from "sonner";

// import { verifyToken } from "../../utils/verifyToken";
// import Loading from "../UI/loading";
// import FXInput from "../form/FXInput";
// import FXForm from "../form/FXForm";

// import EditCommentModal from "./EditCommentModal";
// import FXModal from "./FXModal";

// import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
// import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
// import { useAppSelector } from "@/src/redux/hooks";
// import {
//   useAddCommentMutation,
//   useDeleteCommentMutation,
//   useUpdateCommentMutation,
// } from "@/src/redux/features/comment/commentApi";

// const CommentModal = ({
//   id,
//   comments,
//   onClose,
// }: {
//   id: string;
//   comments: any;
//   onClose: () => void;
// }) => {
//   const [commentId, setCommentId] = useState("");
//   const user = useAppSelector(selectCurrentUser);

//   let verifyUser: any;

//   if (user?.token) {
//     verifyUser = verifyToken(user?.token);
//   }

//   const [addComment, { isLoading }] = useAddCommentMutation();
//   const { data: currentUserData } = useGetMyDataQuery(undefined);
//   const currentUser = currentUserData?.data[0];
//   const [updateComment] = useUpdateCommentMutation();
//   const [deleteComment] = useDeleteCommentMutation();

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const finalData = {
//       ...data,
//       postId: id,
//       commentUserId: verifyUser?.userId,
//       commentUserImage: currentUser?.profileImg,
//       commentUserName: currentUser?.name,
//     };
//     const res = await addComment(finalData).unwrap();

//     if (res?.data) {
//       toast.success(res?.message);
//     }
//   };

//   const handleEditComment = (id: string) => {
//     setCommentId(id);
//   };

//   const handleDeleteComment = async (id: string) => {
//     const res = await deleteComment(id).unwrap();

//     if (res?.data) {
//       toast.success(res?.message);
//     }
//   };

//   return (
//     <div className="relative p-6">
//       {isLoading && <Loading />}

//       <FXModal
//         buttonClassName="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
//         buttonText="Comment"
//         title=""
//       >
//         <div className="space-y-6">
//           <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
//             All Comments
//           </h1>
//           <div className="space-y-2 max-h-80 overflow-y-auto">
//             {comments?.map((comment: any) => (
//               <div
//                 key={comment._id}
//                 className="border border-gray-300 rounded-xl p-4 shadow-md bg-white transition-all duration-300 hover:shadow-lg flex items-start gap-4"
//               >
//                 <Link href={`/profile/${comment?.commentUserId}`}>
//                   <Avatar
//                     className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-lg"
//                     src={comment?.commentUserImage}
//                   />
//                 </Link>
//                 <div className="flex flex-col flex-grow">
//                   <Link
//                     className="text-sm font-semibold text-purple-600 hover:text-indigo-500 transition-all duration-300"
//                     href={`/profile/${comment?.commentUserId}`}
//                   >
//                     {comment?.commentUserName}
//                   </Link>
//                   <p className="text-md text-gray-700 mt-1">
//                     {comment?.comment}
//                   </p>
//                 </div>
//                 {verifyUser &&
//                   verifyUser?.userId === comment?.commentUserId && (
//                     <div className="flex items-center gap-2">
//                       <button onClick={() => handleEditComment(comment?._id)}>
//                         <EditCommentModal id={commentId} />
//                       </button>
//                       <button
//                         className="px-2 py-1 bg-red-600 hover:bg-red-800 rounded-full text-md transition duration-300"
//                         onClick={() => handleDeleteComment(comment?._id)}
//                       >
//                         <AiOutlineDelete />
//                       </button>
//                     </div>
//                   )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <FXForm onSubmit={onSubmit}>
//           <div className="py-4">
//             <FXInput required label="Add Your Comment" name="comment" />
//           </div>
//           <div className="flex justify-center pt-4 w-full">
//             <Button
//               className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
//               type="submit"
//             >
//               Comment
//             </Button>
//           </div>
//         </FXForm>
//       </FXModal>
//     </div>
//   );
// };

// export default CommentModal;

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

import { verifyToken } from "../../utils/verifyToken";
import Loading from "../UI/loading";
import FXInput from "../form/FXInput";
import FXForm from "../form/FXForm";

import EditCommentModal from "./EditCommentModal";
import FXModal from "./FXModal";

import { useGetMyDataQuery } from "@/src/redux/features/user/userApi";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/src/redux/features/comment/commentApi";

const CommentModal = ({
  id,
  comments,
  onClose,
}: {
  id: string;
  comments: any;
  onClose: () => void;
}) => {
  const [commentId, setCommentId] = useState("");
  const user = useAppSelector(selectCurrentUser);

  let verifyUser: any;

  if (user?.token) {
    verifyUser = verifyToken(user?.token);
  }

  const [addComment, { isLoading }] = useAddCommentMutation();
  const { data: currentUserData } = useGetMyDataQuery(undefined);
  const currentUser = currentUserData?.data[0];
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  // Modify onSubmit to accept formMethods
  const onSubmit: (
    data: FieldValues,
    formMethods: { reset: () => void }
  ) => Promise<void> = async (data, { reset }) => {
    const finalData = {
      ...data,
      postId: id,
      commentUserId: verifyUser?.userId,
      commentUserImage: currentUser?.profileImg,
      commentUserName: currentUser?.name,
    };
    const res = await addComment(finalData).unwrap();

    if (res?.data) {
      toast.success(res?.message);
      reset(); // Reset the form after successful submission
    }
  };

  const handleEditComment = (id: string) => {
    setCommentId(id);
  };

  const handleDeleteComment = async (id: string) => {
    const res = await deleteComment(id).unwrap();

    if (res?.data) {
      toast.success(res?.message);
    }
  };

  return (
    <div className="relative p-6">
      {isLoading && <Loading />}

      <FXModal
        buttonClassName="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        buttonText="Comment"
        title=""
      >
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            All Comments
          </h1>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {comments?.map((comment: any) => (
              <div
                key={comment._id}
                className="border border-gray-300 rounded-xl p-4 shadow-md bg-white transition-all duration-300 hover:shadow-lg flex items-start gap-4"
              >
                <Link href={`/profile/${comment?.commentUserId}`}>
                  <Avatar
                    className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-lg"
                    src={comment?.commentUserImage}
                  />
                </Link>
                <div className="flex flex-col flex-grow">
                  <Link
                    className="text-sm font-semibold text-purple-600 hover:text-indigo-500 transition-all duration-300"
                    href={`/profile/${comment?.commentUserId}`}
                  >
                    {comment?.commentUserName}
                  </Link>
                  <p className="text-md text-gray-700 mt-1">
                    {comment?.comment}
                  </p>
                </div>
                {verifyUser &&
                  verifyUser?.userId === comment?.commentUserId && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEditComment(comment?._id)}>
                        <EditCommentModal id={commentId} />
                      </button>
                      <button
                        className="px-2 py-1 bg-red-600 hover:bg-red-800 rounded-full text-md transition duration-300"
                        onClick={() => handleDeleteComment(comment?._id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        <FXForm onSubmit={onSubmit}>
          <div className="py-4">
            <FXInput required label="Add Your Comment" name="comment" />
          </div>
          <div className="flex justify-center pt-4 w-full">
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              type="submit"
            >
              Comment
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default CommentModal;
