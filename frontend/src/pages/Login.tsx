import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from '../api-client';
import { Link, useNavigate } from "react-router-dom";
export type LoginForm = {
  email: string;
  password: string;
};
const Login = () => {
  const { showToast, setUserId } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const mutate = useMutation({
    mutationKey: ['login'],
    mutationFn: apiClient.login,
    onSuccess: async (data:string) => {
      setUserId(data);
      showToast({
        message: "Successfuly login",
        type: 'SUCCESS'
      })
      queryClient.invalidateQueries({queryKey: ['cookieValidation']})
      navigate('/');
    },
    onError: (error:Error) => {
      console.log(error.message);
      showToast({
        message: error.message,
        type: 'ERROR'
      })
    }
  })

  const onSubmit: SubmitHandler<LoginForm> = (d: LoginForm) => {
    mutate.mutate(d);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>

      <div className="flex flex-col gap-4">
        <label className="flex-1">
          Email
          <input
            type="email"
            className="w-full px-2 py-1 rounded-sm border font-normal"
            {...register("email", { required: "This field is required" })}
          />
          {errors && (
            <span className="text-xs font-normal text-red-500">
              {errors.email?.message}
            </span>
          )}
        </label>

        <label className="flex-1">
          Password
          <input
            type="password"
            className="w-full px-2 py-1 rounded-sm font-normal border"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be 6 length long or more",
              },
            })}
          />
          {errors && (
            <span className="text-xs font-normal text-red-500">
              {errors.password?.message}
            </span>
          )}
        </label>
      </div>

      <span className="flex items-center justify-between gap-5 flex-wrap">
        <span>No existing account? <Link to={'/register'} className="text-blue-500">Register</Link></span>
        <button className="px-4 py-2 font-bold bg-blue-500 rounded-sm text-white">
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
