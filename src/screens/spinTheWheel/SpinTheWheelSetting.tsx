import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpinTheWheelSetting,
  setSpinTheWheelSetting,
  spinTheWheelProbabilityType,
  spinTheWheelType,
} from "../../slices/spinthewheel";
import { toast } from "react-toastify";
// import { v4 as uuid } from "uuid";
import SpinTheWheelCustomInput from "../../components/spinTheWheel/SpinTheWheelCustomInput";
// import SpinTheWheelCustomColor from "../../components/spinTheWheel/SpinTheWheelCustomColor";
import SpinTheWheelColorPicker from "../../components/spinTheWheel/SpinTheWheelColorPicker";
import SpinTheWheelImageUploader from "../../components/spinTheWheel/SpinTheWheelImageUploader";

const SpinTheWheelSetting = () => {
  const spinFormData: spinTheWheelType = useSelector(getSpinTheWheelSetting);
  const dispatch = useDispatch();

  const handleNumberOfSpins = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    // Allow positive numbers only

    if (isNaN(inputValue) || inputValue >= 0) {
      const updateSpinFormData = { ...spinFormData };
      updateSpinFormData.numberOfSpins = inputValue;
      dispatch(setSpinTheWheelSetting(updateSpinFormData));
    }
    if (isNaN(inputValue)) {
      const updateSpinFormData = { ...spinFormData };
      updateSpinFormData.numberOfSpins = 1;
      dispatch(setSpinTheWheelSetting(updateSpinFormData));
    }
  };

  const handleBlur = () => {
    const contents: spinTheWheelProbabilityType[] = spinFormData.segments.map(
      (item: string, index: number) => ({
        label: item.trim(),
        probability: spinFormData.gameSetting[index]?.probability || 100,
        coupon_code: spinFormData.gameSetting[index]?.coupon_code || "",
        isWin: spinFormData.gameSetting[index]?.isWin || "win",
        color: spinFormData.gameSetting[index]?.color || "#000000",
        wheelColor: spinFormData.gameSetting[index]?.wheelColor || "#ffffff",
      })
    );
    const updateSpinFormData = { ...spinFormData };
    updateSpinFormData.gameSetting = contents;
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };
  const handlePercentageChange = (index: number, value: string) => {
    const updateSpinFormData = { ...spinFormData };
    const updatedContents = [...spinFormData.gameSetting];
    updatedContents[index] = {
      ...updatedContents[index],
      probability: parseInt(value, 10) || 0,
    };
    updateSpinFormData.gameSetting = updatedContents;
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };
  const handleCouponCode = (index: number, value: string) => {
    const updateSpinFormData = { ...spinFormData };
    const updatedContents = [...spinFormData.gameSetting];
    updatedContents[index] = {
      ...updatedContents[index],
      coupon_code: value,
    };
    updateSpinFormData.gameSetting = updatedContents;
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };
  const handleSelectChange = (index: number, value: string) => {
    const updateSpinFormData = { ...spinFormData };
    const updatedContents = [...spinFormData.gameSetting];
    if (value === "win" || value === "no_win") {
      updatedContents[index] = {
        ...updatedContents[index],
        isWin: value,
      };
      updateSpinFormData.gameSetting = updatedContents;
      dispatch(setSpinTheWheelSetting(updateSpinFormData));
    }
  };
  const handleColorWheel = (color: string, index: number) => {
    const updateSpinFormData = { ...spinFormData };
    if (index !== undefined) {
      updateSpinFormData.gameSetting = updateSpinFormData.gameSetting.map(
        (items, index2) => {
          if (index === index2) {
            items = { ...items, color: color };
          }
          return items;
        }
      );
    }
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };
  // const [segColors, setSegcolors] = useState<string[]>();
  const handleWheelColorWheel = (color: string, index: number) => {
    // setSegcolors([])
    const updateSpinFormData = { ...spinFormData };
    if (index !== undefined) {
      const segColors: string[] = [];
      updateSpinFormData.gameSetting = updateSpinFormData.gameSetting.map(
        (items, index2) => {
          if (index === index2) {
            console.log(updateSpinFormData.segColors);
            items = { ...items, wheelColor: color };
          }
          segColors.push(items.wheelColor);
          return items;
        }
      );
      updateSpinFormData.segColors = segColors;
    }
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };
  const handleInputBlur = () => {
    // Ensure at least one input is not zero
    const allZero = spinFormData.gameSetting.every(
      (item) => item.probability === 0
    );
    if (allZero) {
      const updateSpinFormData = { ...spinFormData };
      // Find the first input and set it to 1 if all inputs are zero
      const updatedProbability = [...spinFormData.gameSetting];
      updatedProbability[0] = { ...updatedProbability[0], probability: 1 };
      updateSpinFormData.gameSetting = updatedProbability;
      dispatch(setSpinTheWheelSetting(updateSpinFormData));
      toast.warn("Atleast one content probability must be 1");
    }
  };
  const handleSelectedOptions = (selectedOptions: string[]) => {
    // Do something with the selected options in this component
    const updateSpinFormData = { ...spinFormData };
    updateSpinFormData.segments = selectedOptions;
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };
  // const handleSelectedColors = (selectedOptions: string[]) => {
  //   // Do something with the selected options in this component
  //   const updateSpinFormData = { ...spinFormData };
  //   updateSpinFormData.segColors = selectedOptions;
  //   dispatch(setSpinTheWheelSetting(updateSpinFormData));
  // };
  const handleImageClear = (name: string) => {
    const updateSpinFormData = { ...spinFormData };
    if (name === "spinner") {
      updateSpinFormData.spinner = {
        ...updateSpinFormData.spinner,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "background") {
      updateSpinFormData.background = {
        ...updateSpinFormData.background,
        imgName: "",
        imgUrl: "",
      };
    }
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };
  const handleSpinnerStyle = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      const updateSpinFormData = { ...spinFormData };
      updateSpinFormData.spinnerStyle = e.target.value;
      dispatch(setSpinTheWheelSetting(updateSpinFormData));
    }
  };
  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string
  ) => {
    const updateSpinFormData = { ...spinFormData };
    if (content === "description") {
      updateSpinFormData.gameDescription = e.target.value;
    }
    if (content === "heading") {
      updateSpinFormData.gameHeading = e.target.value;
    }
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
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
            value={spinFormData.gameHeading}
          />
        </div>
        <div className="w-full flex gap-5">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            onChange={(e) => handleTextChange(e, "description")}
            value={spinFormData.gameDescription}
            id="description"
            rows={5}
            cols={30}
            className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
          />
        </div>
      </div>
      <h3 className="my-5 text-slate-500 font-semibold">Wheel Setting</h3>
      <div className="flex flex-col items-center w-full pl-3">
        <div className="w-full flex flex-col my-3 bg-input_bg rounded-xl">
          <label htmlFor="contents" className="mb-2 font-semibold">
            Content on wheel
          </label>
          <SpinTheWheelCustomInput
            onSelectOptions={handleSelectedOptions}
            onblur={handleBlur}
          />
        </div>
        {/* <div className="w-full flex flex-col py-2 mb-3 bg-input_bg rounded-xl">
          <label htmlFor="contents" className="mb-2 font-semibold">
            Color of wheel (Sections)
          </label>

          <SpinTheWheelCustomColor onSelectOptions={handleSelectedColors} />
        </div> */}
        <div className="w-full flex justify-start self-start">
          <div className="font-semibold flex flex-col gap-5 min-w-[50%]">
            <div className="flex place-items-center gap-3">
              <span className="w-4/5 whitespace-nowrap">Spinner</span>
              <div className="w-1/5 flex justify-end">
                <SpinTheWheelColorPicker
                  defaultColor={spinFormData.spinner.color || "#000000"}
                  name="spinner"
                />
              </div>
              <SpinTheWheelImageUploader name="spinner" />
              {spinFormData.spinner.imgName && (
                <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                  {spinFormData.spinner.imgName}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleImageClear("spinner");
                    }}
                  >
                    x
                  </span>
                </span>
              )}
            </div>
            <div className="flex place-items-center w-full">
              <span className="w-4/5 whitespace-nowrap">Spinner Style</span>
              <div className="w-4/5 flex justify-end">
                <select
                  value={spinFormData.spinnerStyle}
                  className="py-1 px-2 border-none outline-none  w-full bg-[#F1F5F9] rounded-full"
                  onChange={handleSpinnerStyle}
                >
                  <option>Select a style</option>
                  <option>Center</option>
                  <option>Top</option>
                  <option>Left</option>
                  <option>Right</option>
                  <option>Bottom</option>
                </select>
              </div>
            </div>
            <div className="flex place-items-center gap-3">
              <span className="w-4/5 whitespace-nowrap">Border</span>
              <div className="w-1/5 flex justify-end">
                <SpinTheWheelColorPicker
                  defaultColor={spinFormData.border || "#000000"}
                  name="border"
                />
              </div>
            </div>
            <div className="flex place-items-center gap-3">
              <span className="w-4/5 whitespace-nowrap">Background</span>
              <div className="w-1/5 flex justify-end">
                <SpinTheWheelColorPicker
                  defaultColor={spinFormData.background.color || "#000000"}
                  name="background"
                />
              </div>
              <SpinTheWheelImageUploader name="background" />
              {spinFormData.background.imgName && (
                <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                  {spinFormData.background.imgName}
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
          </div>
        </div>
        <div className="w-full flex flex-col py-2 my-5 bg-input_bg rounded-xl">
          <label htmlFor="contents" className="mb-2 font-semibold">
            Number of Spins
          </label>
          <input
            type="number"
            id="numberInput"
            min={1}
            className="py-2 px-2 border-none outline-none bg-inputBg"
            value={spinFormData.numberOfSpins}
            onChange={handleNumberOfSpins}
          />
        </div>
        <div className="w-full flex flex-col py-2 mb-3 bg-input_bg rounded-xl">
          <div className="grid grid-cols-6 mb-5">
            <label className="font-semibold text-center"></label>
            <label className="font-semibold text-center">Probability</label>
            <label className="font-semibold text-center">Coupon code</label>
            <label className="font-semibold text-center">Win/No Win</label>
            <label className="font-semibold text-center">Wheel Color</label>
            <label className="font-semibold text-center">Text Color</label>
          </div>
          <div className="w-full flex flex-col gap-y-3">
            {spinFormData.gameSetting.map((content, index) => (
              <div key={index} className="w-full grid grid-cols-6 gap-x-5">
                <div className="flex place-items-center">
                  <div>{content.label}</div>
                </div>
                <div>
                  <input
                    value={content.probability}
                    placeholder="Percentage"
                    className="py-1 px-2 border-none outline-none w-full bg-inputBg"
                    onChange={(e) =>
                      handlePercentageChange(index, e.target.value)
                    }
                    onBlur={handleInputBlur}
                  />
                </div>
                <div>
                  <input
                    value={content.coupon_code}
                    onChange={(e) => handleCouponCode(index, e.target.value)}
                    className="py-1 px-2 border-none outline-none bg-inputBg w-full"
                  />
                </div>
                <div>
                  <select
                    value={content.isWin}
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                    className="py-1 px-2 border-none outline-none bg-inputBg w-full"
                  >
                    <option value={"win"}>Win</option>
                    <option value={"no_win"}>No Win</option>
                  </select>
                </div>
                <div className="flex place-items-center justify-center">
                  <SpinTheWheelColorPicker
                    defaultColor={content.wheelColor}
                    name={index.toString()}
                    handleColorWheel={handleWheelColorWheel}
                  />
                </div>
                <div className="flex place-items-center justify-center">
                  <SpinTheWheelColorPicker
                    defaultColor={content.color}
                    name={index.toString()}
                    handleColorWheel={handleColorWheel}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-around items-center">
        {/* <ClickEffectButton label={"Update Wheel"} clickFunction={() => {}} /> */}
      </div>
    </div>
  );
};

export default SpinTheWheelSetting;
