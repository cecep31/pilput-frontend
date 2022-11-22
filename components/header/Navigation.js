import React, { useState, useEffect } from "react";
import Link from "next/link";
import nookies, { parseCookies } from "nookies";
import router from "next/router";

export default function Navigation() {
  const [islogged, setislogged] = useState();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.token) {
      setislogged(true);
    } else {
      setislogged(false);
    }
  }, []);
  function handleLogout() {
    nookies.destroy(null, "token");
    router.push("/login");
  }

  // console.log(JSON.parse(islogged));

  return (
    <div className="container mx-auto px-6 flex items-center justify-between">
      <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
        pilput
      </div>
      <div className="flex items-center">
        <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
          <Link
            href="/"
            className="py-2 px-6 flex text-indigo-500 border-b-2 border-indigo-500"
          >
            Home
          </Link>

          <Link href="#" className="py-2 px-6 flex hover:text-indigo-500">
            Watch
          </Link>
          <Link href="#" className="py-2 px-6 flex hover:text-indigo-500">
            Product
          </Link>
          <Link href="#" className="py-2 px-6 flex hover:text-indigo-500">
            Contact
          </Link>
          <Link href="#" className="py-2 px-6 flex hover:text-indigo-500">
            Carrer
          </Link>
        </nav>
        <button className="lg:hidden flex flex-col ml-4">
          <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
          <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
          <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
        </button>
      </div>
      <div>
        {islogged ? (
          <Link
            href="/dashboard"
            className="bg-gray-500 px-5 py-2 rounded-lg hover:bg-gray-600 text-white"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
