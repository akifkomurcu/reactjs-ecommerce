import React from "react";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div>
      admin Home <Outlet></Outlet>
    </div>
  );
}

export default Home;
