/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect,useLayoutEffect } from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NavBar from "./NavBar";
import {
  addRestaurant,
  getDetailOfRestaurants,
  updateRestaurant,
} from "@/lib/api/restaurant/restaurants";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { checkAuth } from "@/Auth/auth.js";


const schema = yup.object().shape({
  hotel_name: yup.string().required("Hotel name is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  rating: yup.number().min(1).max(5).required("Rating is required"),
  menu: yup.array().of(
    yup.object().shape({
      dish_name: yup.string().required("Dish name is required"),
      price: yup.number().min(10).required("Price is required"),
      rating: yup.number().min(1).max(5).required("Rating is required"),
    })
  ),
});
export default function CreateRestaurant() {
  const router = useRouter();

  const { id } = router.query;

  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hotel_name: "",
      description: "",
      location: "",
      rating: "",
      menu: [{ dish_name: "", price: 0, rating: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menu",
  });
  const handleAddDish = async () => {
    const isValid = await trigger("menu");
    if (isValid) {
      append({ dish_name: "", price: 0, rating: 0 });
    }
  };
  const getRestaurantData = async (id) => {
    try {
      const result = await getDetailOfRestaurants(id);
      // console.log("result", result);
      if (result?.status === 200 && result?.data) {
        const lineItems =
          result.data.menu.length > 0 &&
          result.data.menu.map((el) => {
            return {
              dish_name: el.dish_name,
              price: el.price,
              rating: el.rating,
            };
          });
        const data = {
          hotel_name: result.data.hotel_name,
          description: result.data.description,
          location: result.data.location,
          rating: result.data.rating,
          menu: lineItems,
        };
        reset(data);
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
  const onSubmit = async (data) => {
    if (id) {
      try {
        const result = await updateRestaurant(data, id);
        if (result?.status === 200) {
          router.push("/restaurants/listRestaurants");
          toast.success("Restaurant added Successfully");
          reset(defaultValues)
        } else {
          // router.push("/");
        }
      } catch (error) {
        console.log("err", error);
      }
    } else {
      try {
        const result = await addRestaurant(data);
        if (result?.status === 200) {
          router.push("/restaurants/listRestaurants");
          toast.success("Restaurant updated Successfully");
          reset(defaultValues)

        } else {
          // router.push("/");
        }
      } catch (error) {
        console.log("err", error);
      }
    }
  };
  useLayoutEffect(() => {
    checkAuth(router);

    return undefined;
  }, [router]);
  return (
    <>
      <NavBar />
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap ">
        <ToastContainer />

        <div className="lg:w-[80%] md:w-[80%] bg-white flex flex-col md:m-auto w-full md:py-8 mt-8 md:mt-0 border border-1 p-4 rounded-lg bg-white shadow-2xl ">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            {id?'Update Restaurant Details':'Add New Restaurant'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
                <label className="block">Hotel Name</label>
                <input
                  {...register("hotel_name")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.hotel_name && (
                  <p className="text-red-500">{errors.hotel_name.message}</p>
                )}
              </div>
              <div className="w-full lg:w-1/2 px-3">
                <label className="block">Description</label>
                <input
                  {...register("description")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full lg:w-1/2 px-3 mb-6 lg:mb-0">
                <label className="block">Location</label>
                <input
                  {...register("location")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.location && (
                  <p className="text-red-500">{errors.location.message}</p>
                )}
              </div>
              <div className="w-full lg:w-1/2 px-3">
                <label className="block">Rating out of 5</label>
                <input
                  {...register("rating")}
                  type="number"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.rating && (
                  <p className="text-red-500">{errors.rating.message}</p>
                )}
              </div>
            </div>
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Add Menu Items
            </h2>

            {fields.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-wrap  items-center justify-between "
              >
                <div className="w-full lg:w-1/4 px-3 mb-6 lg:mb-0">
                  <label className="block">Dish Name</label>
                  <input
                    {...register(`menu.${index}.dish_name`)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.menu?.[index]?.dish_name && (
                    <p className="text-red-500">
                      {errors.menu[index].dish_name.message}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-1/4 px-3 mb-6 lg:mb-0">
                  <label className="block">Price</label>
                  <input
                    {...register(`menu.${index}.price`)}
                    type="number"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.menu?.[index]?.price && (
                    <p className="text-red-500">
                      {errors.menu[index].price.message}
                    </p>
                  )}
                </div>
                <div className="w-full h-20 lg:w-1/4 px-3 mb-6 lg:mb-0">
                  <label className="block">Rating</label>
                  <input
                    {...register(`menu.${index}.rating`)}
                    type="number"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.menu?.[index]?.rating && (
                    <p className="text-red-500">
                      {errors.menu[index].rating.message}
                    </p>
                  )}
                </div>
                <div className="w-full lg:w-1/4 px-3 flex items-center">
                  <button
                    disabled={fields.length === 1 ? true : false}
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white rounded p-2 mr-2"
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
            <div className="flex justify-center">
            <button
                    type="button"
                    onClick={handleAddDish}
                    className="bg-green-500 text-white rounded p-2"
                  >
                    Add Dish
                  </button>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 px-4 mx-4"
            >
              {id?'Update':'Save'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
