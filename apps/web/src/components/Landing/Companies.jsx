import Image from "next/image";
import React from "react";

function Companies() {
  const trustedCompanies = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center justify-center text-gray-400 text-2xl font-semibold min-h-[11vh] mx-2 ">
      <p className="hidden md:inline text-xl">Trusted By :</p>
      <ul className="flex max-w-full justify-between gap-10 mx-6">
        {trustedCompanies.map((num) => (
          <li key={num} className="relative h-[4rem] w-[4rem]">
            <Image src={`/trusted${num}.png`} alt="trusted brands" fill />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
