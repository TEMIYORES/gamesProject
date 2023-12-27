import { useSelector } from "react-redux";
import WheelComponent from "../../components/WheelComponent";
import {
  getSpinTheWheelSettings,
  initialType,
} from "../../slices/spinthewheelSettings";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft2, TickCircle } from "iconsax-react";
import { toast } from "react-toastify";

interface datatype {
  id: string;
  createDate: Date;
  segments: string[];
  segColors: string[];
  backgroundColor: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  spinnerColor: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  primaryColor: string;
  numberOfSpins: number;
  probability: {
    label: string;
    probability: number;
    coupon_code: string;
    isWin: string;
    color: string;
  }[];
  type: string;
}
const SpinTheWheel = () => {
  const onFinished = (winner: string) => {
    console.log(winner);
  };
  const spinTheWheelsettings: initialType | null = useSelector(
    getSpinTheWheelSettings
  );

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // This navigates back to the previous page
  };
  const publishGame = () => {
    let publishedGames: datatype[] | "" = "";
    if (localStorage.getItem("publishedGames")) {
      publishedGames = JSON.parse(localStorage.getItem("publishedGames") || "");
    }

    const data: datatype = {
      ...spinTheWheelsettings,
      createDate: new Date(),
      type: "Spin the wheel",
    };
    if (publishedGames) {
      const duplicateGame = publishedGames.filter(
        (game) => game.id === data.id
      );
      if (duplicateGame.length) {
        toast.success("Game already saved!");
        navigate("/");
        window.location.reload();
        return;
      }
      const updatedGames: datatype[] = [...publishedGames, data];
      const uniqueGames = Array.from(
        new Set(updatedGames.map((item) => item.id))
      ).map((id) => {
        return updatedGames.find((item) => item.id === id);
      });
      localStorage.setItem("publishedGames", JSON.stringify(uniqueGames));
      toast.success("Game published successfully");
      navigate("/");
      window.location.reload();
    } else {
      localStorage.setItem("publishedGames", JSON.stringify([data]));
      toast.success("Game published successfully");
      navigate("/");
      window.location.reload();
    }
  };
  const RenderComponent = () => {
    return (
      <div className="relative">
        <div
          className="absolute bg-white border border-slate-800 flex items-center top-[10%] left-[10%] px-4 py-2 rounded-md gap-2 cursor-pointer"
          onClick={goBack}
        >
          <ArrowLeft2 size="20" color="#000000" />
          Go Back
        </div>
        <div
          className="absolute bg-green-600 text-white border border-slate-800 flex items-center top-[10%] right-[10%] px-4 py-2 rounded-md gap-2 cursor-pointer"
          onClick={publishGame}
        >
          <TickCircle size="20" color="#ffffff" />
          Publish game
        </div>
        <WheelComponent
          segments={spinTheWheelsettings?.segments}
          segColors={spinTheWheelsettings?.segColors}
          onFinished={(winner: string) => {
            onFinished(winner);
          }}
          primaryColor={spinTheWheelsettings?.primaryColor}
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={200}
          upDuration={500}
          downDuration={600}
          fontFamily="Arial"
          id={""}
        />
      </div>
    );
  };
  return (
    <div className={`overflow-y-hidden`}>
      {spinTheWheelsettings.segments.length ? (
        <RenderComponent />
      ) : (
        <div className="w-full flex justify-center items-center">
          <span>
            No game settings{" "}
            <Link
              className="text-blue-600"
              to={"/campaigns/spin-the-wheel/settings"}
            >
              go to settings
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default SpinTheWheel;
