import React from "react";
import { useState } from "react";
import Navigation from "../../components/header/Navigation";
import localforage from "localforage"

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  async function handleLogin() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      identity: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    var token = "";
    fetch("https://gobackend-api.onrender.com/api/auth/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let nejson = JSON.parse(result)
        token = nejson.data; 
        // console.log(token); 
        // window.localStorage.setItem("token", token)
        localforage.setItem("token",token)
        alert(localforage.getItem("token"))
      })
      .catch((error) => console.log("error", error));
    // console.log(token);
    
  }

  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
      {/* <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <Navigation />
      </header> */}

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
