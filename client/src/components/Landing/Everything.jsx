import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

const Everything = () => {
  const everythingData = [
    {
      title: "Stick to your budget",
      subtitle:
        "Find the right service for every price point. No hourly rates, just project-based pricing.",
    },
    {
      title: "Get quality work done quickly",
      subtitle:
        "Hand your project over to a talented freelancer in minutes, get long-lasting results.",
    },
    {
      title: "Pay when you're happy",
      subtitle:
        "Upfront quotes mean no surprises. Payments only get released when you approve.",
    },
    {
      title: "Count on 24/7 support",
      subtitle:
        "Our round-the-clock support team is available to help anytime, anywhere.",
    },
  ];

  return (
    <div className="bg-[#f1fdf7] flex flex-col md:flex-row py-10 md:py-20 justify-between px-2 md:px-24">
      <div className="mx-3">
        <h2 className="text-2xl md:text-4xl mb-3 md:mb-5 text-[#404145] font-bold">
          The best part? Everything.
        </h2>
        <ul className="flex flex-col gap-10">
          {everythingData.map(({ title, subtitle }) => {
            return (
              <li key={title}>
                <div className="flex gap-2 items-center text-xl">
                  <BsCheckCircle className="text-green-500 " />
                  <h4>{title}</h4>
                </div>
                <p className="text-[#62646a]">{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative h-96 md:w-2/4 mt-8 ">
        <Image
          src="/everything.jpg"
          fill
          alt="everything"
          className="rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default Everything;
