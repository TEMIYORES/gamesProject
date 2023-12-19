import { ChangeEvent, useState } from "react";

const QuestionEntry = () => {
  const [questions, setQuestions] = useState([""]);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = event.target.value;
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h2>Question Entry</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <label>
            Question {index + 1}:
            <input
              type="text"
              value={question}
              onChange={(event) => handleQuestionChange(index, event)}
            />
          </label>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
};

export default QuestionEntry;
