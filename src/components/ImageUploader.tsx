import { CloseCircle, GalleryAdd } from "iconsax-react";
import React, { useState } from "react";
import imgIcon from "../assets/img.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpinRawFormData,
  updateSpinRawFormData,
} from "../slices/spinRawFormData";
interface ImageUploaderType {
  name: string;
}
const ImageUploader: React.FC<ImageUploaderType> = ({ name }) => {
  const spinformdata = useSelector(getSpinRawFormData);
  const [toggleUploader, setToggleUploader] = useState(false);
  const dispatch = useDispatch();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImageUrl = reader.result as string;
        // Set the uploaded image name
        const updateSpinData = { ...spinformdata };
        if (name === "spinner") {
          updateSpinData.spinnerColor = {
            ...updateSpinData.spinnerColor,
            imgName: file.name,
          };
          updateSpinData.spinnerColor.imgUrl = uploadedImageUrl;
          dispatch(updateSpinRawFormData(updateSpinData));
        }
        if (name === "background") {
          updateSpinData.backgroundColor = {
            ...updateSpinData.backgroundColor,
            imgName: file.name,
          };
          updateSpinData.backgroundColor.imgUrl = uploadedImageUrl;
          dispatch(updateSpinRawFormData(updateSpinData));
        }
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
        const updateSpinData = { ...spinformdata };
        if (name === "spinner") {
          updateSpinData.spinnerColor = {
            ...updateSpinData.spinnerColor,
            imgName: file.name,
          };
          updateSpinData.spinnerColor.imgUrl = droppedImageUrl;
          dispatch(updateSpinRawFormData(updateSpinData));
        }
        if (name === "background") {
          updateSpinData.backgroundColor = {
            ...updateSpinData.backgroundColor,
            imgName: file.name,
          };
          updateSpinData.backgroundColor.imgUrl = droppedImageUrl;
          dispatch(updateSpinRawFormData(updateSpinData));
        }
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
      {name === "spinner" && (
        <input
          id="spinnerUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}
      {name === "background" && (
        <input
          id="bgUpload"
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
              {name === "spinner" && (
                <label htmlFor="spinnerUpload" className="w-full">
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
              {name === "background" && (
                <label htmlFor="bgUpload" className="w-full">
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

export default ImageUploader;
