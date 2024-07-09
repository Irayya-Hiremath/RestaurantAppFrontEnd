import { React, useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";

import {
  getDetailOfRestaurants,
  deleteRestaurant,
} from "@/lib/api/restaurant/restaurants";
import MenuCard from "@/components/MenuCard";
import RestaurantCard from "@/components/RestaurantCard";
import NavBar from "@/components/NavBar";
import { checkAuth } from "@/Auth/auth.js";

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [restaurantDetail, setRestaurantDetail] = useState([]);
  const getRestaurantData = async (id) => {
    try {
      const result = await getDetailOfRestaurants(id);
      console.log("result", result);
      if (result?.status === 200 && result?.data) {
        setRestaurantDetail(result?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteRestaurantData = async (id) => {
    try {
      const result = await deleteRestaurant(id);
      console.log("result", result);
      if (result?.status === 200) {
        setRestaurantDetail(result?.data);
        router.push("/restaurants/listRestaurants");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (id) {
      getRestaurantData(id);
    }
  }, []);
  const updateRestaurantDetails = (id) => {
    router.push({
      pathname: `/restaurants/addNewRestaurants`,
      query: { id: id },
    });
  };

  useLayoutEffect(() => {
    checkAuth(router);

    return undefined;
  }, [router]);
  return (
    <section className="text-gray-600 body-font">
      <NavBar />
      {restaurantDetail ? (
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <RestaurantCard
              name={restaurantDetail?.hotel_name}
              description={restaurantDetail?.description}
              rating={restaurantDetail?.rating}
              location={restaurantDetail.location}
            />
            <div className="flex flex-col md:flex-row md:flex-wrap">
              <button
                onClick={() => {
                  updateRestaurantDetails(restaurantDetail._id);
                }}
                className="w-full md:w-auto mx-auto my-2 md:my-0 md:mx-2 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Add & Update
              </button>
              <button
                onClick={() => {
                  deleteRestaurantData(restaurantDetail._id);
                }}
                className="w-full md:w-auto mx-auto my-2 md:my-0 md:mx-2 text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded text-lg"
              >
                Delete Restaurant
              </button>
            </div>
          </div>

          <div className="flex flex-wrap">
            {restaurantDetail?.menu?.length > 0
              ? restaurantDetail?.menu?.map((el) => {
                  return (
                    <MenuCard
                      key={el?._id}
                      name={el?.dish_name}
                      rating={el?.rating}
                      price={el?.price}
                    />
                  );
                })
              : null}
          </div>
        </div>
      ) : (
        <div className="container w-1 px-5 py-24 mx-auto">loading...</div>
      )}
    </section>
  );
}
