import Sidebar from "../../components/Sidebar";
import QuizSettings from "./QuizSettings";
// import QuizContainer from "../../components/quizComponents/QuizContainer";
// import { jsQuizz } from "./quizQuestions";

const Quiz = () => {
  return (
    <div className="flex">
      <Sidebar />
      <QuizSettings />
    </div>
  );
};

export default Quiz;
