import Sidebar from "../../components/Sidebar";
import wheelImage from "../../assets/wheel.png";
import moment from "moment";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setSpinTheWheelSettings } from "../../slices/spinthewheelSettings";
interface datatype {
  id: string;
  createDate: Date;
  segments: string[];
  segColors: string[];
  backgroundColor: string;
  spinnerColor: string;
  primaryColor: string;
  numberOfSpins: number;
  probability: {
    label: string;
    percentage: number;
  }[];
  type: "Spin the wheel";
}
const Home = () => {
  let publishedGames: datatype[] | "" = "";

  if (localStorage.getItem("publishedGames")) {
    publishedGames = JSON.parse(localStorage.getItem("publishedGames") || "");
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGameLoad = (game: datatype) => {
    dispatch(setSpinTheWheelSettings(game));
    navigate("/campaigns/spin-the-wheel");
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-8">
        <p className="text-xl font-bold mb-5">Dashboard</p>
        <div className="grid grid-cols-4 justify-between gap-4">
          {publishedGames ? (
            publishedGames.map((game) => {
              return (
                <div
                  className="bg-white p-2 rounded-md cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleGameLoad(game)}
                >
                  <img src={wheelImage} className="w-32" />
                  <p className="mb-2">
                    <span className="font-bold">GAME TYPE:</span> {game.type}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">CONTENT:</span>{" "}
                    {game.segments.join(", ")}
                  </p>
                  <p>
                    <span className="font-bold">TIME:</span>{" "}
                    {moment(game.createDate).fromNow()}
                  </p>
                </div>
              );
            })
          ) : (
            <div>No games</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
