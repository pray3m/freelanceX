import React from "react";
import Image from "next/image";
import { BsCheckCircle } from "react-icons/bs";

const Business = () => {
  const features = [
    "Talent matching",
    "Dedicated account management",
    "Team collaboration tools",
    "Business payment solutions",
  ];

  return (
    <div className="bg-[#0d084d] px-5 md:px-32 py-6 md:py-16 flex flex-col md:flex-row gap-10 ">
      <div className="text-white flex flex-col gap-6 justify-center items-start">
        <div className="flex gap-2 text-white text-2xl md:text-3xl font-bold items-center">
          <span>
            <i>
              Skill <span className="text-green-600">Bridge</span>
            </i>
          </span>
          <span className="">Business</span>
        </div>
        <h2 className="text-2xl md:text-4xl mb-3 md:mb-5 font-bold">
          A solution built for business
        </h2>
        <ul className="flex flex-col gap-4">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 items-center">
              <BsCheckCircle className="text-green-600 text-2xl" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button
          className="border-2 text-md font-semibold px-6 py-3 md:mx-4 md:my-4 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md transition-all duration-300 hover:bg-transparent hover:text-[#ffffff]"
          type="button"
        >
          Explore XBusiness
        </button>
      </div>
      <div className="relative w-full h-[280px] md:h-[512px] md:w-1/2">
        <Image src="/business.png" alt="business" fill />
      </div>
    </div>
  );
};

export default Business;
