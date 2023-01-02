import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../index.css";
const Info = () => {
  const [coin, setCoin] = useState([]);
  const name = useParams();

  useEffect(() => {
    const fetchById = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/" + name.id);
      const data = await res.json();
      console.log(data.data);
      setCoin(data.data);
    };

    fetchById();
  });

  return (
    <>
      <div>Id: {coin.id}</div>
      <br></br>
      <div>priceUsd: {coin.priceUsd}</div>
    </>
  );
};
export default Info;
