import Image from "next/image";
import React from "react";
import { useStateProvider } from "../../context/StateContext";
import { reducerCases } from "../../context/constants";

function JoinFreelance() {
  const [{ showLoginModal, showSignupModal }, dispatch] = useStateProvider();

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };
  return (
    <div className=" mx-4 my-6 md:mx-32 md:my-16 relative">
      <div className="absolute z-10 top-1/3 left-5 md:left-10">
        <h4 className="text-white text-4xl md:text-5xl mb-10 font-semibold">
          Suddenly it's all so <i>doable.</i>
        </h4>
        <button
          className="border text-base font-medium px-5 py-2 md:mx-8 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
          type="button"
          onClick={handleSignup}
        >
          Join FreelanceX
        </button>
      </div>
      <div className="brightness-90 md:brightness-100 h-80 w-full md:h-96">
        <Image src="/bg-signup.webp" fill alt="signup" className="rounded-sm" />
      </div>
    </div>
  );
}

export default JoinFreelance;
