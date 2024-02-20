import { Trash } from "@phosphor-icons/react";
import { getQuizData, quizType, setQuiz } from "../../slices/quiz";
import { useDispatch, useSelector } from "react-redux";
import QuizVideoUploader from "./QuizVideoUploader";

const VideoTab = ({ index }: { index: number }) => {
  const quizData: quizType = useSelector(getQuizData);

  const dispatch = useDispatch();
  const handleVideoClear = (name?: string) => {
    const updateQuizData = { ...quizData };
    if (name === "questionVideo") {
      updateQuizData.contentSetting = updateQuizData.contentSetting.map(
        (content, index2) => {
          if (index === index2) {
            content = {
              ...content,
              video: {
                ...content.video,
                videoName: "",
                videoUrl: "",
              },
            };
          }
          return content;
        }
      );
    }

    dispatch(setQuiz(updateQuizData));
  };
  return (
    <div className="w-[90%] flex flex-col gap-5 mx-auto border border-dashed border-black p-5 my-5">
      <div className="flex flex-col gap-3">
        <label className="flex font-semibold items-center gap-2">
          Video <Trash size={20} />
        </label>
        <QuizVideoUploader name="questionVideo" index={index} />
        {quizData.contentSetting[index].video.videoName && (
          <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
            {quizData.contentSetting[index].video.videoName}
            <span
              className="cursor-pointer"
              onClick={() => {
                handleVideoClear("questionVideo");
              }}
            >
              x
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default VideoTab;
