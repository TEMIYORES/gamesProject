import { useDispatch, useSelector } from "react-redux";
import ScratchCardColorPicker from "../../components/scratchCard/scratchCardColorPicker";
import {
  Sound,
  getScratchCardData,
  scratchCardType,
  scratchGameSettingType,
  setScratchCard,
} from "../../slices/scratchCard";
import ScratchCardImageUploader from "../../components/scratchCard/scratchCardImageUploader";
import ScratchCardSoundEffect from "../../components/scratchCard/scratchCardSoundEffect";
import { toast } from "react-toastify";
import { ChangeEvent, useEffect } from "react";

const ScratchCard = () => {
  const scratchCardData: scratchCardType = useSelector(getScratchCardData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (scratchCardData.numberOfScratchCard != null) {
      if (
        scratchCardData.gameSetting.length < scratchCardData.numberOfScratchCard
      ) {
        const updateScratchCardData = { ...scratchCardData };
        const newItems = Array.from(
          {
            length:
              scratchCardData.numberOfScratchCard -
              scratchCardData.gameSetting.length,
          },
          (_, index) => {
            const newItem: scratchGameSettingType = {
              label: `option ${scratchCardData.gameSetting.length + index + 1}`,
              probability: 100,
              coupon_code: "",
              isWin: "win",
              color: "#000000",
              price: "",
              imgName: "",
              imgUrl: "",
            };
            return newItem;
          }
        );

        updateScratchCardData.gameSetting = [
          ...updateScratchCardData.gameSetting,
          ...newItems,
        ];
        dispatch(setScratchCard(updateScratchCardData));
      } else if (
        scratchCardData.numberOfScratchCard < scratchCardData.gameSetting.length
      ) {
        const updateScratchCardData = { ...scratchCardData };

        updateScratchCardData.gameSetting = scratchCardData.gameSetting.slice(
          0,
          scratchCardData.numberOfScratchCard
        );
        dispatch(setScratchCard(updateScratchCardData));
      }
    }
  }, [dispatch, scratchCardData, scratchCardData.numberOfScratchCard]);

  const handleImageClear = (name?: string, index?: number) => {
    const updateScratchCardData = { ...scratchCardData };
    if (name === "background") {
      updateScratchCardData.background = {
        ...updateScratchCardData.background,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "mobile_background") {
      updateScratchCardData.mobileBackground = {
        ...updateScratchCardData.mobileBackground,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "center_image") {
      updateScratchCardData.centerImage = {
        ...updateScratchCardData.centerImage,
        imgName: "",
        imgUrl: "",
      };
    }

    if (index !== undefined) {
      updateScratchCardData.gameSetting = updateScratchCardData.gameSetting.map(
        (content, index2) => {
          if (index === index2) {
            content = { ...content, imgName: "", imgUrl: "" };
          }
          return content;
        }
      );
    }
    dispatch(setScratchCard(updateScratchCardData));
  };

  const handlePercentageChange = (index: number, value: string) => {
    const updateScratchCardData = { ...scratchCardData };
    const updatedContents = [...scratchCardData.gameSetting];
    console.log(updatedContents);
    updatedContents[index] = {
      ...updatedContents[index],
      probability: parseInt(value, 10) || 0,
    };
    updateScratchCardData.gameSetting = updatedContents;
    dispatch(setScratchCard(updateScratchCardData));
  };
  const handleInputBlur = () => {
    // Ensure at least one input is not zero
    const allZero = scratchCardData.gameSetting.every(
      (item) => item.probability === 0
    );
    if (allZero) {
      const updateScratchCardData = { ...scratchCardData };
      // Find the first input and set it to 1 if all inputs are zero
      const updatedProbability = [...scratchCardData.gameSetting];
      updatedProbability[0] = { ...updatedProbability[0], probability: 1 };
      updateScratchCardData.gameSetting = updatedProbability;
      dispatch(setScratchCard(updateScratchCardData));
      toast.warn("Atleast one content probability must be 1");
    }
  };
  const handleColorWheel = (color: string, index: number) => {
    const updateScratchCardData = { ...scratchCardData };
    if (index !== undefined) {
      updateScratchCardData.gameSetting = updateScratchCardData.gameSetting.map(
        (items, index2) => {
          if (index === index2) {
            items = { ...items, color: color };
          }
          return items;
        }
      );
    }
    dispatch(setScratchCard(updateScratchCardData));
  };
  const handleOptionImage = (
    imgName: string,
    imgUrl: string,
    index?: number
  ) => {
    console.log({ imgName, imgUrl, index });
    const updateScratchCardData = { ...scratchCardData };
    updateScratchCardData.gameSetting = updateScratchCardData.gameSetting.map(
      (content, index2) => {
        if (index === index2) {
          content = { ...content, imgName: imgName, imgUrl: imgUrl };
        }
        return content;
      }
    );
    // updateScratchCardData.gameSetting = [...gameSetting];
    dispatch(setScratchCard(updateScratchCardData));
  };
  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string
  ) => {
    const updateScratchCardData = { ...scratchCardData };
    if (content === "description") {
      updateScratchCardData.gameDescription = e.target.value;
    }
    if (content === "heading") {
      updateScratchCardData.gameHeading = e.target.value;
    }
    dispatch(setScratchCard(updateScratchCardData));
  };
  const handleGameSettingTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string,
    index: number
  ) => {
    const updateScratchCardData = { ...scratchCardData };

    if (index !== undefined) {
      updateScratchCardData.gameSetting = updateScratchCardData.gameSetting.map(
        (items, index2) => {
          if (index === index2) {
            if (content === "coupon_code") {
              items = { ...items, coupon_code: e.target.value };
            }
          }
          return items;
        }
      );
    }
    dispatch(setScratchCard(updateScratchCardData));
  };
  const handleGameSettingSelectChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    content: string,
    index: number
  ) => {
    const updateScratchCardData = { ...scratchCardData };

    if (index !== undefined) {
      updateScratchCardData.gameSetting = updateScratchCardData.gameSetting.map(
        (items, index2) => {
          if (index === index2) {
            if (content === "isWin") {
              if (e.target.value === "win" || e.target.value === "no_win")
                items = { ...items, isWin: e.target.value };
            }
          }
          return items;
        }
      );
    }
    dispatch(setScratchCard(updateScratchCardData));
  };
  const handleNumberChange = (
    e: ChangeEvent<HTMLSelectElement>,
    content: string
  ) => {
    const updateScratchCardData = { ...scratchCardData };
    if (content === "numberOfScratchCard") {
      updateScratchCardData.numberOfScratchCard = parseInt(e.target.value);
    }
    if (content === "scratchCardPercentage") {
      updateScratchCardData.scratchPercentage = parseInt(e.target.value);
    }

    dispatch(setScratchCard(updateScratchCardData));
  };
  const handleSoundData = (sound: Sound | null) => {
    const updateScratchCardData = { ...scratchCardData };
    if (sound != null) updateScratchCardData.scratchSound = sound;
    dispatch(setScratchCard(updateScratchCardData));
  };
  return (
    <div className="w-full mt-5 p-2">
      <h3 className="mb-5 text-slate-500 font-semibold">Page Setting</h3>
      <div className="w-full pl-3 flex flex-col gap-5">
        <div className="w-full flex place-items-center gap-5">
          <label htmlFor="heading" className="font-semibold">
            Heading
          </label>
          <input
            id="heading"
            className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
            onChange={(e) => handleTextChange(e, "heading")}
            value={scratchCardData.gameHeading}
          />
        </div>

        <div className="w-full flex gap-5">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            onChange={(e) => handleTextChange(e, "description")}
            value={scratchCardData.gameDescription}
            id="description"
            rows={5}
            cols={30}
            className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
          />
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Background
          </span>
          <div className="flex">
            <ScratchCardColorPicker
              defaultColor={scratchCardData.background.color || "#ffffff"}
              name="background"
            />
          </div>
          <ScratchCardImageUploader name="background" />
          {scratchCardData.background.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {scratchCardData.background.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("background");
                }}
              >
                x
              </span>
            </span>
          )}
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Mobile Background
          </span>
          <div className="flex">
            <ScratchCardColorPicker
              defaultColor={scratchCardData.mobileBackground.color || "#ffffff"}
              name="mobile_background"
            />
          </div>
          <ScratchCardImageUploader name="mobile_background" />
          {scratchCardData.mobileBackground.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {scratchCardData.mobileBackground.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("mobile_background");
                }}
              >
                x
              </span>
            </span>
          )}
        </div>
      </div>
      <h3 className="text-slate-500 font-semibold my-5">Card Setting</h3>
      <div className="w-full pl-3 flex flex-col gap-5 ">
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Number of Scratch Card</label>
          <select
            value={scratchCardData.numberOfScratchCard}
            className="w-32 border border-slate-700 rounded-full outline-none px-1 bg-[#F1F5F9]"
            onChange={(e) => handleNumberChange(e, "numberOfScratchCard")}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Centre Image</label>
          <ScratchCardImageUploader name="center_image" />
          {scratchCardData.centerImage.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap">
              {scratchCardData.centerImage.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("center_image");
                }}
              >
                x
              </span>
            </span>
          )}
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Scratch Percentage</label>
          <select
            className="w-24 border border-slate-700 rounded-full outline-none px-1 bg-[#F1F5F9]"
            value={scratchCardData.scratchPercentage}
            onChange={(e) => handleNumberChange(e, "scratchCardPercentage")}
          >
            <option>20</option>
            <option>50</option>
            <option>80</option>
          </select>
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Scratch Sound</label>
          <ScratchCardSoundEffect handleSoundData={handleSoundData} />
        </div>
      </div>
      <h3 className="text-slate-500 font-semibold my-5">Game Setting</h3>
      <div className="w-full pl-3 flex flex-col gap-5 ">
        <div className="w-full flex flex-col py-2 mb-3 bg-input_bg rounded-xl">
          <div className="grid grid-cols-11 mb-5">
            <label className="font-bold text-center col-span-2"></label>
            <label className="font-bold text-center whitespace-nowrap col-span-2">
              Probability
            </label>
            <label className="font-bold text-center whitespace-nowrap col-span-2">
              Coupon code
            </label>
            <label className="font-bold text-center whitespace-nowrap col-span-2">
              Win/No Win
            </label>
            <label className="font-bold text-center whitespace-nowrap col-span-2">
              Card Color
            </label>
            <label className="font-bold text-center whitespace-nowrap col-span-1">
              Price
            </label>
          </div>
          <div className="w-full flex flex-col gap-y-3">
            {scratchCardData.gameSetting.map((content, index) => (
              <div key={index} className="w-full grid grid-cols-11 gap-x-5">
                <div className="flex place-items-center col-span-2">
                  <div>{content.label}</div>
                </div>
                <div className="col-span-2">
                  <input
                    value={content.probability}
                    placeholder="Percentage"
                    className="py-1 px-2 border-none outline-none w-full bg-[#F1F5F9]"
                    onChange={(e) =>
                      handlePercentageChange(index, e.target.value)
                    }
                    onBlur={handleInputBlur}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    value={content.coupon_code}
                    onChange={(e) =>
                      handleGameSettingTextChange(e, "coupon_code", index)
                    }
                    className="py-1 px-2 border-none outline-none  w-full bg-[#F1F5F9]"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    value={content.isWin}
                    className="py-1 px-2 border-none outline-none  w-full bg-[#F1F5F9]"
                    onChange={(e) =>
                      handleGameSettingSelectChange(e, "isWin", index)
                    }
                  >
                    <option value={"win"}>Win</option>
                    <option value={"no_win"}>No Win</option>
                  </select>
                </div>
                <div className="flex place-items-center justify-center col-span-2">
                  <ScratchCardColorPicker
                    defaultColor={content.color}
                    name={index.toString()}
                    handleColorWheel={handleColorWheel}
                  />
                </div>
                <div className="w-full flex place-items-center justify-start col-span-1">
                  <ScratchCardImageUploader
                    name=""
                    index={index}
                    handleImage={handleOptionImage}
                  />
                  {scratchCardData.gameSetting[index].imgName && (
                    <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                      {scratchCardData.gameSetting[index].imgName}
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          handleImageClear("", index);
                        }}
                      >
                        x
                      </span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScratchCard;
