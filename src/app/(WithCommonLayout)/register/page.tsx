"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/loading";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";

const Register = () => {
  const dispatch = useAppDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();

  useEffect(() => {
    if ((error as any)?.status === 400) {
      toast.error("Email already exists");
    }
  }, [error]);

  // Change the type of onSubmit to match FXForm's requirements
  const onSubmit = async (
    data: FieldValues,
    formMethods: { reset: () => void }
  ) => {
    try {
      const res = await register(data).unwrap();

      if (res?.data) {
        toast.success(`${res?.message}`);
        const { email, name, _id, profileImg } = res.data;
        const finalUserData = { email, name, _id, profileImg };

        dispatch(setUser({ user: finalUserData, token: res.data.token }));
        // Reset the form after successful registration
        formMethods.reset();
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-white">
      {isLoading && <Loading />}

      <div className="bg-default-100 shadow-lg rounded-lg w-full max-w-md p-8 mx-4">
        <h3 className="text-3xl font-bold text-center text-default-700">
          Register to Recipe
        </h3>
        <p className="text-center text-default-800 mb-6">
          Create your account to get started.
        </p>

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
              Register
            </Button>
          </div>
        </FXForm>

        <div className="mt-4 text-center">
          <p className="text-default-500">
            Already have an account?{" "}
            <Link className="text-teal-500 font-semibold" href={"/login"}>
              Login
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

export default Register;
