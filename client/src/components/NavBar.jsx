import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";
import { IoSearchOutline } from "react-icons/io5";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "../utils/constants";
import { toast } from "react-toastify";
import ContextMenu from "./ContextMenu";
import { RxCross1 } from "react-icons/rx";

const NavBar = () => {
  const router = useRouter();
  const [cookies] = useCookies();
  const [isLoaded, setIsLoaded] = useState(false);
  const [navFixed, setNavFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [{ showLoginModal, showSignupModal, isSeller, userInfo }, dispatch] =
    useStateProvider();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
    if (cookies.jwt) {
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
  }, [cookies, dispatch]);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  useEffect(() => {
    const clickListener = (e) => {
      e.stopPropagation();
      if (isContextMenuVisible) setIsContextMenuVisible(false);
    };
    if (isContextMenuVisible) {
      window.addEventListener("click", clickListener);
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isContextMenuVisible]);

  const ContextMenuData = [
    {
      name: "Profile",
      callback: (e) => {
        e.stopPropagation();
        setIsContextMenuVisible(false);
        router.push("/profile");
      },
    },
    {
      name: "Logout",
      callback: (e) => {
        e.stopPropagation();
        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  return (
    <>
      {isLoaded && (
        <>
          <nav
            className={`w-full px-4 md:px-10 flex justify-between items-center py-4 top-0 z-30 transition-all duration-300 ${
              navFixed || userInfo
                ? "fixed bg-white border-b border-gray-200"
                : "absolute bg-transparent border-transparent"
            }`}
          >
            <div className="flex items-center">
              <Link href="/">
                <p
                  className={
                    !navFixed && !userInfo ? "text-[#fff]" : "text-[#404145]"
                  }
                >
                  <span className="text-2xl md:text-3xl font-semibold flex items-center">
                    <i>freelance</i>{" "}
                    <b className="text-green-700 text-3xl md:text-4xl">X</b>
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
                className="w-[30rem] py-2.5 px-4 border border-gray-300"
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

            <div className="hidden md:block">
              {!userInfo ? (
                <ul className="flex gap-6 items-center">
                  {links.map(({ linkName, handler, type }) => (
                    <li
                      key={linkName}
                      className={`${
                        navFixed ? "text-black " : "text-white"
                      } font-medium hover:text-[#2ae68e] transition-all duration-300`}
                    >
                      {type === "link" && (
                        <Link href={handler}>{linkName}</Link>
                      )}
                      {type === "button" && (
                        <button onClick={handler}>{linkName}</button>
                      )}
                      {type === "button2" && (
                        <button
                          onClick={handler}
                          className={`border text-md font-semibold py-1 px-6 rounded-sm ${
                            navFixed
                              ? "border-[#1DBF73] text-[#1DBF73]"
                              : "border-white text-white"
                          } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-300`}
                        >
                          {linkName}
                        </button>
                      )}
                    </li>
                  ))}
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
                  <li
                    className="cursor-pointer font-medium"
                    onClick={handleModeSwitch}
                  >
                    {isSeller ? "Switch To Buyer" : "Switch To Seller"}
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsContextMenuVisible(true);
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
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                  !navFixed && !userInfo ? "text-white" : "text-black"
                } p-2 z-50 relative`}
              >
                {isOpen ? (
                  <RiCloseLine className="h-6 w-6" />
                ) : (
                  <RiMenu3Line className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            />
          )}

          <div
            ref={mobileMenuRef}
            className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden px-4 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="absolute right-4 top-6"
              onClick={() => setIsOpen(false)}
            >
              <RxCross1 size={32} />
            </button>
            <div className="h-full flex flex-col pt-20">
              <div className=" border-b">
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-l"
                    placeholder="Search..."
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                  />
                  <button
                    className="px-4 bg-gray-900 text-white rounded-r"
                    onClick={() => {
                      router.push(`/search?q=${searchData}`);
                      setIsOpen(false);
                    }}
                  >
                    <IoSearchOutline className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {!userInfo ? (
                  <div className="py-4 flex flex-col items-center">
                    {links.map(({ linkName, handler, type }) => (
                      <div
                        key={linkName}
                        className="w-full text-center py-3 hover:bg-gray-100"
                        onClick={() => {
                          if (typeof handler === "function") handler();
                          setIsOpen(false);
                        }}
                      >
                        {type === "link" && (
                          <Link href={handler} className="block">
                            {linkName}
                          </Link>
                        )}
                        {type === "button" && (
                          <button className="w-full">{linkName}</button>
                        )}
                        {type === "button2" && (
                          <button className="w-full py-2 px-6 border border-[#1DBF73] text-[#1DBF73] hover:bg-[#1DBF73] hover:text-white rounded-sm transition-all duration-300">
                            {linkName}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 flex flex-col items-center">
                    {isSeller && (
                      <div
                        className="w-full text-center py-3 hover:bg-gray-100"
                        onClick={() => {
                          router.push("/seller/gigs/create");
                          setIsOpen(false);
                        }}
                      >
                        Create Gig
                      </div>
                    )}
                    <div
                      className="w-full text-center py-3 hover:bg-gray-100"
                      onClick={() => {
                        handleOrdersNavigate();
                        setIsOpen(false);
                      }}
                    >
                      Orders
                    </div>
                    <div
                      className="w-full text-center py-3 hover:bg-gray-100"
                      onClick={() => {
                        handleModeSwitch();
                        setIsOpen(false);
                      }}
                    >
                      {isSeller ? "Switch To Buyer" : "Switch To Seller"}
                    </div>
                    <div
                      className="w-full text-center py-3 hover:bg-gray-100"
                      onClick={() => {
                        router.push("/profile");
                        setIsOpen(false);
                      }}
                    >
                      Profile
                    </div>
                    <div
                      className="w-full text-center py-3 hover:bg-gray-100"
                      onClick={() => {
                        router.push("/logout");
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isContextMenuVisible && <ContextMenu data={ContextMenuData} />}
        </>
      )}
    </>
  );
};

export default NavBar;
