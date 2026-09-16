import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const clientQuery = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,

    onSuccess: () => {
      showToast({
        message: "Registration successfull",
        type: "SUCCESS",
      });
      clientQuery.invalidateQueries({ queryKey: ["cookieValidation"] });
      navigate("/");
    },

    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold">Create an Account</h1>
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="font-bold flex-1 text-gray-700">
          First name
          <input
            type="text"
            className="w-full border border-gray-300 py-1 px-2 rounded-sm font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500 font-normal text-sm">
              *{errors.firstName.message}
            </span>
          )}
        </label>

        <label className="font-bold flex-1 text-gray-700">
          Last Name
          <input
            type="text"
            className="w-full border border-gray-300 py-1 px-2 rounded-sm font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm font-normal">
              *{errors.lastName.message}
            </span>
          )}
        </label>
      </div>

      <label className="font-bold flex-1 text-gray-700">
        Email
        <input
          type="email"
          className="w-full border border-gray-300  py-1 px-2 rounded-sm font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm font-normal">
            *{errors.email.message}
          </span>
        )}
      </label>

      <label className="flex-1 font-bold">
        Password
        <input
          type="password"
          className="w-full border border-gray-300 px-2 py-1 font-normal rounded-sm"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be 6 or more in length",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 font-normal text-sm">
            {errors.password.message}
          </span>
        )}
      </label>

      <label className="flex-1 font-bold">
        Confirm Password
        <input
          type="password"
          className="w-full border border-gray-300 rounded-sm font-normal px-2 py-1"
          {...register("confirmPassword", {
            validate(val) {
              if (!val) {
                return "This field is required";
              } else if (val !== watch("password")) {
                return "Passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 font-normal text-sm">
            *{errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span className="flex items-center justify-between flex-wrap gap-5">
        <span>
          Existing user?{" "}
          <Link to={"/sign-in"} className="text-blue-500 underline">
            Login
          </Link>{" "}
        </span>
        <button
          type="submit"
          className="px-3 py-2 rounded-sm bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all duration-150 active:scale-95 cursor-pointer"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
