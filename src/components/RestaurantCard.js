/* eslint-disable @next/next/no-img-element */
import React from "react";
import Star from "./Star";
export default function RestaurantCard({
  name,
  description,
  rating,
  action,
  location,
}) {
  return (
    <div
      onClick={() => {
        action ? action() : null;
      }}
      className="p-4 md:w-1/3 hover:cursor-pointer "
    >
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg bg-white shadow-2xl overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          // src="/images/resto.jpg"
          alt="image"
        />

        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            Hotel
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 ">
            {name}
          </h1>
          <p
            className="text-gray-500
          "
          >
            {description}
          </p>
          <div className="flex my-2">
            <a>
              <svg
                className="h-6 w-6 text-orange-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="12" cy="11" r="3" />{" "}
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
              </svg>
            </a>
            <p className="leading-relaxed mb-3">{location}</p>
          </div>

          <div className="flex items-center flex-wrap ">
            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              Menu
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>

            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1  border-gray-200">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className="mr-1">
                  <Star filled={index < rating} />
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
