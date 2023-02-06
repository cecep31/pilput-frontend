import React, { useState, useEffect } from "react";
import Link from "next/link";
import router from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const [token, settoken] = useState(false);

  useEffect(() => {
    settoken(getCookie("token"));
  }, []);

  function handleLogout() {
    deleteCookie("token");
    router.push("/login");
  }

  // console.log(JSON.parse(islogged));

  return (
    <header className="z-30 flex items-center w-full sm:h-24">
      <div className="container flex items-center justify-between px-6 mx-auto">
        <div className="flex items-center text-3xl font-black text-gray-800 dark:text-white">
          <EnvelopeIcon className="h-6" />
          <span className="mt-1 ml-3 text-xs">cecepjanuardi31@gmail.com</span>
        </div>
        <div className="flex items-center">
          <nav className="items-center hidden text-lg text-gray-800 font-sen dark:text-white lg:flex">
            <Link href="/" className="flex px-6 py-2 hover:text-black">
              Home
            </Link>
            <Link href="/blog" className="flex px-6 py-2 hover:text-black">
              Blog
            </Link>
            <Link href="/chat" className="flex px-6 py-2 hover:text-black">
              Chat
            </Link>
            <Link href="/dashboard" className="flex px-6 py-2 hover:text-black">
              Dashbord
            </Link>
          </nav>
          <button className="flex flex-col ml-4 lg:hidden">
            <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white"></span>
            <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white"></span>
            <span className="w-6 h-1 mb-1 bg-gray-800 dark:bg-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
