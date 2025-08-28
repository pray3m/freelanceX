import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useStateProvider } from "../../context/StateContext";

const Reviews = () => {
  const [{ gigData }] = useStateProvider();
  const [averageRatings, setAverageRatings] = useState("0");

  useEffect(() => {
    if (gigData) {
      let avgRating = 0;
      gigData.reviews.map(({ rating }) => {
        avgRating += rating;
      });
      setAverageRatings((avgRating / gigData.reviews.length).toFixed(1));
    }
  }, [gigData]);

  return (
    <div>
      {gigData && (
        <div className="mb-10">
          <h3 className="text-2xl my-5 font-normal text-[#404145]">Reviews</h3>
          <div className="flex gap-3 mb-5">
            <h5>{gigData?.reviews?.length} reviews for this gig</h5>
            <div className="flex text-yellow items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${
                      Math.ceil(averageRatings) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    } `}
                  />
                ))}
              </div>
              <span className="text-yellow-700 font-medium">
                {averageRatings}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {gigData?.reviews?.map((review) => (
              <div className="flex gap-3 border-t pt-6" key={review.id}>
                <div>
                  {review.reviewer.profileImage ? (
                    <Image
                      src={review.reviewer.profileImage}
                      alt="profile"
                      height={40}
                      width={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
                      <span className="text-xl text-white">
                        {review.reviewer.email[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h4> {review?.reviewer?.fullName} </h4>
                  <div className="flex text-yellow-500 items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${
                            review.rating >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } `}
                        />
                      ))}
                    </div>
                    <span className="text-yellow-700 font-medium">
                      {review?.rating}
                    </span>
                  </div>
                  <p className="text-[#404145] pr-20">{review?.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
