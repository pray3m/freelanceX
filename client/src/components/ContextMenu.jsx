import { useRouter } from "next/router";
import React from "react";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";

function ContextMenu({ data }) {
  const router = useRouter();
  return (
    <div
      className={`z-10  bg-white divide-y divide-gray-100 shadow-2xl border w-36 fixed right-5 top-20 rounded-xl text-lg 
      `}
    >
      <ul className="py-2 text-sm text-gray-950">
        {data.map(({ name, callback }, index) => {
          return (
            <li
              key={index}
              onClick={callback}
              className="block px-4 py-2 cursor-pointer hover:bg-slate-200 rounded-lg m-1 text-center"
            >
              {name} &nbsp;
              {name === "Logout" && <FiLogOut className="inline text-lg" />}
              {name === "Profile" && <RxAvatar className="inline text-lg" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContextMenu;
