import { CloseCircle, GalleryAdd } from "iconsax-react";
import React, { useState } from "react";
import imgIcon from "../../assets/img.png";
import { useDispatch, useSelector } from "react-redux";
import { getQuizData, setQuiz } from "../../slices/quiz";

interface ImageUploaderType {
  name: string;
  handleImage?: (imgName: string, imgUrl: string, index?: number) => void;
  index?: number;
}
const QuizImageUploader: React.FC<ImageUploaderType> = ({
  name,
  handleImage,
  index,
}) => {
  const quizData = useSelector(getQuizData);
  const [toggleUploader, setToggleUploader] = useState(false);
  const dispatch = useDispatch();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImageUrl = reader.result as string;
        // Set the uploaded image name
        const updateQuizData = { ...quizData };

        if (name === "background") {
          updateQuizData.background = {
            ...updateQuizData.background,
            imgName: file.name,
          };
          updateQuizData.background.imgUrl = uploadedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }
        if (name === "mobile_background") {
          updateQuizData.mobileBackground = {
            ...updateQuizData.mobileBackground,
            imgName: file.name,
          };
          updateQuizData.mobileBackground.imgUrl = uploadedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }

        if (name === "redirect_background") {
          updateQuizData.redirectBackground = {
            ...updateQuizData.redirectBackground,
            imgName: file.name,
          };
          updateQuizData.redirectBackground.imgUrl = uploadedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }
        if (name === "gameBackground") {
          updateQuizData.gameBackground = {
            ...updateQuizData.gameBackground,
            imgName: file.name,
          };
          updateQuizData.gameBackground.imgUrl = uploadedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }
        if (name === "gameMobileBackground") {
          updateQuizData.gameMobileBackground = {
            ...updateQuizData.gameMobileBackground,
            imgName: file.name,
          };
          updateQuizData.gameMobileBackground.imgUrl = uploadedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }
        handleImage !== undefined &&
          handleImage(file.name, uploadedImageUrl, index);
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
        const droppedImageUrl = reader.result as string;
        const updateQuizData = { ...quizData };
        if (name === "background") {
          updateQuizData.background = {
            ...updateQuizData.background,
            imgName: file.name,
          };
          updateQuizData.background.imgUrl = droppedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }
        if (name === "mobile_background") {
          updateQuizData.mobileBackground = {
            ...updateQuizData.mobileBackground,
            imgName: file.name,
          };
          updateQuizData.background.imgUrl = droppedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }

        if (name === "redirect_background") {
          updateQuizData.redirectBackground = {
            ...updateQuizData.redirectBackground,
            imgName: file.name,
          };
          updateQuizData.redirectBackground.imgUrl = droppedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }
        if (name === "gameBackground") {
          updateQuizData.gameBackground = {
            ...updateQuizData.gameBackground,
            imgName: file.name,
          };
          updateQuizData.gameBackground.imgUrl = droppedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }
        if (name === "gameMobileBackground") {
          updateQuizData.gameMobileBackground = {
            ...updateQuizData.gameMobileBackground,
            imgName: file.name,
          };
          updateQuizData.gameMobileBackground.imgUrl = droppedImageUrl;
          dispatch(setQuiz(updateQuizData));
        }
        handleImage !== undefined &&
          handleImage(file.name, droppedImageUrl, index);
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
          <GalleryAdd size="20" color="#000" />
        </label>
      </div>
      {name === "background" && (
        <input
          id="bg"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}
      {name === "mobile_background" && (
        <input
          id="mobile_bg"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}

      {name === "redirect_background" && (
        <input
          id="redirect_background"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}
      {name === "gameBackground" && (
        <input
          id="gameBackground"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}
      {name === "gameMobileBackground" && (
        <input
          id="gameMobileBackground"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}

      {toggleUploader && (
        <div className="absolute z-10 w-96 h-96 bg-[#cae2ff2d] rounded-lg py-10 px-5">
          <div className="w-full h-full shadow-xl bg-white border border-blue-300 rounded-lg p-10">
            <div className="flex flex-col place-items-center gap-y-1">
              <p className="text-xl">Upload your file</p>
              <p className="text-xs text-slate-400">
                File should be an image like
              </p>
              {name === "background" && (
                <label htmlFor="bg" className="w-full">
                  <div
                    className="mt-8 w-full h-32 border-dashed border-2 border-gray-400 mb-4 rounded-lg cursor-pointer flex flex-col place-items-center justify-center gap-y-2"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <img src={imgIcon} alt="img icon" className="w-1/5" />
                    <p className="text-xs text-slate-400">
                      Drop your file or click to browse
                    </p>
                  </div>
                </label>
              )}
              {name === "mobile_background" && (
                <label htmlFor="mobile_bg" className="w-full">
                  <div
                    className="mt-8 w-full h-32 border-dashed border-2 border-gray-400 mb-4 rounded-lg cursor-pointer flex flex-col place-items-center justify-center gap-y-2"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <img src={imgIcon} alt="img icon" className="w-1/5" />
                    <p className="text-xs text-slate-400">
                      Drop your file or click to browse
                    </p>
                  </div>
                </label>
              )}

              {name === "redirect_background" && (
                <label htmlFor="redirect_background" className="w-full">
                  <div
                    className="mt-8 w-full h-32 border-dashed border-2 border-gray-400 mb-4 rounded-lg cursor-pointer flex flex-col place-items-center justify-center gap-y-2"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <img src={imgIcon} alt="img icon" className="w-1/5" />
                    <p className="text-xs text-slate-400">
                      Drop your file or click to browse
                    </p>
                  </div>
                </label>
              )}
              {name === "gameBackground" && (
                <label htmlFor="gameBackground" className="w-full">
                  <div
                    className="mt-8 w-full h-32 border-dashed border-2 border-gray-400 mb-4 rounded-lg cursor-pointer flex flex-col place-items-center justify-center gap-y-2"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <img src={imgIcon} alt="img icon" className="w-1/5" />
                    <p className="text-xs text-slate-400">
                      Drop your file or click to browse
                    </p>
                  </div>
                </label>
              )}
              {name === "gameMobileBackground" && (
                <label htmlFor="gameMobileBackground" className="w-full">
                  <div
                    className="mt-8 w-full h-32 border-dashed border-2 border-gray-400 mb-4 rounded-lg cursor-pointer flex flex-col place-items-center justify-center gap-y-2"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <img src={imgIcon} alt="img icon" className="w-1/5" />
                    <p className="text-xs text-slate-400">
                      Drop your file or click to browse
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

export default QuizImageUploader;
