import React, { useState, useEffect } from "react";

import config from "./config";
import axios from "axios";
import ProductCard from "./components/ProductCard";
const { BACKEND_URL } = config;

export default function LandingPage() {
  let [isLoading, setIsLoading] = useState(true);
  let [prices, setPrices] = useState([]);

  useEffect(async () => {
    let response = await axios.get(`${BACKEND_URL}/stripe/prices`);
    setPrices(response.data.data);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  } else {
    return (
      <div>
        <h1>Give Caleb Money</h1>
        <div style={{ display: "flex" }}>
          {prices.map((price) => (
            <div style={{ margin: "10px" }}>
              <ProductCard price={price} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
