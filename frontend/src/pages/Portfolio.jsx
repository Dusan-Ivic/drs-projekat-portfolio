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
    var uniqueCurrencies = [];
    let type = [];
    let crypto_currency = [];
    let price = [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    function calculations(){
        if(!isLoading){
            console.log(transactions);
            transactions.forEach(element => {
                let objectq = {crypto_currency:element.crypto_currency, price_buy:"", price_sell:"", type:element.transaction_type};
                if(!uniqueCurrencies.some(item=>item.crypto_currency === element.crypto_currency)){
                    if(objectq.type === 'TransactionType.BUY'){
                        objectq.price_buy = parseInt(element.price);
                        uniqueCurrencies.push(objectq);
                    } else if (objectq.type === 'TransactionType.SELL') {
                        objectq.price_sell = parseInt(element.price);
                        uniqueCurrencies.push(objectq);
                    }
                } else {
                    for(let i = 0; i < uniqueCurrencies.length; i++){
                        if(uniqueCurrencies[i].type  === 'TransactionType.BUY'){
                            uniqueCurrencies[i].price_buy += parseInt(element.price);
                        } else {
                            uniqueCurrencies[i].price_sell += parseInt(element.price);
                        }
                    }
                }
            console.log(uniqueCurrencies);
            return uniqueCurrencies;
        });
        }   
    }

    return(
        <>
            {/* <button onClick={calculations}>BUTTON</button> */}
            <div>
            {/* {transactions.map((transaction) => (
                <div id={transaction["id"]["$oid"]} key={transaction["id"]["$oid"]}>
                    <div>Type: {transaction.transaction_type}</div>
                </div>
            ))} */}
            {uniqueCurrencies.map((something) => (<div>SIOPADHJIOSADH</div>))}
            </div>
        </>
    )
}

export default Portfolio;