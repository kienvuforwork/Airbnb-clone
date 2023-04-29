"use client";
import { AppDispatch, RootState } from "@/app/store";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { onClose } from "@/app/store/rentModalSlice";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { useForm, FieldValues } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFOR = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const isOpen = useSelector((state: RootState) => state.rentModalSlice.isOpen);
  const dispatch: AppDispatch = useDispatch();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const onBack = () => {
    setStep((step) => step - 1);
  };
  const onNext = () => {
    setStep((step) => step + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);
  const {
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these describde your place?"
        subtitle="Pick a category"
      ></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[50vh]">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            {/* {item.label} */}
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
            ></CategoryInput>
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="Where is your property?"
          subtitle="Help geusts find you!"
        ></Heading>
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        ></CountrySelect>
        <Map center={location?.latlng}></Map>
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(onClose());
      }}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={() => onNext()}
      body={bodyContent}
    ></Modal>
  );
};

export default RentModal;
