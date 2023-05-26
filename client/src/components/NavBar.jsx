import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO } from "../utils/constants";

const NavBar = () => {
  const handleLogin = () => {};

  const handleSignup = () => {};

  const router = useRouter();
  const [cookies] = useCookies();

  const [isLoaded, setIsLoaded] = useState(true);
  const [isFixed, setIsFixed] = useState(true);
  const [searchData, setSearchData] = useState("");
  const [{ showLoginModal, showSignupModal, userInfo, isSeller }, dispatch] =
    useStateProvider();

  const links = [
    { linkName: "X Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(GET_USER_INFO, {}, { withCredentials: true });
          
          let projectedUserInfo = { ...user };
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    }
  }, [cookies, userInfo]);

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-10 flex justify-between items-center py-4 top-0 z-30 transition-all duration-300 ${
            isFixed || userInfo
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent "
          }`}
        >
          <div>
            <Link href="/">
              <p className={!isFixed ? "text-[#fff]" : "text-[#404145]"}>
                <span className="text-3xl font-semibold flex items-center">
                  <i>freelance</i> <b className="text-green-700 text-4xl">X</b>
                </span>
              </p>
            </Link>
          </div>
          <div
            className={`hidden lg:flex ${
              isFixed || userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="text"
              className="w-[30rem] py-2.5 px-4 border "
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="What service are you looking for today?"
            />
            <button
              className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>
          {!userInfo ? (
            <ul className="flex gap-6 items-center ">
              {links.map(({ linkName, handler, type }) => {
                return (
                  <li
                    key={linkName}
                    className={`${
                      isFixed ? "text-black " : "text-white"
                    } font-medium `}
                  >
                    {type === "link" && <Link href={handler}> {linkName}</Link>}
                    {type === "button" && (
                      <button onClick={handler}> {linkName}</button>
                    )}
                    {type === "button2" && (
                      <button
                        onClick={handler}
                        className={`border text-md font-semibold py-1 px-3 rounded-sm ${
                          isFixed
                            ? "border-[#1DBF73] text-[#1DBF73]"
                            : "border-white text-white"
                        } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-300`}
                      >
                        {" "}
                        {linkName}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul></ul>
          )}
        </nav>
      )}
    </>
  );
};

export default NavBar;
