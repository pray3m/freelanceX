import Business from "@/components/Business";
import Companies from "@/components/Companies";
import Everything from "@/components/Everything";
import HeroBanner from "@/components/HeroBanner";
import JoinFreelance from "@/components/JoinFreelance";
import PopularServices from "@/components/PopularServices";
import Services from "@/components/Services";
import React from "react";

const Index = () => {
  return (
    <div>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <Business />
      <JoinFreelance />
    </div>
  );
};

export default Index;
