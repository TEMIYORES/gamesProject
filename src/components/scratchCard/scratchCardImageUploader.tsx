import { CloseCircle, GalleryAdd } from "iconsax-react";
import React, { useState } from "react";
import imgIcon from "../../assets/img.png";
import { useDispatch, useSelector } from "react-redux";
import { getScratchCardData, setScratchCard } from "../../slices/scratchCard";

interface ImageUploaderType {
  name: string;
  handleImage?: (imgName: string, imgUrl: string, index?: number) => void;
  index?: number;
}
const ScratchCardImageUploader: React.FC<ImageUploaderType> = ({
  name,
  handleImage,
  index,
}) => {
  const scratchCardData = useSelector(getScratchCardData);
  const [toggleUploader, setToggleUploader] = useState(false);
  const dispatch = useDispatch();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImageUrl = reader.result as string;
        // Set the uploaded image name
        const updateScratchCardData = { ...scratchCardData };

        if (name === "background") {
          updateScratchCardData.background = {
            ...updateScratchCardData.background,
            imgName: file.name,
          };
          updateScratchCardData.background.imgUrl = uploadedImageUrl;
          dispatch(setScratchCard(updateScratchCardData));
        }
        if (name === "mobile_background") {
          updateScratchCardData.mobileBackground = {
            ...updateScratchCardData.mobileBackground,
            imgName: file.name,
          };
          updateScratchCardData.mobileBackground.imgUrl = uploadedImageUrl;
          dispatch(setScratchCard(updateScratchCardData));
        }
        if (name === "center_image") {
          updateScratchCardData.centerImage = {
            ...updateScratchCardData.centerImage,
            imgName: file.name,
          };
          updateScratchCardData.centerImage.imgUrl = uploadedImageUrl;
          dispatch(setScratchCard(updateScratchCardData));
        }
        if (name === "redirect_background") {
          updateScratchCardData.redirectBackground = {
            ...updateScratchCardData.redirectBackground,
            imgName: file.name,
          };
          updateScratchCardData.redirectBackground.imgUrl = uploadedImageUrl;
          dispatch(setScratchCard(updateScratchCardData));
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
        const updateScratchCardData = { ...scratchCardData };
        if (name === "background") {
          updateScratchCardData.background = {
            ...updateScratchCardData.background,
            imgName: file.name,
          };
          updateScratchCardData.background.imgUrl = droppedImageUrl;
          dispatch(setScratchCard(updateScratchCardData));
        }
        if (name === "mobile_background") {
          updateScratchCardData.mobileBackground = {
            ...updateScratchCardData.mobileBackground,
            imgName: file.name,
          };
          updateScratchCardData.background.imgUrl = droppedImageUrl;
          dispatch(setScratchCard(updateScratchCardData));
        }
        if (name === "center_image") {
          updateScratchCardData.centerImage = {
            ...updateScratchCardData.centerImage,
            imgName: file.name,
          };
          updateScratchCardData.background.imgUrl = droppedImageUrl;
          dispatch(setScratchCard(updateScratchCardData));
        }
        if (name === "redirect_background") {
          updateScratchCardData.redirectBackground = {
            ...updateScratchCardData.redirectBackground,
            imgName: file.name,
          };
          updateScratchCardData.redirectBackground.imgUrl = droppedImageUrl;
          dispatch(setScratchCard(updateScratchCardData));
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
      {name === "center_image" && (
        <input
          id="center_img"
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
      {index?.toString() && (
        <input
          id={`option${index}`}
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
              {name === "center_image" && (
                <label htmlFor="center_img" className="w-full">
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
              {index?.toString() && (
                <label htmlFor={`option${index}`} className="w-full">
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

export default ScratchCardImageUploader;
