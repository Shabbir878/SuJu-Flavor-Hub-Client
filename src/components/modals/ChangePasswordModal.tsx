// import { Button } from "@nextui-org/button";
// import { FieldValues, SubmitHandler } from "react-hook-form";
// import { toast } from "sonner";

// import FXForm from "../form/FXForm";
// import FXInput from "../form/FXInput";
// import Loading from "../UI/loading";

// import FXModal from "./FXModal";

// import { useChangePasswordMutation } from "@/src/redux/features/auth/authApi";
// import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
// import {
//   selectCurrentUser,
//   setUser,
// } from "@/src/redux/features/auth/authSlice";

// interface ChangePasswordModalProps {
//   onPasswordChange?: () => void; // Add optional onPasswordChange prop
// }

// const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
//   onPasswordChange, // Destructure onPasswordChange from props
// }) => {
//   const dispatch = useAppDispatch();
//   const [changePassword, { isLoading, error }] = useChangePasswordMutation();
//   const user = useAppSelector(selectCurrentUser);

//   if (error) {
//     toast.error((error as any)?.data?.message);
//   }

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const finalData = { email: user?.user?.email, ...data };
//     const res = await changePassword(finalData).unwrap();

//     if (res?.data) {
//       toast.success(res?.message);
//     }

//     if (res?.success) {
//       dispatch(setUser({ user: user?.user, token: res?.data?.token }));
//       // Trigger onPasswordChange if provided
//       if (onPasswordChange) {
//         onPasswordChange();
//       }
//     }
//   };

//   return (
//     <div>
//       {isLoading && <Loading />}
//       <FXModal
//         buttonClassName="bg-default-200 text-default-700 hover:text-default-200 px-4 md:px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-default-700"
//         buttonText="Change Password"
//         title="Update Your Password"
//       >
//         <FXForm onSubmit={onSubmit}>
//           <div className="py-1">
//             <FXInput required label="Previous Password" name="prePassword" />
//           </div>
//           <div className="py-1">
//             <FXInput required label="New Password" name="newPassword" />
//           </div>
//           <div className="flex justify-center pt-2 w-full pb-2">
//             <Button className="w-full" type="submit">
//               Change Password
//             </Button>
//           </div>
//         </FXForm>
//       </FXModal>
//     </div>
//   );
// };

// export default ChangePasswordModal;

import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";
import Loading from "../UI/loading";

import FXModal from "./FXModal";

import { useChangePasswordMutation } from "@/src/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  selectCurrentUser,
  setUser,
} from "@/src/redux/features/auth/authSlice";

interface ChangePasswordModalProps {
  onPasswordChange?: () => void; // Add optional onPasswordChange prop
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onPasswordChange, // Destructure onPasswordChange from props
}) => {
  const dispatch = useAppDispatch();
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();
  const user = useAppSelector(selectCurrentUser);

  if (error) {
    toast.error((error as any)?.data?.message);
  }

  // Updated onSubmit to accept both data and formMethods
  const onSubmit: (
    data: FieldValues,
    formMethods: { reset: () => void }
  ) => Promise<void> = async (data, formMethods) => {
    const finalData = { email: user?.user?.email, ...data };
    const res = await changePassword(finalData).unwrap();

    if (res?.data) {
      toast.success(res?.message);
    }

    if (res?.success) {
      dispatch(setUser({ user: user?.user, token: res?.data?.token }));
      // Trigger onPasswordChange if provided
      if (onPasswordChange) {
        onPasswordChange();
      }
      // Reset the form after successful submission
      formMethods.reset();
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <FXModal
        buttonClassName="bg-default-200 text-default-700 hover:text-default-200 px-4 md:px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-default-700"
        buttonText="Change Password"
        title="Update Your Password"
      >
        <FXForm onSubmit={onSubmit}>
          <div className="py-1">
            <FXInput required label="Previous Password" name="prePassword" />
          </div>
          <div className="py-1">
            <FXInput required label="New Password" name="newPassword" />
          </div>
          <div className="flex justify-center pt-2 w-full pb-2">
            <Button className="w-full" type="submit">
              Change Password
            </Button>
          </div>
        </FXForm>
      </FXModal>
    </div>
  );
};

export default ChangePasswordModal;
