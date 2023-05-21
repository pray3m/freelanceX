import Link from "next/link";
import React from "react";
import {
  FiGithub,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

const Footer = () => {
  const socialLinks = [
    { name: "Github", icon: <FiGithub />, link: "https://www.github.com" },
    {
      name: "Youtube",
      icon: <FiYoutube />,
      link: "https://www.youtube.com/KishanSheth21/",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin />,
      link: "https://www.linkedin.com/in/koolkishan/",
    },
    {
      name: "Instagram",
      icon: <FiInstagram />,
      link: "https://instagram.com/koolkishansheth",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      link: "https://twitter.com/koolkishansheth",
    },
  ];
  return (
    <footer className="w-full md:px-20 py-6 md:py-8 h-max border-t border-gray-200 bg-gray-100">
      <div className="mt-8 flex flex-col-reverse gap-5 md:flex-row md:justify-between ">
        <div className="flex items-center justify-center gap-4">
          <span>
            <i className="text-2xl md:text-3xl font-bold">freelance</i>
            <b className="text-green-500 text-4xl">X</b>
          </span>
          <p className="text-gray-400"> &copy; freelanceX Global Inc. 2023</p>
        </div>
        <ul className="flex gap-5  place-self-center">
          {socialLinks.map(({ icon, link, name }) => (
            <li
              key={name}
              className="text-xl text-[#404145] hover:text-[#1DBF73] transition-all"
            >
              <Link href={link}>{icon}</Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center mt-6 font-semibold">
        Made With Sleepless Nights! 🌙
      </p>
    </footer>
  );
};

export default Footer;
