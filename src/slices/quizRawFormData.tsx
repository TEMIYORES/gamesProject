import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface initialType {
  id: string;
  questions: {
    question: string;
    choices?: string[];
    type: string;
    correctAnswer: string;
  }[];
  backgroundColor: string;
  cardColor: string;
  timeLimit: number;
  createDate: Date | "";
  type: string;
}
const initialState: initialType = {
  id: "",
  questions: [
    {
      question: "",
      choices: [],
      type: "",
      correctAnswer: "",
    },
  ],
  backgroundColor: "",
  cardColor: "",
  timeLimit: 1,
  createDate: "",
  type: "",
};

const quizRawFormData = createSlice({
  name: "quizRawFormData",
  initialState,
  reducers: {
    updateQuizRawFormData: (_state, action) => {
      return action.payload;
    },
  },
});

export const getQuizRawFormData: (state: RootState) => initialType = (
  state: RootState
) => {
  return state.quizRawFormData;
};
export const { updateQuizRawFormData } = quizRawFormData.actions;
export default quizRawFormData.reducer;
