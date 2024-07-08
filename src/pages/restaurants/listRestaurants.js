import React, { Component, useEffect, useState, useLayoutEffect } from "react";
import { getListOfRestaurants } from "@/lib/api/restaurant/restaurants";
import NavBar from "@/components/NavBar";
import RestaurantCard from "@/components/RestaurantCard";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/Auth/auth.js";

export default function Restaurants() {
  const [restaurantLists, setRestaurantsLists] = useState([]);
  const router = useRouter();
  const getRestaurantsList = async () => {
    try {
      const result = await getListOfRestaurants();
      console.log("result", result);
      if (result?.status === 200 && result?.data?.length > 0) {
        setRestaurantsLists(result?.data);
      }
    } catch (error) {
      console.log('error',error)
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
      <NavBar/>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {restaurantLists.length > 0
              ? restaurantLists.map((el) => {
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
              : "loading"}
          </div>
        </div>
      </section>
    </div>
  );
}
