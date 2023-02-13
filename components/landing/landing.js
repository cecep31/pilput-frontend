import Link from "next/link";
import React from "react";
import Navigation from "../header/Navigation";

const Landing = () => {
  return (
    <main className="relative h-screen overflow-hidden font-mono bg-white dark:bg-gray-800">
      <div className="absolute hidden md:block -bottom-32 -left-32 w-96 h-96 text-blue-500">
        
       
      </div>
      <div className="relative z-20 h-full flex items-center">
        <div className="container relative flex flex-col mb-36 items-center justify-between px-6 py-4 mx-auto">
          <div className="flex flex-col items-center h-full">
            <p className="my-6 text-3xl text-center dark:text-white">
              Hi, I&#x27;m Cecep
            </p>
            <h2 className="max-w-3xl py-2 mx-auto text-5xl font-bold text-center text-gray-800 md:text-6xl dark:text-white">
              Programmer
            </h2>
            <div className="flex items-center justify-center mt-4">
              <a
                href="#"
                className="px-4 py-2 my-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 md:mt-16 dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 dark:text-white hover:bg-gray-800 hover:text-white text-md"
              >
                CONNECT WITH ME
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
