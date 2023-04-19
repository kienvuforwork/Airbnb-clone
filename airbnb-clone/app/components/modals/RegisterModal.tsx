"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import type { TypedUseSelectorHook } from "react-redux";
import { onClose } from "@/app/store/registerModalSlice";

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const RegisterModal = () => {
  const isOpen = useSelector(
    (state: RootState) => state.registerModalReducer.isOpen
  );

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { erorrs },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post("/api/register", data).then(() => {});
  };
  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="resgister"
      actionLabel="Continue"
      onClose={() => {}}
      onSubmit={handleSubmit(onSubmit)}
    ></Modal>
  );
};

export default RegisterModal;
