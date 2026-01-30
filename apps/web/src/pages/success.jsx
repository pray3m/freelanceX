import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { ORDER_SUCCESS } from "../utils/constants";
import axios from "axios";

const success = () => {
  const router = useRouter();
  const { payment_intent } = router.query;
  const [cookies] = useCookies();

  useEffect(() => {
    const changeOrderStatus = async () => {
      try {
        await axios.put(
          ORDER_SUCCESS,
          { paymentIntent: payment_intent },
          {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    };

    if (payment_intent) {
      changeOrderStatus();
    }

    setTimeout(() => {
      if (payment_intent) {
        router.push("/buyer/orders");
      } else {
        router.push("/");
      }
    }, 3000);
  }, [payment_intent, router]);

  return (
    <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
      <h1 className="text-4xl text-center">
        Payment successful. You are being redirected to the orders page.
      </h1>
      <h1 className="text-4xl text-center">Please do not close the page.</h1>
    </div>
  );
};

export default success;
