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
    <div className="bg-[#0d084d] px-5 md:px-20 py-6 md:py-16 flex flex-col md:flex-row gap-10">
      <div className="text-white flex flex-col gap-6 justify-center items-start">
        <div className="flex gap-2 text-white text-2xl md:text-3xl font-bold items-center">
          <span>
            <i>freelance</i>
            <b className="text-green-500 text-4xl">X</b>
          </span>
          <span className="">Business</span>
        </div>
        <h2 className="text-2xl md:text-4xl mb-3 md:mb-5 font-bold">
          A solution built for business
        </h2>
        <h4 className="text-xl">
          Upgrade to a curated experience to access vetted talent and exclusive
          tools
        </h4>
        <ul className="flex flex-col gap-4">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 items-center">
              <BsCheckCircle className="text-[#62646a] text-2xl" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button
          className="border text-base font-medium px-5 py-2   border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
          type="button"
        >
          Explore X Business
        </button>
      </div>
      <div className="relative w-full h-[280px] md:h-[512px] md:w-2/3">
        <Image src="/business.webp" alt="business" fill />
      </div>
    </div>
  );
};

export default Business;
