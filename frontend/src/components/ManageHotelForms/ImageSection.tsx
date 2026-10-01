import { useFormContext } from "react-hook-form";
import type { HotelFormData } from ".";
import { useEffect } from "react";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImgUrls = watch('imageUrls');
  
  const handleDeleteBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImgUrls?.filter((url) => url !== imageUrl)
    );
  };

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold mb-3">Image</h2>

      <div className="border border-gray-300 rounded-sm p-4 flex flex-col gap-4">
        {existingImgUrls !== undefined && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,250px))] gap-4 items-center">
            {existingImgUrls?.map((imgUrl) => (
              <div className="group relative">
                <img
                  src={imgUrl}
                  className="h-70 w-70 md:h-100 md:w-100  resize-none object-cover rounded-sm"
                />
                <button
                  onClick={(event) => handleDeleteBtn(event, imgUrl)}
                  className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-85 text-white text-lg duration-200 transition-all cursor-pointer active:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          {...register("imageFiles", {
            validate(val) {
              const totalLenght = val.length + (existingImgUrls?.length || 0)
              if (totalLenght === 0) {
                return "At least one image is required";
              }

              if (totalLenght > 6) {
                return "Maximum number of images is 6";
              }
            },
          })}
          className="w-full text-gray-700 font-normal"
        />
      </div>

      {errors.imageFiles && (
        <span className="text-red-500">{errors.imageFiles.message}</span>
      )}
    </section>
  );
};

export default ImageSection;
