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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const submitForm = useSubmit();
  const onSubmit = (data) => {
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

  const { t } = useTranslation();

  return (
    <div className="h-3/4 justify-self-center">
      <div className=" flex flex-col justify-center items-center">
        <img src={logo} className="h-24" />
        <h1 className="text-2xl text-slate-700 dark:text-slate-50 m-4">
          {t("register.title")}
        </h1>
        <p className="mb-4 text-slate-500">{t("register.introMessage")}</p>
        <p className="text-slate-500">
          {t("register.alreadyRegistered")}
          <Link to="/login" className="text-blue-600 mx-2">
            {t("register.signin")}
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col bg-white dark:bg-slate-700 shadow-md rounded border-2 border-slate-100 dark:border-slate-700 p-8 m-8 w-1/3"
        >
          <div className="mb-4">
            <label className="block text-gray-500 dark:text-white text-sm font-bold mb-2">
              {t("register.mobile")}
            </label>
            <input
              {...register("mobile", {
                required: `${t("register.validation.mobileRequired")}`,
                minLength: 11,
                maxLength: 11,
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
            {errors.mobile &&
              (errors.mobile.type === "minLength" ||
                errors.mobile.type === "maxLength") && (
                <p className="text-red-600 text-sm font-bold mt-1">
                  {t("register.validation.mobileLength")}
                </p>
              )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 dark:text-white text-sm font-bold mb-2">
              {t("register.password")}
            </label>
            <input
              {...register("password", {
                required: `${t("register.validation.passwordRequired")} `,
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
          <div className="mb-6">
            <label className="block text-gray-500 dark:text-white text-sm font-bold mb-2">
              {t("register.repeatPassword")}
            </label>
            <input
              {...register("repassword", {
                required: `${t("register.validation.repeatPasswordRequired")}`,
                validate: (value) => {
                  if (watch("password") !== value) {
                    return `${t("register.validation.notMatching")}`;
                  }
                },
              })}
              className={`shadow appearance-none border dark:bg-slate-700 rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight shadow-slate-100 focus:outline-none focus:shadow-cyan-600 text-right ${
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
              {isSubmit
                ? `${t("register.saving")}`
                : `${t("register.register")}`}
            </button>
          </div>
          {isSuccess && (
            <div className="p-2 mt-3 bg-teal-100 text-teal-500 rounded">
              {t("register.successOperation")}
            </div>
          )}
          {routeError && (
            <div className="p-2 mt-3 bg-red-100 text-red-500 rounded">
              {routeError.response?.data.map((error) => (
                <p>{t(`register.validation.${error.code}`)}</p>
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
