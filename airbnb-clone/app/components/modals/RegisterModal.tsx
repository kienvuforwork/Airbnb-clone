"use client";

import axios from "axios";
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineFacebook } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { onOpen as onOpenLoginModal } from "@/app/store/loginModalSlice";
import Modal from "./Modal";
import type { TypedUseSelectorHook } from "react-redux";
import { onClose } from "@/app/store/registerModalSlice";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const isOpen = useSelector(
    (state: RootState) => state.registerModalReducer.isOpen
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
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post("/api/register", data).then(() => {
      toast.success("Registered!");
      disptach(onClose());
    });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        center
        title="Become a Airbnber"
        subtitle="Create Account"
      ></Heading>

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
      <Input
        id="name"
        label="Name"
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
      title="resgister"
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

export default RegisterModal;
