import { useFormContext } from "react-hook-form";
import type { HotelFormData } from ".";


const DetailsSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<HotelFormData>();

  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-3xl font-bold mb-3">Add Hotel</h3>

      <label className="font-bold text-gray-700">
        Name
        <input
          className="w-full border border-gray-400 rounded-sm px-2 py-1 font-normal"
          {...register("name", { required: "This field is required." })}
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex justify-between gap-5">
        <label className="flex-1 font-bold text-gray-700">
          City
          <input
            {...register("city", { required: "This field is required" })}
            className="w-full border border-b-gray-400 font-normal px-2 py-1 rounded-sm"
          />
          {errors.city && (
            <span className="text-xs font-normal text-red-500">
              {errors.city.message}
            </span>
          )}
        </label>

        <label className="flex-1 font-bold text-gray-700">
          Country
          <input
            {...register("country", { required: "This field is required" })}
            className="w-full border border-b-gray-400 font-normal px-2 py-1 rounded-sm"
          />
          {errors.country && (
            <span className="text-xs font-normal text-red-500">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>

      <label className="font-bold text-gray-700">
        Description
        <textarea
          {...register("description", {
            validate(val) {
              if (!val) {
                return "This field is required";
              }
              if (val.length < 20) {
                return "Description must be 20 characters long";
              }
            },
          })}
          rows={10}
          className="w-full border border-gray-400 rounded-md px-2 py-1 font-normal"
        />
        {errors.description && (
          <span className="text-xs font-normal text-red-500">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="block font-bold text-gray-700">
        Price
        <input
          {...register("price", { required: "This filed is required" })}
          type="number"
          className="block w-[50%] border px-2 py-1 rounded-sm font-normal"
        />
        {errors.price && (
          <span className="text-xs font-normal text-red-50">
            {errors.price.message}
          </span>
        )}
      </label>

      <label className="block font-bold text-gray-700">
        Star Rating
        <select 
         {...register("starRating", {required: "This field is required"})}
         className="block w-[50%] px-2 py-1 border border-gray-400 rounded-sm font-normal"
        >
          <option value={""} className="font-bold">
            Select rating
          </option>
          {Array.from({ length: 5 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-xs font-normal text-red-500">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </section>
  );
};

export default DetailsSection;
