import React, { useEffect } from "react";
import { useStateProvider } from "../../context/StateContext";
import { useRouter } from "next/router";
import { GET_GIG_BY_ID_ROUTE } from "../../utils/constants";
import axios from "axios";
import Details from "../../components/Gigs/Details";
import Pricing from "../../components/Gigs/Pricing";
import { reducerCases } from "../../context/constants";

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
        dispatch({ type: reducerCases.SET_GIG_DATA, gigData: gig });
        // console.log({ gig });
      } catch (er) {
        console.log(er);
      }
    };
    if (gigId) fetchGigInfo();
  }, [gigId, dispatch]);

  return (
    <div className="grid grid-cols-3 mx-32 gap-20">
      <Details />
      <Pricing />
    </div>
  );
};

export default GigInfo;
