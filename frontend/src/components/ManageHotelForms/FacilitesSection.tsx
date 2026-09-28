import { useFormContext } from "react-hook-form";
import type { HotelFormData } from ".";
import { hotelFacilities } from "../../configs/hotel-types";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold">Facilities</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {hotelFacilities.map((facility, i) => (
          <label 
           className="flex items-center text-gray-700"
           key={i}
          >
            <input
              {...register("facilities", {
                validate(val) {
                  if (val && val.length > 0) {
                    return true;
                  } else {
                    return "At least 1 facility is required";
                  }
                },
              })}
              type="checkbox"
              value={facility}
            />
            <span className=" pl-1">{facility}</span>
          </label>
        ))}
      </div>

      {errors.facilities && (
        <span className="text-red-500"> {errors.facilities.message}</span>
      )}
    </section>
  );
};

export default FacilitiesSection;
