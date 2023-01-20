import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import "../index.css";

const baseUrl = "http://localhost:5000";

const Portfolio = () => {
  const { transactions } = useSelector((state) => state.transactions);

  const [isLoading, setIsLoading] = useState(false);
  const [calculations, setCalculations] = useState([]);
  const [totalBuy, setTotalBuy] = useState(0);
  const [totalSell, setTotalSell] = useState(0);

  useEffect(() => {
    const getCalculations = async () => {
      const res = await fetchCalculations();
      setCalculations(res.data);
      setTotalBuy(res["price_b"]);
      setTotalSell(res["price_s"]);
      setIsLoading(false);
    };

    getCalculations();
  }, [transactions]);

  const fetchCalculations = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(
      baseUrl + "/api/transactions/calculations",
      config
    );
    return res.data;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {calculations.length > 0 ? (
        <>
          {calculations.map((coin) => {
            return (
              <div id={coin["name"]} key={coin["name"]}>
                <div>
                  {coin.name}: Kupili ste {coin.amount_bought} koina, placeni su{" "}
                  {coin.bought}$. Prodali ste: {coin.amount_sold} koina. Ukupna
                  novcana vrednost prodatih koina je {coin.sold}$
                </div>
                <br></br>
                <hr />
              </div>
            );
          })}
          <div>Ukupno kupljeno: {totalBuy}</div>
          <div>Ukupno prodato: {totalSell}</div>
        </>
      ) : (
        <h1>No Transactions Found</h1>
      )}
    </div>
  );
};

export default Portfolio;
