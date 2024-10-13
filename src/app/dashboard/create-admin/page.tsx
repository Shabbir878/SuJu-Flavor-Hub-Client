"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useAppSelector } from "@/src/redux/hooks";
import { verifyToken } from "@/src/utils/verifyToken";

const Admin = () => {
  const [register, { isLoading, error }] = useRegisterMutation();

  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  let currentUser;

  if (user?.token) {
    currentUser = verifyToken(user?.token);
  }
  const currentUserRole = (currentUser as any)?.role;

  if (currentUserRole != "admin") {
    router?.push("/");
  }

  useEffect(() => {
    if ((error as any)?.status == 400) {
      toast.error("Email is already exist");
    }
  }, [error]);

  // Define a type for the onSubmit function
  type OnSubmitHandler = (
    data: FieldValues,
    formMethods: { reset: () => void },
  ) => Promise<void>;

  // Implement the onSubmit function
  const onSubmit: OnSubmitHandler = async (data, { reset }) => {
    const finalData = { ...data, role: "admin" };
    const res = await register(finalData).unwrap();

    if (res?.data) {
      toast.success(res?.message);
      reset(); // Reset the form after successful submission
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center p-4 bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-5xl md:max-w-7xl  p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700 mb-4">
          Create an Admin
        </h3>

        <FXForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <FXInput required label="Name" name="name" size="sm" />
            <FXInput
              required
              label="Email"
              name="email"
              size="sm"
              type="email"
            />
            <FXInput
              required
              label="Password"
              name="password"
              size="sm"
              type="password"
            />

            <Button
              className="w-full rounded-md bg-gradient-to-r from-teal-400 to-purple-500 text-default-800 font-semibold py-2"
              size="lg"
              type="submit"
            >
              Create Admin
            </Button>
          </div>
        </FXForm>
      </div>
    </div>
  );
};

export default Admin;

// "use client";
// import { Button } from "@nextui-org/button";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";
// import { FieldValues } from "react-hook-form";
// import { toast } from "sonner";

// import FXForm from "@/src/components/form/FXForm";
// import FXInput from "@/src/components/form/FXInput";
// import Loading from "@/src/components/UI/loading";
// import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
// import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
// import { useAppSelector } from "@/src/redux/hooks";
// import { verifyToken } from "@/src/utils/verifyToken";

// const Admin = () => {
//   const [register, { isLoading, error }] = useRegisterMutation();
//   const router = useRouter();
//   const user = useAppSelector(selectCurrentUser);
//   let currentUser;

//   if (user?.token) {
//     currentUser = verifyToken(user?.token);
//   }
//   const currentUserRole = (currentUser as any)?.role;

//   useEffect(() => {
//     if (currentUserRole !== "admin") {
//       router?.push("/");
//     }
//   }, [currentUserRole, router]);

//   useEffect(() => {
//     if ((error as any)?.status === 400) {
//       toast.error("Email already exists");
//     }
//   }, [error]);

//   // Define a type for the onSubmit function
//   type OnSubmitHandler = (
//     data: FieldValues,
//     formMethods: { reset: () => void },
//   ) => Promise<void>;

//   // Implement the onSubmit function
//   const onSubmit: OnSubmitHandler = async (data, { reset }) => {
//     const finalData = { ...data, role: "admin" };
//     const res = await register(finalData).unwrap();

//     if (res?.data) {
//       toast.success(res?.message);
//       reset(); // Reset the form after successful submission
//     }
//   };

//   return (
//     <div className="relative h-screen flex items-center justify-center p-4 bg-gradient-to-r from-indigo-100 to-blue-200">
//       {isLoading && <Loading />}

//       <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-8 mx-4 sm:p-10">
//         <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Create an Admin
//         </h3>

//         <FXForm onSubmit={onSubmit}>
//           <div className="space-y-6">
//             <FXInput required label="Name" name="name" size="lg" />
//             <FXInput
//               required
//               label="Email"
//               name="email"
//               size="lg"
//               type="email"
//             />
//             <FXInput
//               required
//               label="Password"
//               name="password"
//               size="lg"
//               type="password"
//             />

//             <Button
//               className="w-full rounded-lg bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold py-3 text-lg hover:opacity-90 transition duration-200"
//               size="lg"
//               type="submit"
//             >
//               Create Admin
//             </Button>
//           </div>
//         </FXForm>
//       </div>
//     </div>
//   );
// };

// export default Admin;
