import axios from "axios";

//const baseUrl = "http://localhost:5000";
const baseUrl = "";

const createTransaction = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(
    baseUrl + `/api/transactions`,
    transactionData,
    config
  );
  return res.data;
};

const getTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(baseUrl + `/api/transactions`, config);
  return res.data;
};

const deleteTransaction = async (transactionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(
    baseUrl + `/api/transactions/${transactionId}`,
    config
  );
  return res.data;
};

const transactionService = {
  createTransaction,
  getTransactions,
  deleteTransaction,
};

export default transactionService;
