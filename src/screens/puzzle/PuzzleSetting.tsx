import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent } from "react";
import { ToggleLeft, ToggleRight } from "@phosphor-icons/react";
import PuzzleSoundEffect from "../../components/puzzle/PuzzleSoundEffect";
import {
  Sound,
  getPuzzleData,
  puzzleType,
  setPuzzle,
} from "../../slices/puzzle";
import PuzzleImageUploader from "../../components/puzzle/PuzzleImageUploader";
import PuzzleColorPicker from "../../components/puzzle/PuzzleColorPicker";

const PuzzleSetting = () => {
  const puzzleData: puzzleType = useSelector(getPuzzleData);
  const dispatch = useDispatch();

  const handleImageClear = (name?: string) => {
    const updatePuzzleData = { ...puzzleData };
    if (name === "background") {
      updatePuzzleData.background = {
        ...updatePuzzleData.background,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "mobile_background") {
      updatePuzzleData.mobileBackground = {
        ...updatePuzzleData.mobileBackground,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "selected_image") {
      updatePuzzleData.selectedImage = {
        ...updatePuzzleData.selectedImage,
        imgName: "",
        imgUrl: "",
      };
    }
    dispatch(setPuzzle(updatePuzzleData));
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string
  ) => {
    const updatePuzzleData = { ...puzzleData };
    if (content === "description") {
      updatePuzzleData.gameDescription = e.target.value;
    }
    if (content === "heading") {
      updatePuzzleData.gameHeading = e.target.value;
    }
    if (content === "couponCode") {
      updatePuzzleData.couponCode = e.target.value;
    }
    if (content === "min1") {
      updatePuzzleData.setTimer = {
        ...updatePuzzleData.setTimer,
        min1: e.target.value,
      };
    }
    if (content === "min2") {
      updatePuzzleData.setTimer = {
        ...updatePuzzleData.setTimer,
        min2: e.target.value,
      };
    }
    if (content === "sec1") {
      updatePuzzleData.setTimer = {
        ...updatePuzzleData.setTimer,
        sec1: e.target.value,
      };
    }
    if (content === "sec2") {
      updatePuzzleData.setTimer = {
        ...updatePuzzleData.setTimer,
        sec2: e.target.value,
      };
    }

    dispatch(setPuzzle(updatePuzzleData));
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLSelectElement>,
    content: string
  ) => {
    const updatePuzzleData = { ...puzzleData };
    if (content === "selectGrid") updatePuzzleData.selectGrid = e.target.value;
    if (content === "retryLimit") updatePuzzleData.retryLimit = e.target.value;
    dispatch(setPuzzle(updatePuzzleData));
  };

  const handleSoundData: (sound: Sound | null, label: string) => void = (
    sound: Sound | null,
    label: string
  ) => {
    const updatePuzzleData = { ...puzzleData };
    if (label === "win") {
      if (sound != null) updatePuzzleData.winSound = sound;
    }
    if (label === "timeUp") {
      if (sound != null) updatePuzzleData.timeUpSound = sound;
    }
    dispatch(setPuzzle(updatePuzzleData));
  };
  const handleToggleTimer = () => {
    const updatePuzzleData = { ...puzzleData };
    updatePuzzleData.timer = !updatePuzzleData.timer;
    dispatch(setPuzzle(updatePuzzleData));
  };
  return (
    <div className="w-full mb-5 p-2">
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
            value={puzzleData.gameHeading}
          />
        </div>

        <div className="w-full flex gap-5">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            onChange={(e) => handleTextChange(e, "description")}
            value={puzzleData.gameDescription}
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
            <PuzzleColorPicker
              defaultColor={puzzleData.background.color || "#ffffff"}
              name="background"
            />
          </div>
          <PuzzleImageUploader name="background" />
          {puzzleData.background.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {puzzleData.background.imgName}
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
            <PuzzleColorPicker
              defaultColor={puzzleData.mobileBackground.color || "#ffffff"}
              name="mobile_background"
            />
          </div>
          <PuzzleImageUploader name="mobile_background" />
          {puzzleData.mobileBackground.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {puzzleData.mobileBackground.imgName}
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
      <h3 className="text-slate-500 font-semibold my-5">Game Setting</h3>
      <div className="w-full pl-3 flex flex-col gap-5 ">
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Select Grid</label>
          <select
            value={puzzleData.selectGrid}
            className="w-20 border border-slate-700 rounded-md outline-none px-1 bg-[#F1F5F9]"
            onChange={(e) => handleNumberChange(e, "selectGrid")}
          >
            <option>4</option>
            <option>8</option>
            <option>12</option>
            <option>16</option>
          </select>
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Upload Image</label>
          <PuzzleImageUploader name="selected_image" />
          {puzzleData.selectedImage.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap">
              {puzzleData.selectedImage.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("selected_image");
                }}
              >
                x
              </span>
            </span>
          )}
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Enable Timer</label>
          <div onClick={handleToggleTimer} className="cursor-pointer">
            {puzzleData.timer ? (
              <ToggleRight size={32} color="#6563FF" weight="fill" />
            ) : (
              <ToggleLeft size={32} color="#6563FF" weight="light" />
            )}
          </div>
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Set Timer</label>
          {/* <HourglassMedium size={32} color="#000000" weight="fill" /> */}
          <div className="grid grid-cols-1">
            <div className="grid grid-cols-2 text-center gap-x-3 bg-inputBg rounded-md p-4">
              <label>Min</label>
              <label>Sec</label>
              <div className="grid grid-cols-2">
                <input
                  maxLength={1}
                  value={puzzleData.setTimer.min1}
                  onChange={(e) => handleTextChange(e, "min1")}
                  className="outline-none border border-slate-300 w-7 px-2 py-1 rounded-md"
                />
                <input
                  maxLength={1}
                  value={puzzleData.setTimer.min2}
                  onChange={(e) => handleTextChange(e, "min2")}
                  className="outline-none border border-slate-300 w-7 px-2 py-1 rounded-md"
                />
              </div>
              <div className="grid grid-cols-2">
                <input
                  maxLength={1}
                  value={puzzleData.setTimer.sec1}
                  onChange={(e) => handleTextChange(e, "sec1")}
                  className="outline-none border border-slate-300 w-7 px-2 py-1 rounded-md"
                />
                <input
                  maxLength={1}
                  value={puzzleData.setTimer.sec2}
                  onChange={(e) => handleTextChange(e, "sec2")}
                  className="outline-none border border-slate-300 w-7 px-2 py-1 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Win Sound</label>
          <PuzzleSoundEffect label="win" handleSoundData={handleSoundData} />
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Time-up Sound</label>
          <PuzzleSoundEffect label="timeUp" handleSoundData={handleSoundData} />
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Retry Limit</label>
          <select
            value={puzzleData.retryLimit}
            className="w-20 border border-slate-700 rounded-md outline-none px-1 bg-[#F1F5F9]"
            onChange={(e) => handleNumberChange(e, "retryLimit")}
          >
            <option>2</option>
            <option>3</option>
            <option>5</option>
          </select>
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Coupon Code</label>
          <input
            value={puzzleData.couponCode}
            onChange={(e) => handleTextChange(e, "couponCode")}
            className="py-1 px-2  outline-none bg-[#F1F5F9] border border-slate-200"
          />
        </div>
      </div>
    </div>
  );
};

export default PuzzleSetting;
