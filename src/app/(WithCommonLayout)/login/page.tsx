"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";

const Login = () => {
  const [errorShow, setErrorShow] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginUser, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    // Check for error and update state
    if (error) {
      setErrorShow(true); // Trigger the error state change
    }
  }, [error]);

  useEffect(() => {
    if (errorShow && (error as any)?.data) {
      toast.error((error as any)?.data?.message);
    }
  }, [errorShow, error]);

  // Update the onSubmit function to accept the formMethods parameter
  const onSubmit = async (
    data: FieldValues,
    formMethods: { reset: () => void }
  ) => {
    try {
      const res = await loginUser(data).unwrap();

      if (res?.data) {
        toast.success(`${res?.message}`);
        const { email, name, _id, profileImg } = res?.data?.data;
        const finalUserData = { email, name, _id, profileImg };

        dispatch(setUser({ user: finalUserData, token: res?.data?.token }));
        router?.push("/");

        // Optionally reset the form after successful login
        formMethods.reset(); // Reset the form if desired
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700">
          Login to Recipe
        </h3>
        <p className="text-center text-default-800 mb-6">
          Welcome back! Let’s get started.
        </p>

        <FXForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <FXInput label="Email" name="email" size="sm" type="email" />
            <FXInput
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
              Login
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
            <Link href={"/forget-password"}>Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
