import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface quizType {
  id: string;
  heading: string;
  description: string;
  redirectHeading: string;
  redirectDescription: string;
  gameHeading: string;
  gameDescription: string;
  gameType: string;
  gameStatus: string;
  background: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  mobileBackground: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  gameBackground: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  redirectBackground: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  gameMobileBackground: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  resultType: string;
  showResult: boolean;
  barColor: string;
  enableTimer: boolean;
  setTimer: {
    min1: string;
    min2: string;
    sec1: string;
    sec2: string;
  };
  progressbar: {
    isEnable: boolean;
    color: string;
  };
  contentSetting: {
    block: number;
    label: string;
    pointValue: string;
    toShow: {
      question: boolean;
      image: boolean;
      video: boolean;
      text: boolean;
      button: boolean;
    };
    questionSetting: {
      question: string;
      answertype: string;
      shortAnswer: string;
      paragraph: string;
      multipleChoice: {
        option: string;
        ischecked: boolean;
      }[];
      checkbox: {
        option: string;
        ischecked: boolean;
      }[];
      dropdown: {
        option: string;
        ischecked: boolean;
      }[];
      fileUpload: {
        imgName: string;
        imgUrl: string;
      };
      button: {
        text: string;
        color: string;
        link: string;
        position: string;
      };
    };

    image: {
      imgName: string;
      imgUrl: string;
    };
    videoType:string;
    video: {
      videoName: string;
      videoUrl: string;
    };
    text: string;
    button: string;
  }[];
  questions: {
    question: string;
    choices?: string[];
    type: string;
    correctAnswer: string;
  }[];
  cardColor: string;
  timeLimit: number;
  createDate: Date | "";
  type: string;
}
export interface contentSettingType {
  block: number;
  label: string;
  pointValue: string;
  toShow: {
    question: boolean;
    image: boolean;
    video: boolean;
    text: boolean;
    button: boolean;
  };
  questionSetting: {
    question: string;
    answertype: string;
    shortAnswer: string;
    paragraph: string;
    multipleChoice: {
      option: string;
      ischecked: boolean;
    }[];
    checkbox: {
      option: string;
      ischecked: boolean;
    }[];
    dropdown: {
      option: string;
      ischecked: boolean;
    }[];
    fileUpload: {
      imgName: string;
      imgUrl: string;
    };
    button: {
      text: string;
      color: string;
      link: string;
      position: string;
    };
  };

  image: {
    imgName: string;
    imgUrl: string;
  };
  videoType:string;
  video: {
    videoName: string;
    videoUrl: string;
  };
  text: string;
  button: string;
}
export const InitialState: quizType = {
  id: "",
  heading: "",
  description: "",
  redirectHeading: "",
  redirectDescription: "",
  gameHeading: "",
  gameDescription: "",
  gameType: "Quiz",
  gameStatus: "not published",
  mobileBackground: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  contentSetting: [
    {
      block: 1,
      label: "block 1",
      pointValue: "",
      toShow: {
        question: false,
        image: false,
        video: false,
        text: false,
        button: false,
      },
      questionSetting: {
        question: "",
        answertype: "Short answer",
        shortAnswer: "",
        paragraph: "",
        multipleChoice: [],
        checkbox: [],
        dropdown: [],
        fileUpload: {
          imgName: "",
          imgUrl: "",
        },
        button: {
          text: "",
          color: "",
          link: "",
          position: "",
        },
      },
      image: {
        imgName: "",
        imgUrl: "",
      },
      videoType:"",
      video: {
        videoName: "",
        videoUrl: "",
      },
      text: "",
      button: "",
    },
  ],
  background: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  gameMobileBackground: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  gameBackground: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  redirectBackground: {
    imgName: "",
    imgUrl: "",
    color: "",
  },
  resultType: "",
  showResult: true,
  barColor: "",
  enableTimer: true,
  setTimer: {
    min1: "",
    min2: "",
    sec1: "",
    sec2: "",
  },
  progressbar: {
    isEnable: true,
    color: "",
  },
  questions: [
    {
      question: "",
      choices: [],
      type: "",
      correctAnswer: "",
    },
  ],

  cardColor: "",
  timeLimit: 1,
  createDate: "",
  type: "",
};

const quizData = createSlice({
  name: "quizData",
  initialState: InitialState,
  reducers: {
    setQuiz: (_state, action) => {
      return action.payload;
    },
  },
});

export const getQuizData: (state: RootState) => quizType = (
  state: RootState
) => {
  return state.quizData;
};
export const { setQuiz } = quizData.actions;
export default quizData.reducer;
