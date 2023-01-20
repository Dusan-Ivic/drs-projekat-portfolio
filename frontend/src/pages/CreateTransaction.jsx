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
    price: 0,
    kolicina: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    if (!formData.crypto_currency) {
      notify("Crypto currency name is required");
      return;
      // } else if (!formData.timestamp) {
      //   notify("Timestamp is required");
      //   return;
    } else if (formData.kolicina <= 0) {
      notify("Amount should be a positivie number");
      return;
    } else if (formData.price <= 0) {
      notify("Price should be a positivie number");
      return;
    } else if (!formData.transaction_type) {
      notify("Transaction type is required");
      return;
    }

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
          min={0}
          onChange={onChange}
          className="input"
        />
        <br></br>

        <label className="label">Price:</label>
        <input
          type="number"
          name="price"
          min={0}
          onChange={onChange}
          className="input"
        />
        <br></br>

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
