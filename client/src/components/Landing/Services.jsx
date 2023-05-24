import React from "react";
import { categories } from "../../utils/categories";
import Image from "next/image";

const Services = () => {
  return (
    <div className="px-2 md:px-24 py-6 md:py-12">
      <h2 className="text-2xl md:text-4xl mb-3 md:mb-5 text-[#404145] font-bold">
        You need it, we've got it
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-5">
        {categories.map(({ name, logo }) => (
          <li
            key={name}
            className="flex flex-col justify-center items-center cursor-pointer hover:shadow-2xl hover:border-[#1DBF73] border-2 border-transparent p-5 transition-all duration-500 rounded-lg"
          >
            <Image src={logo} alt="category" height={50} width={50} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
