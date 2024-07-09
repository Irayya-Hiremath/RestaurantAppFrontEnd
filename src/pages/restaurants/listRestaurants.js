import React, { Component, useEffect, useState, useLayoutEffect } from "react";
import { getListOfRestaurants } from "@/lib/api/restaurant/restaurants";
import NavBar from "@/components/NavBar";
import RestaurantCard from "@/components/RestaurantCard";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/Auth/auth.js";

export default function Restaurants() {
  const [restaurantLists, setRestaurantsLists] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const getRestaurantsList = async () => {
    try {
      setLoader(true);
      const result = await getListOfRestaurants();
      console.log("result", result);
      if (result?.status === 200 && result?.data?.length > 0) {
        setRestaurantsLists(result?.data);
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoader(false);
    }
  };
  useEffect(() => {
    getRestaurantsList();
  }, []);

  useLayoutEffect(() => {
    checkAuth(router);

    return undefined;
  }, [router]);
  const restaurantDetails = (id) => {
    router.push({
      pathname: `/restaurants/restaurantDetails`,
      query: { id: id },
    });
  };
  return (
    <div>
      <NavBar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {loader ? (
            <div className="container w-1 px-5 py-24 mx-auto">loading...</div>
          ) : (
            <div className="flex flex-wrap -m-4">
              {restaurantLists.length > 0 ? (
                restaurantLists.map((el) => {
                  return (
                    <RestaurantCard
                      key={el.id}
                      name={el.hotel_name}
                      description={el.description}
                      rating={el.rating}
                      location={el.location}
                      action={() => {
                        restaurantDetails(el._id);
                      }}
                    />
                  );
                })
              ) : (
                null
              )}
            </div>
          )}
          <div className="flex flex-wrap -m-4">
            {restaurantLists.length === 0 && loader === false ? (
              <div className=" w-100 px-5 py-24 mx-auto">
                <h1>There is no Restaurants to list Add the Restaurants</h1>
                <button
                  onClick={() => {
                    router.push("/restaurants/addNewRestaurants");
                  }}
                  className="w-full my-8 mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Add Restaurant
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
