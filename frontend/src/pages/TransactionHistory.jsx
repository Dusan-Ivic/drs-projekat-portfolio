import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getTransactions,
  deleteTransaction,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getTransactions());

    return () => {
      dispatch(reset);
    };
  }, [user, isError, message, dispatch, navigate]);

  const deleteTransactionEvent = (e) => {
    const transactionId = e.target.name;

    dispatch(deleteTransaction(transactionId));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {transactions.length > 0 ? (
        <>
          {transactions.map((transaction) => (
            <div id={transaction["id"]["$oid"]} key={transaction["id"]["$oid"]}>
              <div>Coin Name: {transaction.crypto_currency}</div>
              <br></br>
              <div>Type of transaction: {transaction.transaction_type}</div>
              <div>Time: {transaction.timestamp.$date}</div>
              <br></br>
              <div>Price at the time of transaction: {transaction.price}$</div>
              <br></br>
              <button
                className="delBtn"
                name={transaction["id"]["$oid"]}
                onClick={deleteTransactionEvent}
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
