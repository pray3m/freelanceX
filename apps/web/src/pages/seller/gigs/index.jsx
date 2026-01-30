import React, { useEffect, useState } from "react";
import { GET_ALL_USER_GIGS_ROUTE } from "../../../utils/constants";
import axios from "axios";
import Link from "next/link";
import { useCookies } from "react-cookie";

const index = () => {
  const [cookies] = useCookies();
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const getUserGigs = async () => {
      try {
        const { data } = await axios.get(GET_ALL_USER_GIGS_ROUTE, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        console.log(data);
        setGigs(data.gigs);
      } catch (err) {
        console.log(err);
      }
    };
    getUserGigs();
  }, []);

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32 ">
      <h3 className="m-5 text-3xl font-semibold"> All Your Gigs</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {gigs.map(({ title, category, deliveryTime, price, id }) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {title}
                  </th>
                  <td className="px-6 py-4">{category}</td>
                  <td className="px-6 py-4">{deliveryTime} Days</td>
                  <td className="px-6 py-4">$ {price}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      href={`/seller/gigs/${id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
