import { useEffect, useState } from "react";
import AnswerTimer from "./answerTimer/AnswerTimer";

interface quizQuestionsType {
  questions: {
    question: string;
    choices?: string[];
    type: string;
    correctAnswer: string;
  }[];
  backgroundColor: string;
  cardColor: string;
  timeLimit: number;
}

const QuizContainer: React.FC<quizQuestionsType> = ({
  questions,
  backgroundColor,
  cardColor,
  timeLimit,
}) => {
  const [containerTopOffset, setcontainerTopOffset] = useState<string>(
    "calc(100vh - 100px)"
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const container = document.getElementById("quiz-container");
    if (container) {
      const resultHeight = window.innerHeight - container.offsetTop;
      setcontainerTopOffset(`calc(${resultHeight}px)`);
    }
  });
  const resultInitialState = {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: questions.length,
  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { question, choices, correctAnswer, type } = questions[currentQuestion];
  const [answerIndex, setAnswerIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const showAnswerTimer = true;
  const [inputAnswer, setInputAnswer] = useState<string>("");

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
  const onClickNext = (finalAnswer: boolean) => {
    setAnswer(false);
    setAnswerIndex(null);
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            wrongAnswers: prev.wrongAnswers - 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev }
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTimeUp = () => {
    setAnswer(false);
    setInputAnswer("");
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            wrongAnswers: prev.wrongAnswers - 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev }
    );
    setCurrentQuestion(0);
    setShowResult(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAnswer(e.target.value);
    if (
      e.target.value.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    ) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };
  const getAnswerUi = () => {
    if (type === "FIB") {
      return (
        <input
          className="border border-disabled outline-none rounded-sm py-2 px-4 w-full mt-5 box-border"
          type="text"
          value={inputAnswer}
          onChange={handleInputChange}
        />
      );
    }
    return (
      <ul className="mt-10">
        {choices?.map((answer, index) => {
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
    );
  };
  return (
    // text-foreground bg-gradient-to-r from-primary to-accent
    <div
      id="quiz-container"
      style={{ backgroundColor: backgroundColor, height: containerTopOffset }}
      className="w-full p-8 flex justify-center items-center font-mono"
    >
      <div
        style={{ backgroundColor: cardColor }}
        className={` w-[500px] rounded-md mt-10 py-8 px-10 relative`}
      >
        {!showResult ? (
          <>
            {showAnswerTimer && (
              <AnswerTimer duration={timeLimit * 60} onTimeUp={handleTimeUp} />
            )}
            <span className="text-xl font-medium text-primary">
              {currentQuestion + 1}
            </span>
            <span className="text-sm font-medium text-disabled">
              /{questions.length}
            </span>
            <h2 className="text-xl font-medium m-0">{question}</h2>
            {getAnswerUi()}
            <div className="flex justify-end">
              <button
                onClick={() => onClickNext(answer!)}
                disabled={answerIndex === null && !inputAnswer}
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
    </div>
  );
};

export default QuizContainer;
