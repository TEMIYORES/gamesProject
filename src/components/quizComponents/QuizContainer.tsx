interface quizQuestionsType {
  questions: {
    question: string;
    choices: string[];
    type: string;
    correctAnswer: string;
  }[];
}
const QuizContainer: React.FC<quizQuestionsType> = ({ questions }) => {
  return <div className="quiz-container"></div>;
};

export default QuizContainer;
