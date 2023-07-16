import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AnimatedText from "../../utils/AnimatedText";

const images = [
  "/bg-herof.png",
  "/bg-hero2.png",
  "/bg-hero3.png",
  // "/bg-hero4.png",
  "/bg-hero5.png",
  "/bg-hero6.png",
];

const popularSearchTerms = [
  { label: "Website Design", query: "website design" },
  { label: "Wordpress", query: "wordpress" },
  { label: "Logo Design", query: "logo design" },
  { label: "AI Services", query: "ai services" },
];

const HeroBanner = () => {
  const router = useRouter();
  const [image, setImage] = useState(0);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 4 ? 0 : image + 1),
      4000
    );
    return () => clearInterval(interval);
  }, [image]);

  const handleSearch = () => {
    router.push(`/search?q=${searchData}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-[460px] bg-black md:h-[680px] relative bg-cover">
      <div className="hidden  md:block absolute top-0 right-0 w-full h-full transition-opacity z-0">
        {images.map((img, index) => (
          <Image
            key={index}
            alt="hero"
            src={img}
            fill
            className={` ${
              index == image ? "opacity-100" : "opacity-0"
            } transition-all duration-1000 ease-in-out`}
          />
        ))}
      </div>

      <div className="z-10 relative md:w-1/2 flex justify-center flex-col h-full gap-8 md:gap-5 md:ml-20 mx-6">
        <h1 className="font-macan text-white font-semibold text-4xl md:text-5xl leading-snug ">
          <AnimatedText
            text="Find the perfect freelancer services for your business."
            className="flex flex-wrap pr-0 md:pr-20"
          />
        </h1>

        <div className="flex flex-col md:flex-row md:align-middle gap-4 md:gap-0">
          <div className="relative">
            <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              placeholder="Search for any service..."
              className="h-14 md:w-[450px] w-full pl-10 pr-5 rounded-md md:rounded-r-none focus:outline-none"
              onChange={(e) => setSearchData(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className="bg-[#1DBF73] text-white py-3 md:py-0 px-8 text-lg font-semibold rounded-md md:rounded-l-none "
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="hidden text-white md:flex gap-4">
          Popular:
          <ul className="flex gap-5">
            {popularSearchTerms.map(({ label, query }) => (
              <li
                key={query}
                className="text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/search?q=${query}`)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
