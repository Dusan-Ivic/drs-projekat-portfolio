import { useSelector } from "react-redux";

const Portfolio = () => {
  const { transactions } = useSelector((state) => state.transactions);

  return (
    <div>
      <div>Type: {transactions[0].data.transaction_type}</div>
      <br></br>
      <div>Name: {transactions[0].data.crypto_currency}</div>
      <div>Time: {transactions[0].data.timestamp}</div>
      <br></br>
      <div>Price: {transactions[0].data.price}</div>
      <div>IdOfUser: {transactions[0].data.userid}</div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Portfolio;
