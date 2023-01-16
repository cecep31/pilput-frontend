import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl text-white font-bold">Hello there</h1>
          <p className="py-6 text-gray-400">
            My Name Cecep Januardi and i am Web Developer 
            <br></br>
            I am interested in Backend And Clound Computing
          </p>
          <Link href="/dashboard" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
