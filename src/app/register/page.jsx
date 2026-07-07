"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Button,
  Form,
} from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { redirect } from "next/navigation";
import Logo from "@/components/shared/Logo";

// Custom Input wrapper that doesn't pass invalid props to DOM
const CustomInput = ({
  label,
  errorMessage,
  isInvalid,
  startContent,
  labelPlacement,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-semibold text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {startContent && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm z-10">
            {startContent}
          </div>
        )}
        <input
          {...props}
          className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white placeholder-slate-400 outline-none transition-all
            ${startContent ? "pl-10" : ""} 
            ${isInvalid ? "border-red-500" : "border-white/10 hover:border-pink-500/50 focus:border-pink-500"}
            ${className || ""}`}
        />
      </div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = data.image[0];
    const imageUrl = await uploadImage(imageFile);

    const { data: signUpData, error: signUpError } =
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: imageUrl,
        role: data.role,
      });

    if (signUpError) {
      toast.error("Registration not succeed...");
    } else {
      redirect("/");
    }
  };

  return (
    <div>
      <Card className="w-full max-w-lg border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4 mx-auto">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          <Logo />
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Join Ticketo to book premium events or host your own organization.
          </p>
        </CardHeader>
        <CardBody className="gap-4">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <CustomInput
              {...register("name", { required: "Name is Required" })}
              id="name"
              label="Full Name"
              placeholder="John Doe"
              startContent={<FaUser className="text-slate-400 text-sm" />}
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
            />

            <CustomInput
              {...register("email", { required: "Email is Required" })}
              id="email"
              label="Email Address"
              placeholder="john@example.com"
              type="email"
              startContent={<FaEnvelope className="text-slate-400 text-sm" />}
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
            />

            <CustomInput
              {...register("image", { required: "Image is Required" })}
              type="file"
              accept="image/*"
              id="image"
              label="Profile Image"
              startContent={<FaImage className="text-slate-400 text-sm" />}
              errorMessage={errors.image?.message}
              isInvalid={!!errors.image}
            />

            <CustomInput
              {...register("password", {
                required: "Password is required",
              })}
              id="password"
              label="Password"
              placeholder="••••••••"
              type="password"
              startContent={<FaLock className="text-slate-400 text-sm" />}
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
            />

            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="role"
                className="text-sm font-semibold text-slate-300"
              >
                Select Role
              </label>
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
                className="w-full bg-slate-900/50 border border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3 rounded-lg text-white outline-none transition-all"
              >
                <option value="attendee">Attendee</option>
                <option value="organizer">Organizer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
              radius="lg"
            >
              Create Account
            </Button>
          </Form>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-white/5" />
            <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
              Or Sign Up With
            </span>
            <div className="flex-grow border-t border-white/5" />
          </div>

          <Button
            variant="bordered"
            className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
            radius="lg"
            startContent={<FaGoogle className="text-pink-500" />}
          >
            Google OAuth
          </Button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pink-500 hover:text-pink-400 font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
