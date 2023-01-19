import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { reset, transactions } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Spinner from "../components/Spinner";
import { createTransaction } from "../features/transactions/transactionSlice";

const notify = (err) => toast.error(err);

const CreateTransaction = () => {
  const [formData, setFormData] = useState({
    transaction_type: "",
    crypto_currency: "",
    timestamp: "",
    price: "",
    kolicina: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const test = 0;
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      notify(message);
    }

    if (isSuccess) {
      notify(message);
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validacija polja
    dispatch(createTransaction(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  //TO DO: ubaciti listu koina sa api.Ubaciti datum.
  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <label className="label">Select Coin:</label>
        <input
          type="text"
          name="crypto_currency"
          onChange={onChange}
          className="input"
        />

        <label className="label">Select Date:</label>
        <input
          type="text"
          name="timestamp"
          onChange={onChange}
          className="input"
        />

        <label className="label">Amount of coins bought:</label>
        <input
          type="number"
          name="kolicina"
          step="any"
          onChange={onChange}
          className="input"
        />
        <br></br>

        <label className="label">Price:</label>
        <input type="text" name="price" onChange={onChange} className="input" />

        <label>Buy?</label>
        <input
          type="radio"
          name="transaction_type"
          onChange={onChange}
          value="buy"
        />
        <br></br>
        <br></br>
        <label>Sell?</label>
        <input
          type="radio"
          name="transaction_type"
          onChange={onChange}
          value="sell"
        />
        <br></br>
        <br></br>
        <button type="submit" className="subBtn">
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default CreateTransaction;
