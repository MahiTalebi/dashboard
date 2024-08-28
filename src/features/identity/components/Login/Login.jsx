import logo from "@assets/images/logo.svg";
import { httpService } from "../../../../core/http-service";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Link,
  useNavigation,
  useSubmit,
  useRouteError,
  redirect,
} from "react-router-dom";

export function Login() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitForm = useSubmit();
  const onSubmit = (data) => {
    submitForm(data, { method: "post" });
  };
  const navigation = useNavigation();

  const isSubmit = navigation.state !== "idle";
  const routeError = useRouteError();

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img src={logo} className="h-24" />
        <h1 className="text-2xl text-slate-700 dark:text-slate-50 m-4">
          {t("login.title")}
        </h1>
        <p className="mb-4 text-slate-500">{t("login.introMessage")}</p>
        <p className="text-slate-500">
          {t("login.areNotRegistered")}
          <Link to="/register" className="text-blue-600 mx-2">
            {t("register.register")}
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col bg-white dark:bg-slate-700 shadow-md rounded border-2 border-slate-100 dark:border-slate-700 p-8 m-8 w-1/3"
        >
          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2 dark:text-white">
              {t("login.mobile")}
            </label>
            <input
              {...register("mobile", {
                required: `${t("login.validation.mobileRequired")}`,
              })}
              className={`shadow appearance-none border dark:bg-slate-700 rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight shadow-slate-100 focus:outline-none focus:shadow-cyan-600 text-right ${
                errors.mobile && "shadow-red-600 focus:shadow-red-600"
              }`}
              autoComplete="tel"
            />
            {errors.mobile && errors.mobile.type === "required" && (
              <p className="text-red-600 text-sm font-bold mt-1">
                {errors.mobile?.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2 dark:text-white">
              {t("login.password")}
            </label>
            <input
              {...register("password", {
                required: `${t("login.validation.passwordRequired")} `,
              })}
              className={`shadow appearance-none border dark:bg-slate-700 rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight shadow-slate-100 focus:outline-none focus:shadow-cyan-600 text-right ${
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
          <div className="self-center flex justify-center h-10 w-24 bg-blue-600 rounded">
            <button type="submit" disabled={isSubmit} className="text-white">
              {isSubmit ? `${t("login.signingin")}` : `${t("login.signin")}`}
            </button>
          </div>

          {routeError && (
            <div className="p-2 mt-3 bg-red-100 text-red-500 rounded">
              {routeError.response?.data.map((error) => (
                <p>{t(`login.validation.${error.code}`)}</p>
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users/login", data);
  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
  }
  return redirect("/");
}
