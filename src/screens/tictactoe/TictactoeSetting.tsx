import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent } from "react";
import {
  Sound,
  getTictactoeData,
  setTictactoe,
  tictactoeType,
} from "../../slices/tictactoe";
import TictactoeColorPicker from "../../components/tictactoe/TictactoeColorPicker";
import TictactoeImageUploader from "../../components/tictactoe/TictactoeImageUploader";
import TictactoeSoundEffect from "../../components/tictactoe/TictactoeSoundEffect";

const TictactoeSetting = () => {
  const tictactoeData: tictactoeType = useSelector(getTictactoeData);
  const dispatch = useDispatch();

  const handleImageClear = (name?: string) => {
    const updateTictactoeData = { ...tictactoeData };
    if (name === "background") {
      updateTictactoeData.background = {
        ...updateTictactoeData.background,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "mobile_background") {
      updateTictactoeData.mobileBackground = {
        ...updateTictactoeData.mobileBackground,
        imgName: "",
        imgUrl: "",
      };
    }
    dispatch(setTictactoe(updateTictactoeData));
  };

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string
  ) => {
    const updateTictactoeData = { ...tictactoeData };
    if (content === "description") {
      updateTictactoeData.gameDescription = e.target.value;
    }
    if (content === "heading") {
      updateTictactoeData.gameHeading = e.target.value;
    }
    if (content === "couponCode") {
      updateTictactoeData.couponCode = e.target.value;
    }

    dispatch(setTictactoe(updateTictactoeData));
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLSelectElement>,
    content: string
  ) => {
    const updateTictactoeData = { ...tictactoeData };
    if (content === "retryLimit")
      updateTictactoeData.retryLimit = e.target.value;
    dispatch(setTictactoe(updateTictactoeData));
  };

  const handleSoundData: (sound: Sound | null, label: string) => void = (
    sound: Sound | null,
    label: string
  ) => {
    const updateTictactoeData = { ...tictactoeData };
    if (label === "win") {
      if (sound != null) updateTictactoeData.winSound = sound;
    }
    if (label === "lose") {
      if (sound != null) updateTictactoeData.loseSound = sound;
    }
    dispatch(setTictactoe(updateTictactoeData));
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
            value={tictactoeData.gameHeading}
          />
        </div>

        <div className="w-full flex gap-5">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            onChange={(e) => handleTextChange(e, "description")}
            value={tictactoeData.gameDescription}
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
            <TictactoeColorPicker
              defaultColor={tictactoeData.background.color || "#ffffff"}
              name="background"
            />
          </div>
          <TictactoeImageUploader name="background" />
          {tictactoeData.background.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {tictactoeData.background.imgName}
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
            <TictactoeColorPicker
              defaultColor={tictactoeData.mobileBackground.color || "#ffffff"}
              name="mobile_background"
            />
          </div>
          <TictactoeImageUploader name="mobile_background" />
          {tictactoeData.mobileBackground.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {tictactoeData.mobileBackground.imgName}
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
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Background
          </span>
          <div className="flex">
            <TictactoeColorPicker
              defaultColor={tictactoeData.gameBackground || "#ffffff"}
              name="gameBackground"
            />
          </div>
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Grid Color
          </span>
          <div className="flex">
            <TictactoeColorPicker
              defaultColor={tictactoeData.gameBackground || "#000000"}
              name="gridColor"
            />
          </div>
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            'O' Color
          </span>
          <div className="flex">
            <TictactoeColorPicker
              defaultColor={tictactoeData.oColor || "#0000ff"}
              name="oColor"
            />
          </div>
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            'X' Color
          </span>
          <div className="flex">
            <TictactoeColorPicker
              defaultColor={tictactoeData.xColor || "#000000"}
              name="xColor"
            />
          </div>
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Win Sound</label>
          <TictactoeSoundEffect label="win" handleSoundData={handleSoundData} />
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Lose Sound</label>
          <TictactoeSoundEffect
            label="lose"
            handleSoundData={handleSoundData}
          />
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Retry Limit</label>
          <select
            value={tictactoeData.retryLimit}
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
            value={tictactoeData.couponCode}
            onChange={(e) => handleTextChange(e, "couponCode")}
            className="py-1 px-2  outline-none bg-[#F1F5F9] border border-slate-200"
          />
        </div>
      </div>
    </div>
  );
};

export default TictactoeSetting;
