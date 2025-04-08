import React, { JSX } from "react";
import NavBar from "@/app/components/navBar";

export const HomePage = (): JSX.Element => {


  return (
    <main className="relative w-full h-screen bg-gray-900">
      <NavBar />
    </main>
  );
};

export default HomePage;