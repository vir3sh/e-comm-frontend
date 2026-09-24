import React, { useEffect } from "react";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import { toast } from "react-toastify";

const Home = () => {
  return (
    <div className="max-w-7xl m-auto">
      <LatestCollection />

      <BestSeller />
    </div>
  );
};

export default Home;
