import { CloseCircle, GalleryAdd } from "iconsax-react";
import React, { useState } from "react";
import imgIcon from "../../assets/img.png";
import { useDispatch, useSelector } from "react-redux";
import { getGiveawayData, setGiveaway } from "../../slices/giveaway";

interface ImageUploaderType {
  name: string;
  handleImage?: (imgName: string, imgUrl: string, index?: number) => void;
  index?: number;
}
const GiveawayImageUploader: React.FC<ImageUploaderType> = ({
  name,
  handleImage,
  index,
}) => {
  const giveawayData = useSelector(getGiveawayData);
  const [toggleUploader, setToggleUploader] = useState(false);
  const dispatch = useDispatch();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImageUrl = reader.result as string;
        // Set the uploaded image name
        const updateGiveawayData = { ...giveawayData };

        if (name === "background") {
          updateGiveawayData.background = {
            ...updateGiveawayData.background,
            imgName: file.name,
          };
          updateGiveawayData.background.imgUrl = uploadedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "mobile_background") {
          updateGiveawayData.mobileBackground = {
            ...updateGiveawayData.mobileBackground,
            imgName: file.name,
          };
          updateGiveawayData.mobileBackground.imgUrl = uploadedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "uploadImage") {
          updateGiveawayData.type.userGenerated.uploadImage = {
            ...updateGiveawayData.type.userGenerated.uploadImage,
            imgName: file.name,
          };
          updateGiveawayData.type.userGenerated.uploadImage.imgUrl =
            uploadedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "manualCodeBackground") {
          updateGiveawayData.type = {
            ...updateGiveawayData.type,
            manual: {
              ...updateGiveawayData.type.manual,
              codeBackground: {
                ...updateGiveawayData.type.manual.codeBackground,
                imgName: file.name,
              },
            },
          };
          updateGiveawayData.type.manual.codeBackground.imgUrl =
            uploadedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "manualMobileBackground") {
          updateGiveawayData.type = {
            ...updateGiveawayData.type,
            manual: {
              ...updateGiveawayData.type.manual,
              mobileBackground: {
                ...updateGiveawayData.type.manual.mobileBackground,
                imgName: file.name,
              },
            },
          };
          updateGiveawayData.type.manual.mobileBackground.imgUrl =
            uploadedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "autoCodeBackground") {
          updateGiveawayData.type = {
            ...updateGiveawayData.type,
            auto: {
              ...updateGiveawayData.type.auto,
              codeBackground: {
                ...updateGiveawayData.type.auto.codeBackground,
                imgName: file.name,
              },
            },
          };
          updateGiveawayData.type.auto.codeBackground.imgUrl = uploadedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "autoMobileBackground") {
          updateGiveawayData.type = {
            ...updateGiveawayData.type,
            auto: {
              ...updateGiveawayData.type.auto,
              mobileBackground: {
                ...updateGiveawayData.type.auto.mobileBackground,
                imgName: file.name,
              },
            },
          };
          updateGiveawayData.type.auto.mobileBackground.imgUrl =
            uploadedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }

        if (name === "redirect_background") {
          updateGiveawayData.redirectBackground = {
            ...updateGiveawayData.redirectBackground,
            imgName: file.name,
          };
          updateGiveawayData.redirectBackground.imgUrl = uploadedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
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
        const updateGiveawayData = { ...giveawayData };
        if (name === "background") {
          updateGiveawayData.background = {
            ...updateGiveawayData.background,
            imgName: file.name,
          };
          updateGiveawayData.background.imgUrl = droppedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "mobile_background") {
          updateGiveawayData.mobileBackground = {
            ...updateGiveawayData.mobileBackground,
            imgName: file.name,
          };
          updateGiveawayData.background.imgUrl = droppedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "uploadImage") {
          updateGiveawayData.type.userGenerated.uploadImage = {
            ...updateGiveawayData.type.userGenerated.uploadImage,
            imgName: file.name,
          };
          updateGiveawayData.type.userGenerated.uploadImage.imgUrl =
            droppedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "manualCodeBackground") {
          updateGiveawayData.type = {
            ...updateGiveawayData.type,
            manual: {
              ...updateGiveawayData.type.manual,
              codeBackground: {
                ...updateGiveawayData.type.manual.codeBackground,
                imgName: file.name,
              },
            },
          };
          updateGiveawayData.type.manual.codeBackground.imgUrl =
            droppedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "manualMobileBackground") {
          updateGiveawayData.type = {
            ...updateGiveawayData.type,
            manual: {
              ...updateGiveawayData.type.manual,
              mobileBackground: {
                ...updateGiveawayData.type.manual.mobileBackground,
                imgName: file.name,
              },
            },
          };
          updateGiveawayData.type.manual.mobileBackground.imgUrl =
            droppedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "autoCodeBackground") {
          updateGiveawayData.type = {
            ...updateGiveawayData.type,
            auto: {
              ...updateGiveawayData.type.auto,
              codeBackground: {
                ...updateGiveawayData.type.auto.codeBackground,
                imgName: file.name,
              },
            },
          };
          updateGiveawayData.type.auto.codeBackground.imgUrl = droppedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }
        if (name === "autoMobileBackground") {
          updateGiveawayData.type = {
            ...updateGiveawayData.type,
            auto: {
              ...updateGiveawayData.type.auto,
              mobileBackground: {
                ...updateGiveawayData.type.auto.mobileBackground,
                imgName: file.name,
              },
            },
          };
          updateGiveawayData.type.auto.mobileBackground.imgUrl =
            droppedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
        }

        if (name === "redirect_background") {
          updateGiveawayData.redirectBackground = {
            ...updateGiveawayData.redirectBackground,
            imgName: file.name,
          };
          updateGiveawayData.redirectBackground.imgUrl = droppedImageUrl;
          dispatch(setGiveaway(updateGiveawayData));
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
      {name === "uploadImage" && (
        <input
          id="uploadImage"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}
      {name === "manualCodeBackground" && (
        <input
          id="manualCodeBackground"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}
      {name === "manualMobileBackground" && (
        <input
          id="manualMobileBackground"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}
      {name === "autoCodeBackground" && (
        <input
          id="autoCodeBackground"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      )}
      {name === "autoMobileBackground" && (
        <input
          id="autoMobileBackground"
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
              {name === "uploadImage" && (
                <label htmlFor="uploadImage" className="w-full">
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
              {name === "manualCodeBackground" && (
                <label htmlFor="manualCodeBackground" className="w-full">
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
              {name === "manualMobileBackground" && (
                <label htmlFor="manualMobileBackground" className="w-full">
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
              {name === "autoCodeBackground" && (
                <label htmlFor="autoCodeBackground" className="w-full">
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
              {name === "autoMobileBackground" && (
                <label htmlFor="autoMobileBackground" className="w-full">
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

export default GiveawayImageUploader;
