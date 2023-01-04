import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Skeleton from "../components/Skeleton";

const Transactions = () =>{
    const { id } = useParams();
    const { response } = useAxios(
        `coins/${id}`
    );
    console.log(response);
    
    if (!response) {
        return (
          <div className="wrapper-container mt-8">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-72 w-full mb-10" />
          </div>
        );
      }

    return (
        <>
           <h1>
            {/* Coin Name 
            Coin cena 
            Quantity input field 
            Buy button / Whatever */}
           </h1>
           <div>
                Name: {response.id} <br></br>
                Price: {response.market_data.current_price.usd}<br></br>
                <input placeholder="value to buy"></input>
                <button>

                </button>
                {/* {response && response.map((value) => value.id)} */}
            </div>
        </>
    );
}

export default Transactions;