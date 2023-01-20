import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";
import axios from "axios";

const baseUrl = "http://localhost:5000";
const token = localStorage.getItem("access_token");

//portfolio ce biti samo transaction history/ a u portfolio ce biti grupisani svi transactions istog coina u jedan value
const TransactionHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteTransaction = (e) => {
    let id = e.target.getAttribute("id2");
    document.getElementById(id).remove();

    let a = axios.delete(
      `http://localhost:5000/api/transactions/${id}`,
      config
    );
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getTransactions());

    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset);
    };
  }, [user, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  //TO DO: Treba da vraca samo buy ili sell // ubaciti datum
  return (
    <div>
      {transactions.map((transaction) => (
        <div id={transaction["id"]["$oid"]} key={transaction["id"]["$oid"]}>
          <div>Coin Name: {transaction.crypto_currency}</div>
          <br></br>
          <div>Type of transaction: {transaction.transaction_type}</div>
          {/* <div>Time: {transaction.timestamp}</div> */}
          <br></br>
          <div>Price at the time of transaction: {transaction.price}$</div>
          <br></br>
          <button
            className="delBtn"
            id2={transaction["id"]["$oid"]}
            onClick={deleteTransaction}
          >
            Delete Transaction
          </button>
          <br></br>
          <br></br>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
