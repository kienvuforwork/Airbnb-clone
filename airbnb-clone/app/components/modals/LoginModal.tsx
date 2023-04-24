"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineFacebook } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import type { TypedUseSelectorHook } from "react-redux";
import { onClose } from "@/app/store/loginModalSlice";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const LoginModal = () => {
  const isOpen = useSelector(
    (state: RootState) => state.loginModalSlice.isOpen
  );
  const router = useRouter();
  const disptach: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in!");
        router.refresh();
        disptach(onClose());
      }
      if (callback?.error) {
        toast.error("Error!");
      }
      console.log(callback);
    });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading center title="Welcome Back!" subtitle="Login Now!"></Heading>

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>

      <Input
        id="password"
        label="Passsword"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3  ">
      <hr />
      <Button
        onClick={() => {}}
        outline
        label="Continue with Google"
        icon={FcGoogle}
      ></Button>
      <Button
        onClick={() => {}}
        outline
        label="Continue with Facebook"
        icon={IoLogoFacebook}
      ></Button>
      <div className=" text-center mt-4 font-light flex justify-center">
        <div className="flex flex-row gap-4">
          <div
            onClick={() => disptach(onClose())}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
          <div>Already have an account?</div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Log in"
      actionLabel="Continue"
      onClose={() => {
        disptach(onClose());
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};

export default LoginModal;
