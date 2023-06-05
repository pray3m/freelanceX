import React, { useEffect, useState } from "react";
import { GET_ALL_USER_GIGS_ROUTE } from "../../../utils/constants";
import axios from "axios";

const index = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const getUserGigs = async () => {
      try {
        const { data } = await axios.get(GET_ALL_USER_GIGS_ROUTE, {
          withCredentials: true,
        });
        console.log(data);
        setGigs(data.gigs);
      } catch (err) {
        console.log(err);
      }
    };
    getUserGigs();
  }, []);

  return <div>index</div>;
};

export default index;
