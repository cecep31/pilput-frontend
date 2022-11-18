import React from "react";
import Navigation from "../../components/header/Navigation";

export default function Login() {
  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
      <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <Navigation />
      </header>
      Login
    </main>
  );
}
