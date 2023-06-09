import React, { useEffect } from "react";
import { useStateProvider } from "../../context/StateContext";
import { useRouter } from "next/router";
import { GET_GIG_BY_ID_ROUTE } from "../../utils/constants";
import axios from "axios";

const GigInfo = () => {
  const router = useRouter();
  const { gigId } = router.query;

  const [{ userInfo }, dispatch] = useStateProvider();

  useEffect(() => {
    const fetchGigInfo = async () => {
      try {
        const {
          data: { gig },
        } = await axios.get(`${GET_GIG_BY_ID_ROUTE}/${gigId}`);
        console.log({ gig });
      } catch (er) {
        console.log(er);
      }
    };
    if (gigId) fetchGigInfo();
  }, [gigId, dispatch]);

  return <div>gigInfo</div>;
};

export default GigInfo;
