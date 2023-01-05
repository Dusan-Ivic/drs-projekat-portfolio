import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";
import axios from "axios";
//portfolio ce biti samo transaction history/ a u portfolio ce biti grupisani svi transactions istog coina u jedan value
const Portfolio = () => {
  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteTransaction = (e) => {
    let id = e.target.getAttribute("id2");
    document.getElementById(id).remove();
    let a = axios.delete(`http://localhost:5000/api/transactions/${id}`);
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

  return (
    <div>
      {transactions.map((transaction) => (
        <div id={transaction["id"]["$oid"]} key={transaction["id"]["$oid"]}>
          <div>Type: {transaction.transaction_type}</div>
          <br></br>
          <div>Name: {transaction.crypto_currency}</div>
          {/* <div>Time: {transaction.timestamp}</div> */}
          <br></br>
          <div>Price: {transaction.price}</div>
          <br></br>
          <button id2={transaction["id"]["$oid"]} onClick={deleteTransaction}>
            Delete
          </button>
          <br></br>
          <br></br>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
