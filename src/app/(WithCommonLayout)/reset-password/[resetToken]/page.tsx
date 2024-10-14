"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useResitPasswordMutation } from "@/src/redux/features/auth/authApi";
import Loading from "@/src/components/UI/loading";
import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";

// const ResetPassword = () => {
//   const router = useRouter();
//   const { resetToken } = useParams();
//   const [resetPassword, { isLoading }] = useResitPasswordMutation();
//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const finalData = { token: resetToken, data };
//     const res = await resetPassword(finalData).unwrap();

//     toast.success(res?.messaage);
//     if (res?.success) {
//       router?.push("/login");
//     }
//   };

//   return (
//     <div>
//       {isLoading && <Loading />}
//       <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
//         {isLoading && <Loading />}

//         <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
//           <h3 className="text-3xl font-bold text-center text-default-700">
//             Reset Password
//           </h3>
//           <p className="text-center text-default-800 mb-6">
//             Enter your new password.
//           </p>

//           <FXForm onSubmit={onSubmit}>
//             <div className="space-y-4">
//               <FXInput
//                 required
//                 label="New Password"
//                 name="password"
//                 size="sm"
//                 type="password"
//               />
//               <Button
//                 className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
//                 size="lg"
//                 type="submit"
//               >
//                 Change Password
//               </Button>
//             </div>
//           </FXForm>

//           <div className="mt-4 text-center">
//             <p className="text-default-500">
//               Don’t have an account?{" "}
//               <Link className="text-teal-500 font-semibold" href={"/register"}>
//                 Register
//               </Link>
//             </p>
//             <p className="text-sm text-teal-500 mt-2">
//               <Link href={"/login"}>Back to Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ResetPassword = () => {
  const router = useRouter();
  const { resetToken } = useParams();
  const [resetPassword, { isLoading }] = useResitPasswordMutation();

  // Update onSubmit to accept formMethods
  const onSubmit = async (
    data: FieldValues,
    formMethods: { reset: () => void }
  ) => {
    const finalData = { token: resetToken, data };
    const res = await resetPassword(finalData).unwrap();

    toast.success(res?.messaage);
    if (res?.success) {
      formMethods.reset(); // Reset the form on success
      router?.push("/login");
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
        {isLoading && <Loading />}

        <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
          <h3 className="text-3xl font-bold text-center text-default-700">
            Reset Password
          </h3>
          <p className="text-center text-default-800 mb-6">
            Enter your new password.
          </p>

          <FXForm onSubmit={onSubmit}>
            <div className="space-y-4">
              <FXInput
                required
                label="New Password"
                name="password"
                size="sm"
                type="password"
              />
              <Button
                className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
                size="lg"
                type="submit"
              >
                Change Password
              </Button>
            </div>
          </FXForm>

          <div className="mt-4 text-center">
            <p className="text-default-500">
              Don’t have an account?{" "}
              <Link className="text-teal-500 font-semibold" href={"/register"}>
                Register
              </Link>
            </p>
            <p className="text-sm text-teal-500 mt-2">
              <Link href={"/login"}>Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
