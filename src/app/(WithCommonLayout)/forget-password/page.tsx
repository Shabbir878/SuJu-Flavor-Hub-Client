// "use client";
// import { Button } from "@nextui-org/button";
// import Link from "next/link";
// import React from "react";
// import { FieldValues, SubmitHandler } from "react-hook-form";
// import { toast } from "sonner";

// import { useForgetPasswordMutation } from "@/src/redux/features/auth/authApi";
// import Loading from "@/src/components/UI/loading";
// import FXInput from "@/src/components/form/FXInput";
// import FXForm from "@/src/components/form/FXForm";

// const ForgetPassword = () => {
//   const [forgatePassword, { isLoading }] = useForgetPasswordMutation();

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const res = await forgatePassword(data);

//     if ((res as any)?.data) {
//       toast.success((res as any)?.data?.messaage);
//     }
//     if ((res as any)?.error) {
//       toast.error((res as any)?.error?.data?.message);
//     }
//   };

//   return (
//     <div className="relative h-screen flex items-center justify-center">
//       {isLoading && <Loading />}

//       <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
//         <h3 className="text-3xl font-bold text-center text-default-700">
//           Forgot Password
//         </h3>
//         <p className="text-center text-default-800 mb-6">
//           Enter your email to reset your password.
//         </p>

//         <FXForm onSubmit={onSubmit}>
//           <div className="space-y-4">
//             <FXInput
//               required
//               label="Email"
//               name="email"
//               size="sm"
//               type="email"
//             />
//             <Button
//               className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
//               size="lg"
//               type="submit"
//             >
//               Send Email
//             </Button>
//           </div>
//         </FXForm>

//         <div className="mt-4 text-center">
//           <p className="text-default-500">
//             Don’t have an account?{" "}
//             <Link className="text-teal-500 font-semibold" href={"/register"}>
//               Register
//             </Link>
//           </p>
//           <p className="text-sm text-teal-500 mt-2">
//             <Link href={"/login"}>Back to Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;

"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form"; // No need to import SubmitHandler anymore
import { toast } from "sonner";

import { useForgetPasswordMutation } from "@/src/redux/features/auth/authApi";
import Loading from "@/src/components/UI/loading";
import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";

const ForgetPassword = () => {
  const [forgatePassword, { isLoading }] = useForgetPasswordMutation();

  // Update onSubmit to match the expected type
  const onSubmit = async (
    data: FieldValues,
    formMethods: { reset: () => void }
  ) => {
    const res = await forgatePassword(data);

    if ((res as any)?.data) {
      toast.success((res as any)?.data?.message); // Check spelling of 'message'
      formMethods.reset(); // Call reset method from formMethods
    }
    if ((res as any)?.error) {
      toast.error((res as any)?.error?.data?.message);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700">
          Forgot Password
        </h3>
        <p className="text-center text-default-800 mb-6">
          Enter your email to reset your password.
        </p>

        <FXForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <FXInput
              required
              label="Email"
              name="email"
              size="sm"
              type="email"
            />
            <Button
              className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
              size="lg"
              type="submit"
            >
              Send Email
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
  );
};

export default ForgetPassword;
