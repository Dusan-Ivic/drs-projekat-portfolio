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
    transaction_type: "buy",
    crypto_currency: "",
    timestamp: "",
    price: "",
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
    //validacija polja
    dispatch(createTransaction(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="form">
      <div>
        <h1>KUPUJEMPRODAJEMBRATE</h1>
      </div>
      <form onSubmit={onSubmit}>
        <label className="label">COIN NAME</label>
        <input
          type="text"
          name="crypto_currency"
          onChange={onChange}
          className="input"
        />

        <label className="label">timestamp</label>
        <input
          type="text"
          name="timestamp"
          onChange={onChange}
          className="input"
        />

        <label className="label">CENA</label>
        <input type="text" name="price" onChange={onChange} className="input" />
        <button type="submit" className="subBtn">
          Submit
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default CreateTransaction;
