import { SEARCH_GIGS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchGridItem from "../components/search/SearchGridItem";
import { MagnifyingGlass } from "react-loader-spinner";

const search = () => {
  const router = useRouter();
  const { category, q } = router.query;
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${SEARCH_GIGS_ROUTE}?searchTerm=${q}&category=${category}`
        );
        console.log(data);
        setGigs(data.gigs);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (category || q) getData();
  }, [category, q]);

  if (loading)
    return (
      <div className="flex items-center justify-center text-5xl min-h-[76vh]">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );

  return (
    <div className="mx-24 mb-24">
      {q && (
        <h3 className="text-4xl mb-10">
          Results for <b>{q}</b>
        </h3>
      )}
      {category && (
        <h3 className="text-4xl mb-10">
          Results for <b>{category}</b>
        </h3>
      )}
      <div className="flex gap-4">
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Category
        </button>
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Budget
        </button>
        <button className="py-3 px-5 border border-gray-400 rounded-lg font-medium">
          Delivery Time
        </button>
      </div>
      <div>
        <div className="my-4">
          <span className="text-[#74767e] font-medium ">
            {gigs.length} services available
          </span>
        </div>
        <div className="grid grid-cols-4">
          {gigs.map((gig) => (
            <SearchGridItem gig={gig} key={gig.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default search;
