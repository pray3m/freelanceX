import { SEARCH_GIGS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const search = () => {
  const router = useRouter();
  const { category, q } = router.query;
  const [gigs, setGigs] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${SEARCH_GIGS_ROUTE}?searchTerm=${q}&category=${category}`
        );
        console.log(data);
        setGigs(data.gigs);
      } catch (err) {
        console.log(err);
      }
    };

    if (category || q) getData();
  }, [category, q]);

  return <div>search</div>;
};

export default search;
