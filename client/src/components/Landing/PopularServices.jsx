import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const PopularServices = () => {
  const router = useRouter();

  const popularServices = [
    { name: "Ai Artists", label: "Add talent to AI", image: "/service1.png" },
    { name: "Logo Design", label: "Build your brand", image: "/service2.jpeg" },
    {
      name: "Wordpress",
      label: "Customize your site",
      image: "/service3.jpeg",
    },
    {
      name: "Voice Over",
      label: "Share your message",
      image: "/service4.jpeg",
    },
    {
      name: "Social Media",
      label: "Reach more customers",
      image: "/service5.jpeg",
    },
    { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
    {
      name: "Illustration",
      label: "Color your dreams",
      image: "/service7.jpeg",
    },
    { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  ];

  return (
    <div className="mx-6 md:mx-20 my-6 md:my-12">
      <h2 className="text-2xl md:text-4xl mb-3 md:mb-5 text-[#404145] font-bold">
        Popular Freelance Services
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {popularServices.map(({ name, label, image }) => (
          <li
            key={name}
            className="relative cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
          >
            <div className="absolute z-10 text-white left-3 top-3">
              <span className="text-sm md:text-base">{label}</span>
              <h6 className="font-semibold text-lg md:text-2xl">{name}</h6>
            </div>
            <div className="h-48 md:h-80 w-full relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 transition-all duration-300">
                <Image
                  src={image}
                  alt="service"
                  fill
                  className="hover:filter hover:brightness-75 transition-all duration-300 hover:scale-105 transform"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularServices;
