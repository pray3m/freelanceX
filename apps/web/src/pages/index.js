import Business from "../components/Landing/Business";
import Companies from "../components/Landing/Companies";
import Everything from "../components/Landing/Everything";
import HeroBanner from "../components/Landing/HeroBanner";
import JoinFreelance from "../components/Landing/JoinFreelance";
import PopularServices from "../components/Landing/PopularServices";
import Services from "../components/Landing/Services";
import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { useStateProvider } from "../context/StateContext";

const Index = () => {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();
  return (
    <div>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <Business />
      <JoinFreelance />
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  );
};

export default Index;
