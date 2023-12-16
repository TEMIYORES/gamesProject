import Sidebar from "../../components/Sidebar";
import QuizContainer from "../../components/quizComponents/QuizContainer";
import { jsQuizz } from "./quizQuestions";

const Quiz = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-8 flex justify-center items-center font-mono text-foreground bg-gradient-to-r from-primary to-accent">
        <p>quiz</p>
        <QuizContainer questions={jsQuizz.questions} />
      </div>
    </div>
  );
};

export default Quiz;
