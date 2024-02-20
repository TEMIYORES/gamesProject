import { CloseCircle, VideoAdd } from "iconsax-react";
import React, { useState } from "react";
import vidIcon from "../../assets/vidIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { getQuizData, setQuiz } from "../../slices/quiz";

interface VideoUploaderType {
  name: string;
  handleVideo?: (imgName: string, imgUrl: string, index?: number) => void;
  index?: number;
}
const QuizVideoUploader: React.FC<VideoUploaderType> = ({
  name,
  handleVideo,
  index,
}) => {
  const quizData = useSelector(getQuizData);
  const [toggleUploader, setToggleUploader] = useState(false);
  const dispatch = useDispatch();
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedVideoUrl = reader.result as string;
        // Set the uploaded image name
        const updateQuizData = { ...quizData };

        if (name === "questionVideo") {
          updateQuizData.contentSetting = updateQuizData.contentSetting.map(
            (content, index2) => {
              if (index === index2) {
                content = {
                  ...updateQuizData.contentSetting[index],
                  video: {
                    ...updateQuizData.contentSetting[index].video,
                    videoName: file.name,
                    videoUrl: uploadedVideoUrl,
                  },
                };
              }
              return content;
            }
          );
          dispatch(setQuiz(updateQuizData));
        }
        handleVideo !== undefined &&
          handleVideo(file.name, uploadedVideoUrl, index);
        setToggleUploader(false);
      };
      reader.readAsDataURL(file);
      // Set the dropped image name
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const droppedVideoUrl = reader.result as string;
        const updateQuizData = { ...quizData };

        if (name === "questionVideo") {
          updateQuizData.contentSetting = updateQuizData.contentSetting.map(
            (content, index2) => {
              if (index === index2) {
                content = {
                  ...updateQuizData.contentSetting[index],
                  video: {
                    ...updateQuizData.contentSetting[index].video,
                    videoName: file.name,
                    videoUrl: droppedVideoUrl,
                  },
                };
              }
              return content;
            }
          );
          dispatch(setQuiz(updateQuizData));
        }
        handleVideo !== undefined &&
          handleVideo(file.name, droppedVideoUrl, index);
        setToggleUploader(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex place-items-center gap-x-2">
        <label
          onClick={() => setToggleUploader((prev) => !prev)}
          className="cursor-pointer"
        >
          <VideoAdd size="20" color="#000" />
        </label>
      </div>
      {name === "questionVideo" && (
        <input
          id="questionVideo"
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
        />
      )}

      {toggleUploader && (
        <div className="absolute z-10 w-96 h-96 bg-[#cae2ff2d] rounded-lg py-10 px-5">
          <div className="w-full h-full shadow-xl bg-white border border-blue-300 rounded-lg p-10">
            <div className="flex flex-col place-items-center gap-y-1">
              <p className="text-xl">Upload your File</p>
              <p className="text-xs text-slate-400">
                File should be a Video like
              </p>
              {name === "questionVideo" && (
                <label htmlFor="questionVideo" className="w-full">
                  <div
                    className="mt-8 w-full h-32 border-dashed border-2 border-gray-400 mb-4 rounded-lg cursor-pointer flex flex-col place-items-center justify-center gap-y-2"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <img src={vidIcon} alt="img icon" className="w-1/5" />
                    <p className="text-xs text-slate-400">
                      Drop your Video or click to browse
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
          <div
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setToggleUploader(false)}
          >
            <CloseCircle size="20" color="#ff0000" />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizVideoUploader;
