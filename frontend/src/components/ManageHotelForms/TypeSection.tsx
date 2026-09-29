import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../configs/hotel-types";
import type { HotelFormData } from ".";

const HotelTypesSection = () => {
  const { register, watch, formState: {errors} } = useFormContext<HotelFormData>();
  const selectedType = watch('type');
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Types</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {hotelTypes.map((hotel, i) => (
          <label
            className={`px-4 py-2 rounded-full font-semibold ${selectedType === hotel ? "bg-blue-300" : "bg-gray-300"}`}
            key={i}
          >
            <span>{hotel}</span>
            <input
              {...register("type", { required: "This field is required" })}
              type="radio"
              value={hotel}
              className="hidden"
            />
          </label>
        ))} 
      </div>

      {errors.type && <span className="text-xs text-red-500">{errors.type.message}</span>}
    </section>
  );
};

export default HotelTypesSection;
