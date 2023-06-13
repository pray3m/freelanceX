import React, { useEffect, useState } from "react";
import { CREATE_ORDER } from "../utils/constants";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies] = useCookies();

  const router = useRouter();
  const { gigId } = router.query;

  useEffect(() => {
    const createOrder = async () => {
      try {
        const { data } = await axios.post(
          CREATE_ORDER,
          { gigId },
          {
            headers: {
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        );
        setClientSecret(data.clientSecret);
        toast.success("Order created");
      } catch (err) {
        console.log(err);
        toast.error("Error creating order");
      }
    };

    if (gigId) {
      createOrder();
    }
  }, [gigId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-[80vh] max-w-full mx-20 flex flex-col gap-5 items-center ">
      <h1 className="text-3xl font-medium">Complete Your Order ! </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default checkout;
