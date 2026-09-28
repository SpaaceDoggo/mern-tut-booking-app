import { useFormContext } from "react-hook-form";
import type { HotelFormData } from ".";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">Guest</h2>

      <div className="flex flex-col gap-2  sm:flex-row sm:gap-5 bg-gray-300 rounded-md p-6 box-content">
        <label className="flex-1">
          Adult
          <input
            {...register("adultCount", {
              validate(val) {
                if (!val && !watch("childCount")) {
                  return "This field is required";
                }
              },
            })}
            type="number"
            className="w-full bg-white rounded-sm px-2 py-1"
          />
        </label>

        <label className="flex-1">
          Child
          <input
            {...register("childCount", {
              validate(val) {
                if (!val && !watch("adultCount")) {
                  return "This field is required";
                }
              },
            })}
            type="number"
            className="w-full bg-white rounded-sm px-2 py-1"
          />
        </label>
      </div>

      {(errors.adultCount || errors.childCount) && (
        <span className="text-red-500">
          {errors.adultCount
            ? errors.adultCount.message
            : errors.childCount?.message}
        </span>
      )}
    </section>
  );
};

export default GuestSection;
