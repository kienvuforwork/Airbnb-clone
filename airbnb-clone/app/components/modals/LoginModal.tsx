"use client";

import { signIn } from "next-auth/react";
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import Heading from "../Heading";
import { onClose as onCloseLoginModal } from "@/app/store/loginModalSlice";
import { onOpen as onOpenRegisterModal } from "@/app/store/registerModalSlice";
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
  const dispatch: AppDispatch = useDispatch();
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
    signIn("credentials", { ...data, redirect: false }).then(
      async (callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success("Logged in!");
          router.refresh();
          dispatch(onCloseLoginModal());
        }
        if (callback?.error) {
          toast.error("Error!");
        }
      }
    );
  };

  const toggle = useCallback(() => {
    dispatch(onCloseLoginModal());
    dispatch(onOpenRegisterModal());
  }, [dispatch]);

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
        onClick={() => {
          signIn("google");
        }}
        outline
        label="Continue with Google"
        icon={FcGoogle}
      ></Button>
      <Button
        onClick={() => {
          signIn("facebook");
        }}
        outline
        label="Continue with Facebook"
        icon={IoLogoFacebook}
      ></Button>
      <div className=" text-center mt-4 font-light flex justify-center">
        <div className="flex flex-row gap-4">
          <div>First time using Airbnb?</div>
          <div
            onClick={() => toggle()}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account!
          </div>
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
        dispatch(onCloseLoginModal());
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    ></Modal>
  );
};

export default LoginModal;
