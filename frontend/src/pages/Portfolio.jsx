import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getTransactions,
  getTransactionsCalculation,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";
import axios from "axios";
import "../index.css";

const baseUrl = "http://localhost:5000";
const token = localStorage.getItem("access_token");

const Portfolio = () => {
  const { isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();
  const [resp, setResp] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    axios
      .get(baseUrl + `/api/transactions/calculations`, config)
      .then((response) => setResp(response.data));

    return () => {
      dispatch(reset);
    };
  }, [isError, message, dispatch]);

  if (resp.length == 0) {
    return <Spinner />;
  }

  console.log(resp);

  return (
    <>
      <div>
        {resp.data.map((res) => (
          <div id={res["name"]} key={res["name"]}>
            <div>
              {res.name}: Kupili ste {res.amount_bought} koina, placeni su{" "}
              {res.bought}$. Prodali ste: {res.amount_sold} koina. Ukupna
              novcana vrednost prodatih koina je {res.sold}$
            </div>
            <br></br>
            <hr />
          </div>
        ))}
      </div>
      <div>Ukupno kupljeno: {resp.price_b}</div>
      <div>Ukupno prodato: {resp.price_s}</div>
    </>
  );
};

export default Portfolio;
