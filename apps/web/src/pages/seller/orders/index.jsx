import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SiGooglemessages } from "react-icons/si";
import { toast } from "react-toastify";
import { useStateProvider } from "../../../context/StateContext.jsx";
import { GET_SELLER_ORDERS } from "../../../utils/constants";

const index = () => {
  const [cookies] = useCookies();

  const [orders, setOrders] = useState([]);
  const [{ userInfo }] = useStateProvider();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get(GET_SELLER_ORDERS, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        console.log(data.orders);
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    if (userInfo) {
      getOrders();
    }
  }, [userInfo]);

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32 ">
      <h3 className="m-5 text-3xl font-semibold"> All Your Orders </h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="px-6 py-3">
                Ordered By
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Send Message
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={order.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.gig.title}
                  </th>
                  <td className="px-6 py-4">{order.gig.category}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-200 dark:bg-blue-800 rounded-xl p-2 font-medium">
                      💲 {order.gig.price}
                    </span>{" "}
                  </td>
                  <td className="px-6 py-4">{order.gig.deliveryTime} days</td>
                  <td className="px-6 py-4 place-items-center ">
                    <Image
                      src={order.buyer.profileImage}
                      alt={order.buyer.username}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    {order.buyer.fullName}
                  </td>
                  <td className="px-6 py-4">{order.createdAt.split("T")[0]}</td>
                  <td className="px-6 py-4">
                    <Link
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      href={`/buyer/orders/messages/${order.id}`}
                    >
                      <SiGooglemessages fill="green" size={30} />
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
