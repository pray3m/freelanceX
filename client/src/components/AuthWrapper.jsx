import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { toast } from "react-toastify";

const AuthWrapper = ({ type }) => {
  const [cookies, setCookies] = useCookies();

  const [{ showLoginModal, showSignupModel }, dispatch] = useStateProvider();
  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = values;
      if (!email || !password) {
        toast.error("Please fill all the fields.");
        return;
      }

      const {
        data: { user, jwt },
      } = await axios.post(
        type === "login" ? LOGIN_ROUTE : SIGNUP_ROUTE,
        values,
        { withCredentials: true }
      );
      setCookies("jwt", jwt);
      dispatch({ type: reducerCases.CLOSE_AUTH_MODAL });
      if (user) {
        dispatch({ type: reducerCases.SET_USER, userInfo: user });
        toast.success("Login/Signup successful!");
        // window.location.reload();
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="fixed top-0 z-[100]">
      <div className="h-[100vh] w-[100vw] backdrop-blur-md fixed top "></div>
      <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
        <div
          className="fixed z-[101] h-max w-max bg-white rounded-lg shadow-lg flex flex-col justify-center items-center"
          id="auth-modal"
        >
          <div className="flex flex-col justify-center items-center p-8 gap-7">
            <h3 className="text-2xl font-semibold text-slate-700">
              {type === "login"
                ? "Nice to see you again ! "
                : "Start your journey with us!"}
            </h3>
            <div className="flex flex-col gap-5">
              <button className="text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative">
                <MdFacebook className="absolute left-4 text-2xl" />
                Continue with Facebook
              </button>
              <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                <FcGoogle className="absolute left-4 text-2xl" />
                Continue with Google
              </button>
            </div>
            <div className="relative  w-full text-center">
              <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                <span className="bg-white relative z-10 px-2">OR</span>
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="email"
                placeholder="Email / Username"
                className="border border-slate-300 p-3 w-80"
                value={values.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 p-3 w-80"
                name="password"
                value={values.password}
                onChange={handleChange}
              />

              {type === "login" && (
                <span
                  className="text-[#1DBF73] text-sm cursor-pointer text-right "
                  onClick={() =>
                    alert(
                      "Hey, forgetful genius! Relax and try to remember your password! 🔍"
                    )
                  }
                >
                  Forgot Password?
                </span>
              )}

              <button
                className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md p-3 w-80"
                onClick={handleClick}
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
          <div className="py-5 w-full flex items-center justify-center border-t border-slate-400">
            <span className="text-sm  text-slate-700">
              {type === "login" ? (
                <>
                  Don't have an account?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: true,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: false,
                      });
                    }}
                  >
                    Join Now
                  </span>
                </>
              ) : (
                <>
                  Already a member?&nbsp;
                  <span
                    className="text-[#1DBF73] cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: reducerCases.TOGGLE_SIGNUP_MODAL,
                        showSignupModal: false,
                      });
                      dispatch({
                        type: reducerCases.TOGGLE_LOGIN_MODAL,
                        showLoginModal: true,
                      });
                    }}
                  >
                    Login Now
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
