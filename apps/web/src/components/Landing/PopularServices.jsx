import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { FcNext, FcPrevious } from "react-icons/fc";

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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: <FcNext />,
    prevArrow: <FcPrevious />,
  };

  return (
    <div className="mx-6 md:mx-20 my-6 md:my-12">
      <h2 className="text-2xl md:text-4xl mb-3 md:mb-5 text-[#404145] font-bold">
        Popular Freelance Services
      </h2>
      <Slider {...settings}>
        {popularServices.map(({ name, label, image }) => (
          <div key={name} className="p-4">
            <div
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
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularServices;
