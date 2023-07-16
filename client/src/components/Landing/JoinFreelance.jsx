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
    <div className="mx-4 my-6 md:mx-32 md:my-16 relative">
      <div className="absolute z-10 top-1/3 left-5 md:left-10">
        <p className="text-md md:text-base font-semibold mb-4 text-white">
          20X FASTER THAN HIRING
        </p>
        <h4 className="text-white text-3xl md:text-4xl mb-10 font-semibold">
          Efficient. Scalable. Hella <i>reliable</i>
        </h4>
        <button
          className="border-2 text-md font-semibold px-6 py-3 md:mx-8 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md transition-all duration-300 hover:bg-transparent hover:text-[#ffffff]"
          type="button"
          onClick={handleSignup}
        >
          Join FreelanceX
        </button>
      </div>
      <div className="brightness-90 md:brightness-100 h-80 w-full md:h-96">
        <Image src="/signup.png" fill alt="signup" className="rounded-sm" />
      </div>
    </div>
  );
}

export default JoinFreelance;
