import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import QuizContainer from "../../components/quiz/QuizContainer";
import { ArrowLeft2, TickCircle } from "iconsax-react";
import { toast } from "react-toastify";
import { getQuizData, quizType } from "../../slices/quiz";

const QuizGame = () => {
  const quizSetting = useSelector(getQuizData);
  const navigate = useNavigate();
  const publishGame = () => {
    let publishedGames: quizType[] | "" = "";
    if (localStorage.getItem("publishedGames")) {
      publishedGames = JSON.parse(localStorage.getItem("publishedGames") || "");
    }

    const data: quizType = {
      ...quizSetting,
      createDate: new Date(),
      type: "Quiz",
    };
    if (publishedGames) {
      const duplicateGame = publishedGames.filter(
        (game: quizType) => game.id === data.id
      );
      if (duplicateGame.length) {
        toast.success("Game already saved!");
        navigate("/");
        window.location.reload();
        return;
      }
      const updatedGames: quizType[] = [...publishedGames, data];
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
  const goBack = () => {
    navigate(-1); // This navigates back to the previous page
  };
  return (
    <>
      {!(quizSetting.questions[0].question === "") ? (
        <>
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
          <QuizContainer
            questions={quizSetting.questions}
            backgroundColor={quizSetting.background.color}
            cardColor={quizSetting.cardColor}
            timeLimit={quizSetting.timeLimit}
          />
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <span>
            No game settings{" "}
            <Link className="text-blue-600" to={"/campaigns/quiz/settings"}>
              go to settings
            </Link>
          </span>
        </div>
      )}
    </>
  );
};

export default QuizGame;
