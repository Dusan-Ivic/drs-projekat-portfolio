import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";
import axios from "axios";
import "../index.css";

const Portfolio = () => {
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState([]);
  const [netValues, setnetValues] = useState(0);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getTransactions());
    calculations();

    return () => {
      dispatch(reset);
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  function calculations() {
    var uniqueCurrencies = [];
    if (!isLoading) {
      console.log(transactions);
      var netw = 0;
      transactions.forEach((element) => {
        let temp = "";
        if (element.transaction_type == "TransactionType.BUY") {
          temp = "buy";
        } else {
          temp = "sell";
        }
        let objectq = {
          crypto_currency: element.crypto_currency,
          price_buy: "",
          price_sell: "",
          type: temp,
        };
        if (
          !uniqueCurrencies.some(
            (item) => item.crypto_currency === element.crypto_currency
          )
        ) {
          if (objectq.type === "buy") {
            objectq.price_buy = parseInt(element.price);
            netw = netw + parseInt(element.price);
            uniqueCurrencies.push(objectq);
          } else if (objectq.type === "sell") {
            objectq.price_sell = parseInt(element.price);
            uniqueCurrencies.push(objectq);
          }
        } else {
          for (let i = 0; i < uniqueCurrencies.length; i++) {
            if (uniqueCurrencies[i].type === "buy") {
              uniqueCurrencies[i].price_buy += parseInt(element.price);
              netw = netw + parseInt(element.price);
            } else if (uniqueCurrencies[i].type === "sell") {
              uniqueCurrencies[i].price_sell += parseInt(element.price);
            }
          }
        }
        console.log(uniqueCurrencies);
        setValues(uniqueCurrencies);
        setnetValues(netw);
      });
    }
  }

  return (
    <>
      <div>
        {values.map((something) => (
          <div>
            <div>1.{something.type}</div>
            <div>2. {something.price_buy}</div>
            <div>3. {something.price_sell}</div>
            <div>4. {something.crypto_currency}</div>
            <br></br>
          </div>
        ))}
      </div>
      <div>{netValues}$</div>
    </>
  );
};

export default Portfolio;
