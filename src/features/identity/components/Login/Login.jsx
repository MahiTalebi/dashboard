import logo from "@assets/images/logo.svg";
import { Link } from "react-router-dom";
export function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <img src={logo} className="h-24" />
        <h1 className="text-2xl text-slate-700 m-4">پلتفرم آموزش آنلاین</h1>
        <p className="mb-4 text-slate-500">
          جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید
        </p>
        <p className="text-slate-500">
          قبلا ثبت نام نکرده اید؟
          <Link to="/register" className="text-blue-600 mx-2">
            ثبت نام کنید
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center">
        <form className=" flex flex-col bg-white shadow-md rounded border-2 border-slate-100 p-8 m-8 w-1/3">
          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              موبایل
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-cyan-600 text-right" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              رمز عبور
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-cyan-600 text-right"
              type="password"
            />
          </div>
          <div className="self-center flex justify-center h-10 w-24 bg-blue-600 rounded">
            <button type="submit" className="text-white ">
              وارد شوید
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
