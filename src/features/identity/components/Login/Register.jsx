import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { httpService } from "../../../../core/http-service";
import { useEffect, useTransition } from "react";

export function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const submitForm = useSubmit();
  const onSubmitt = (data) => {
    const { repassword, ...userData } = data;
    submitForm(userData, { method: "post" });
  };

  const navigation = useNavigation();
  const isSubmit = navigation.state !== "idle";
  const isSuccess = useActionData();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isSuccess]);

  const routeError = useRouteError();

  const { t } = useTransition();

  return (
    <div className="h-3/4 justify-self-center">
      <div className=" flex flex-col justify-center items-center">
        <img src={logo} className="h-24" />
        <h1 className="text-2xl text-slate-700 m-4">پلتفرم آموزش آنلاین</h1>
        <p className="mb-4 text-slate-500">
          جهت استفاده از ویژگی های پلتفرم آموزش آنلاین کلاس ها ثبت نام کنید
        </p>
        <p className="text-slate-500">
          قبلا ثبت نام کرده اید؟
          <Link to="/login" className="text-blue-600 mx-2">
            وارد شوید
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmitt)}
          className=" flex flex-col bg-white shadow-md rounded border-2 border-slate-100 p-8 m-8 w-1/3"
        >
          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              موبایل
            </label>
            <input
              {...register("mobile", {
                required: "موبایل الزامی است",
                minLength: 11,
                maxLength: 11,
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight shadow-slate-100 focus:outline-none focus:shadow-cyan-600 text-right ${
                errors.mobile && "shadow-red-600 focus:shadow-red-600"
              }`}
              autoComplete="tel"
            />
            {errors.mobile && errors.mobile.type === "required" && (
              <p className="text-red-600 text-sm font-bold mt-1">
                {errors.mobile?.message}
              </p>
            )}
            {errors.mobile &&
              (errors.mobile.type === "minLength" ||
                errors.mobile.type === "maxLength") && (
                <p className="text-red-600 text-sm font-bold mt-1">
                  تعداد ارقام موبایل صحیح نیست
                </p>
              )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              رمز عبور
            </label>
            <input
              {...register("password", { required: "رمز عبور الزامی است" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight shadow-slate-100 focus:outline-none focus:shadow-cyan-600 text-right ${
                errors.password && "shadow-red-600 focus:shadow-red-600"
              }`}
              type="password"
              autoComplete="new-password"
            />
            {errors.password && errors.password.type === "required" && (
              <p className="text-red-600 text-sm font-bold mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              تکرار رمز عبور
            </label>
            <input
              {...register("repassword", {
                required: "تکرار رمز عبور الزامی است",
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "عدم تطابق با رمز وارد شده ";
                  }
                },
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight shadow-slate-100 focus:outline-none focus:shadow-cyan-600 text-right ${
                errors.repassword && "shadow-red-600 focus:shadow-red-600"
              }`}
              type="password"
              autoComplete="new-password"
            />
            {errors.repassword && errors.repassword.type === "required" && (
              <p className="text-red-600 text-sm font-bold mt-1">
                {errors.repassword?.message}
              </p>
            )}
            {errors.repassword && errors.repassword.type === "validate" && (
              <p className="text-red-600 text-sm font-bold mt-1">
                {errors.repassword?.message}
              </p>
            )}
          </div>
          <div className="self-center flex justify-center h-10 w-28 bg-blue-600 rounded">
            <button type="submit" disabled={isSubmit} className="text-white">
              {isSubmit ? "صبر..." : "ثبت نام کنید"}
            </button>
          </div>
          {isSuccess && (
            <div className="p-2 mt-3 bg-teal-100 text-teal-500 rounded">
              عملیات با موفقیت انجام شد به صفحه ورود منتقل میشود
            </div>
          )}
          {routeError && (
            <div className="p-2 mt-3 bg-red-100 text-red-500 rounded">
              {routeError.response?.data.map((error) => (
                <p>{error.description}</p>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users", data);
  return response.status === 200;
}
