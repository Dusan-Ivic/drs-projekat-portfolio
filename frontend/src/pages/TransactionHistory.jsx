import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";
import axios from "axios";

const TransactionHistory = () => {
  const dispatch = useDispatch();

  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getTransactions());

    return () => {
      dispatch(reset);
    };
  }, [isError, message, dispatch]);

  const deleteTransaction = async (e) => {
    const token = localStorage.getItem("access_token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let id = e.target.getAttribute("id2");
    document.getElementById(id).remove();

    await axios.delete(`http://localhost:5000/api/transactions/${id}`, config);
  };

  if (isLoading) {
    return <Spinner />;
  }

  //TO DO: Treba da vraca samo buy ili sell // ubaciti datum
  return (
    <div>
      {transactions.length > 0 ? (
        <>
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
        </>
      ) : (
        <h1>No Transactions Found</h1>
      )}
    </div>
  );
};

export default TransactionHistory;
