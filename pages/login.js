import React from "react";
import { useState } from "react";
import Navigation from "../components/header/Navigation";
import axios from "axios";
import localforage from "localforage";
import router, { useRouter } from "next/router";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  // console.log(cookies.token);
  if (cookies.token) {
    return {
      redirect: {
        destination: "/",
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
  const router = useRouter();

  async function handleLogin() {
    var data = JSON.stringify({
      identity: username,
      password: password,
    });

    var config = {
      method: "post",
      url: "https://api.pilput.my.id/api/auth/login",
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data,
    };
    console.log(username);
    console.log(password);
    try {
      const response = await axios(config);
      if (response.status == 200) {
        nookies.set(null, "token", response.data.data);
        router.replace("/dashboard");
        router.pu
      }
    } catch (error) {
      console.log(error);
      alert("Username or password is wrong");
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
              lanjut aja login ngapain baca
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
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
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleLogin}
              className="py-3 w-64 text-xl text-white bg-gray-800 hover:bg-gray-900 rounded-2xl"
            >
              Login
            </button>
            {/* <p className="mt-4 text-sm">
              Already Have An Account?{" "}
              <span className="underline cursor-pointer"> Sign In</span>
            </p> */}
          </div>
        </div>
        <div className="w-40 h-40 absolute bg-black rounded-full top-0 right-12 hidden md:block"></div>
        <div className="w-20 h-40 absolute bg-black rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
      </div>
    </main>
  );
}
