import { useState } from "react";
import { resultInitialState } from "../../screens/quiz/quizQuestions";
import AnswerTimer from "./answerTimer/AnswerTimer";

interface quizQuestionsType {
  questions: {
    question: string;
    choices: string[];
    type: string;
    correctAnswer: string;
  }[];
}

const QuizContainer: React.FC<quizQuestionsType> = ({ questions }) => {
  // let [containerTopOffset, setcontainerTopOffset] = useState<string>(
  //   "calc(100vh - 100px)"
  // );
  // useState(() => {
  //   window.onload = () => {
  //     const container = document.getElementById("quiz-container");
  //     console.log(container?.offsetTop);
  //     if (container != undefined) {
  //       const remainingHeight = window.innerHeight - container?.offsetTop;
  //       setcontainerTopOffset(`calc(${remainingHeight})px`);
  //     }
  //   };
  // });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { question, choices, correctAnswer } = questions[currentQuestion];
  const [answerIndex, setAnswerIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const styles = {
    customButton:
      "bg-gradient-to-r from-primary to-accent rounded-md text-sm outline-none border-none cursor-pointer py-3 px-5 text-bg disabled:from-bgAccent disabled:to-bgAccent disabled:bg-bgAccent disabled:text-disabled disabled:cursor-not-allowed mt-10",
  };
  const onAnswerClick = (answer: string, index: number) => {
    setAnswerIndex(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };
  const onClickNext = () => {
    setAnswerIndex(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };
  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };
  return (
    <div
      // style={{ height: containerTopOffset }}
      id="quiz-container"
      className={` w-[500px] bg-bg rounded-md mt-10 py-8 px-10 relative`}
    >
      {!showResult ? (
        <>
          <AnswerTimer />
          <span className="text-xl font-medium text-primary">
            {currentQuestion + 1}
          </span>
          <span className="text-sm font-medium text-disabled">
            /{questions.length}
          </span>
          <h2 className="text-xl font-medium m-0">{question}</h2>
          <ul className="mt-10">
            {choices.map((answer, index) => {
              return (
                <li
                  onClick={() => onAnswerClick(answer, index)}
                  key={answer}
                  className={`${
                    answerIndex === index
                      ? "bg-primary border border-accent text-white"
                      : ""
                  } text-foreground text-sm bg-bg border border-disabled rounded-xl py-3 px-5 mt-5 cursor-pointer`}
                >
                  {answer}
                </li>
              );
            })}
          </ul>
          <div className="flex justify-end">
            <button
              onClick={onClickNext}
              disabled={answerIndex === null}
              className={styles.customButton}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3 className=" font-bold text-xl mb-5">Result</h3>
          <p className="text-base font-medium mb-3">
            Total Questions:{" "}
            <span className="text-primary text-xl font-bold">
              {questions.length}
            </span>
          </p>
          <p className="text-base font-medium mb-3">
            Total Score:{" "}
            <span className="text-primary text-xl font-bold">
              {result.score}
            </span>
          </p>
          <p className="text-base font-medium mb-3">
            Correct Answers:{" "}
            <span className="text-primary text-xl font-bold">
              {result.correctAnswers}
            </span>
          </p>
          <p className="text-base font-medium mb-3">
            Wrong Answers:{" "}
            <span className="text-primary text-xl font-bold">
              {result.wrongAnswers}
            </span>
          </p>
          <button className={styles.customButton} onClick={onTryAgain}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
