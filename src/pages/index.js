
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "@/lib/api/restaurant/login";
import { write } from "@/lib/windows/utils";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { checkAuth } from "@/Auth/auth.js";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const defaultValues = {
    email: 'irayya@example.com',
    password: "12345",
  };
  const schema = yup.object().shape({
    email: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
  });
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    shouldUnregister: false,
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      const result = await userLogin(data);
      if (result?.status === 200 && result?.data?.token) {
        write("userData", {
          token: result?.data?.token,
          email: result?.data?.email,
          role: result?.data?.role,
        });
        router.push("/restaurants/listRestaurants");
        toast.success("Login Success");
      } else {
        router.push("/");
        // console.log('res',result)
        toast.error(result?.response?.data?.msg);
      }
    } catch (error) {
      console.log("err", error);
      toast.error(error);
    }
  };

  useLayoutEffect(() => {
    checkAuth(router, true);

    return undefined;
  }, [router]);

  return (
    <section className="text-gray-600 body-font">
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:m-auto w-full md:py-8 mt-8 md:mt-0 border border-1 p-4">
            <ToastContainer />
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-4">
                <label for="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  aria-invalid={errors.email ? "true" : "false"}
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}
              </div>
              <div className="relative mb-4">
                <label
                  for="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                  id="password"
                  name="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}{" "}
              </div>
              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
}
