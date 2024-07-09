import { remove } from "@/lib/windows/utils";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <header className="text-gray-600 body-font  ">
      <div className="container bg-zinc-200 fixed top-0   mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">FOODIEDELIGHT</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link
            href="/restaurants/listRestaurants"
            className={classNames(
              "mr-5 py-2 px-6 focus:outline-none rounded text-lg",
              {
                "bg-indigo-500 border-0 text-white hover:bg-indigo-600":
                  router.pathname === "/restaurants/listRestaurants",
                "bg-white text-black-800 border border-1 border-zinc-400 hover:bg-slate-400 hover:text-white":
                  router.pathname !== "/restaurants/listRestaurants",
              }
            )}
          >
            Restaurants
          </Link>

          <Link
            className={classNames(
              "mr-5 py-2 px-6 focus:outline-none rounded text-lg",
              {
                "bg-indigo-500 border-0 text-white hover:bg-indigo-600":
                  router.pathname === "/restaurants/addNewRestaurants",
                "bg-white text-black-800 border border-1 border-zinc-400 hover:bg-slate-400 hover:text-white":
                  router.pathname !== "/restaurants/addNewRestaurants",
              }
            )}
            href={"/restaurants/addNewRestaurants"}
          >
            {" "}
            Add Restaurant
          </Link>
        </nav>
        <button
          onClick={() => {
            remove("userData");
            router.push("/");
          }}
          className="inline-flex items-center text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-800 rounded text-lg"
        >
          Logout
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
