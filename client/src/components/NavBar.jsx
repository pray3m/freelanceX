import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "../utils/constants";
import { toast } from "react-toastify";

const NavBar = () => {
  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  const router = useRouter();
  const [cookies] = useCookies();

  const [isLoaded, setIsLoaded] = useState(false);
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

  const links = [
    { linkName: "X Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign in", handler: handleLogin, type: "button" },
    { linkName: "Join", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.scrollY > 0 ? setNavFixed(true) : setNavFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setNavFixed(true);
    }
  }, [router.pathname]);

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/orders");
    router.push("/buyer/orders");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/buyer/orders");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );
          console.log({ user });

          let projectedUserInfo = { ...user };
          if (user.profileImage) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.profileImage,
            };
          }
          delete projectedUserInfo.profileImage;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          console.log({ user });
          if (user.isProfileInfoSet === false) {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong");
        }
      };
      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo, dispatch]);

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-10 flex justify-between items-center py-4 top-0 z-30 transition-all duration-300 ${
            navFixed || userInfo
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent "
          }`}
        >
          <div>
            <Link href="/">
              <p
                className={
                  !navFixed && !userInfo ? "text-[#fff]" : "text-[#404145]"
                }
              >
                <span className="text-3xl font-semibold flex items-center">
                  <i>freelance</i> <b className="text-green-700 text-4xl">X</b>
                </span>
              </p>
            </Link>
          </div>
          <div
            className={`hidden lg:flex ${
              navFixed || userInfo ? "opacity-100" : "opacity-0"
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
                      navFixed ? "text-black " : "text-white"
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
                          navFixed
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
            <ul className="flex gap-10 items-center">
              {isSeller && (
                <li
                  className="cursor-pointer text-[#1DBF73] font-medium"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  Create Gig
                </li>
              )}
              <li
                className="cursor-pointer text-[#1DBF73] font-medium"
                onClick={handleOrdersNavigate}
              >
                Orders
              </li>

              {isSeller ? (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Buyer
                </li>
              ) : (
                <li
                  className="cursor-pointer font-medium"
                  onClick={handleModeSwitch}
                >
                  Switch To Seller
                </li>
              )}
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // setIsContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className="text-xl text-white">
                      {userInfo &&
                        userInfo?.email &&
                        userInfo?.email.split("")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
        </nav>
      )}
    </>
  );
};

export default NavBar;
