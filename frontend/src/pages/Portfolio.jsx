import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";

const Portfolio = () => {
  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <div key={transaction["id"]["$oid"]}>
          <div>Type: {transaction.transaction_type}</div>
          <br></br>
          <div>Name: {transaction.crypto_currency}</div>
          {/* <div>Time: {transaction.timestamp}</div> */}
          <br></br>
          <div>Price: {transaction.price}</div>
          <br></br>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
