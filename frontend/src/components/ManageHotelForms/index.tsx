import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import HotelTypesSection from "./TypeSection";
import FacilitiesSection from "./FacilitesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  price: number;
  starRating: number;
  imageFiles: File[];
};

type Props = {
  saveData: (formData: FormData) => void;
  isLoading: boolean
  isSuccess: boolean
  data?: HotelFormData
};

const index = ({ saveData, isLoading, isSuccess }: Props) => {
  const form = useForm<HotelFormData>();

  const onSubmit = form.handleSubmit((formDataJson) => {
    const formData = new FormData();
    console.log(formDataJson);
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("price", formDataJson.price.toString());
    formData.append("starRating", formDataJson.starRating.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(formDataJson.imageFiles).forEach((image) => {
      formData.append("imageFiles", image);
    });

    saveData(formData);
  });

  useEffect(() => {
    form.reset();
  }, [isSuccess, form.reset])
  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-7" onSubmit={onSubmit}>
        <DetailsSection />
        <HotelTypesSection />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />

        <span className="text-end">
          <button
            disabled={isLoading}
            className="text-white px-4 py-2 font-bold bg-blue-500 rounded-md hover:bg-blue-400 active:scale-95 transition-all duration-150 disabled:opacity-80"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default index;
