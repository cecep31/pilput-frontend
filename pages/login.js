import React from "react";
import { useState } from "react";
import Navigation from "../components/header/Navigation";
import axios from "axios";
import localforage from "localforage";
import router, { useRouter } from "next/router";
import { setCookie,getCookie } from "cookies-next";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  const token = getCookie("token");
  // console.log(cookies.token);
  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loginwait, setloginwait] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    console.log("hahah");
    setloginwait(true);
    // console.log(username);
    // console.log("loginwait");
    // console.log(password);
    var data = JSON.stringify({
      identity: username,
      password: password,
    });

    var config = {
      method: "post",
      url: "https://api.pilput.my.id/api/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios(config);
      if (response.status == 200) {
        // nookies.set(null, "token", response.data.data);
        setCookie("token", response.data.data);
        router.replace("/dashboard");
        setloginwait(false);
      }
    } catch (error) {
      console.log(error);
      alert("Username or password is wrong");
      setloginwait(false);
    }
  }

  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
      <div className="min-h-screen flex justify-center items-center">
        <div className="absolute w-60 h-60 rounded-xl bg-black -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
        <div className="absolute w-48 h-48 rounded-xl bg-black -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Sign in
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Lanjut aja login, ngapain baca<br></br>
            </p>
          </div>
          <div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              />

              <div className="flex justify-center mt-6">
                {loginwait ? (
                  <button
                    type="button"
                    className="btn btn-wide flex justify-center items-center  bg-gray-800 hover:bg-gray-900 focus:ring-gray-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-2xl "
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="mr-2 animate-spin"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                    loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-xl btn btn-wide text-white bg-gray-800 hover:bg-gray-900 rounded-2xl"
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
            <p className="text-center mt-3 text-black">username: <strong>admin</strong>; password: <strong>admin</strong></p>
            <div className="text-center">

            <Link className="ink link-info " href="/">Back</Link>
            </div>
          </div>
        </div>
        <div className="w-40 h-40 absolute bg-black rounded-full top-0 right-12 hidden md:block"></div>
        <div className="w-20 h-40 absolute bg-black rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </main>
  );
}
