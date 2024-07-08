/* eslint-disable @next/next/no-img-element */
import React from "react";
import Star from "./Star";
export default function MenuCard({ name, rating, price }) {
  return (
    <div className="xl:w-1/4 md:w-1/4 p-4 ">
      <div className="flex flex-col items-center text-center h-full border-2 border-gray-200 border-opacity-60 rounded-lg  bg-white shadow-2xl">
        <img
          alt="team"
          className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
          src="/images/menu.jpg"
        />
        <div className="w-full">
          <h2 className="title-font font-medium text-lg text-gray-900">
            {name}
          </h2>
          <h3 className="text-gray-500 mb-3">Rupees-{price}</h3>
          {/* <span className="inline-flex"> */}
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="mr-1">
                <Star filled={index < rating} />
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
