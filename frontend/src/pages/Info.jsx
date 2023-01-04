import { Link } from "react-router-dom";
import CoinDetail from "../components/CoinDetail";
import HistoryChart from "../components/HistoryChart";
import { useParams } from "react-router-dom";

const Info = () => {
  var coinName = useParams();

  return (
    <div className="wrapper-container mt-10">
      <Link to={"/transactions/" + coinName.id}>
        <button>
          New page
        </button>
      </Link>
      <HistoryChart />
      <CoinDetail />
    </div>
  );
};
export default Info;
