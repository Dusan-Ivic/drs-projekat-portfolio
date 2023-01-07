import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import Spinner from "../components/Spinner";
import axios from "axios";

const Portfolio = () => {
    const { transactions, isLoading, isError, message } = useSelector(
        (state) => state.transactions
      );
    var checkedCoins = [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
          console.log(message);
        }
    
        dispatch(getTransactions());
    
    
        return () => {
          dispatch(reset);
        };
      }, [isError, message, dispatch]);
    
      if (isLoading) {
        return <Spinner />;
      }

    
    const calculations = () => {
        // transactions.map((transaction) => ())


        let allTransactionName =  transactions.map((transaction) => (transaction["crypto_currency"]))
        console.log(allTransactionName);
        
        // checkedCoins.push(temp)
        // console.log(checkedCoins[0]);

    }
    console.log(transactions)

    return(
        <>
            <button onClick={calculations}>BUTTON</button>
            <div onLoad={calculations}>
            {transactions.map((transaction) => (
                <div id={transaction["id"]["$oid"]} key={transaction["id"]["$oid"]}>
                    <div>Type: {transaction.transaction_type}</div>
                </div>
            ))}
            </div>
        </>
    )
}

export default Portfolio;