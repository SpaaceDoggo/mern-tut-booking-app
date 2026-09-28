import { useFormContext } from "react-hook-form";
import type { HotelFormData } from ".";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold mb-3">Image</h2>

      <div className="border border-gray-300 rounded-sm p-4 flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          multiple
          {...register("imageFiles", {
            validate(val) {
              if (val.length === 0) {
                return "At least one image is required";
              }

              if (val.length > 6) {
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
