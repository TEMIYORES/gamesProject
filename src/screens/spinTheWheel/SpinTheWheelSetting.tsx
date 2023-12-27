import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSpinTheWheelSettings } from "../../slices/spinthewheelSettings";
import { Link } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import ClickEffectButton from "../../components/ClickEffectButton";
import { toast } from "react-toastify";
import {
  getSpinRawFormData,
  updateSpinRawFormData,
} from "../../slices/spinRawFormData";
import { v4 as uuid } from "uuid";
import CustomInput from "../../components/CustomInput";
import ColorPicker2 from "../../components/ColorPicker";
import ImageUploader from "../../components/ImageUploader";
import CustomColor from "../../components/CustomColor";

interface SelectedOption {
  value: string;
}

export interface initialType {
  id: string;
  segments: string;
  segColors: string;
  backgroundColor: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  spinnerColor: {
    imgName: string;
    imgUrl: string;
    color: string;
  };
  primaryColor: string;
  numberOfSpins: number;
  probability: {
    label: string;
    probability: number;
    coupon_code: string;
    isWin: string;
    color: string;
  }[];
}
const SpinTheWheelSetting = () => {
  const [contentsErr, setContentsErr] = useState<string | undefined>(undefined);
  const [isFormValid, setisFormValid] = useState<boolean>(false);
  const spinformdata: initialType = useSelector(getSpinRawFormData);
  const [spinRawFormData, setSpinRawFormData] =
    useState<initialType>(spinformdata);

  useEffect(() => {
    setSpinRawFormData(spinformdata);
  }, [spinformdata]);
  const handleNumberOfSpins = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    // Allow positive numbers only

    if (isNaN(inputValue) || inputValue >= 0) {
      const updateRawData = { ...spinRawFormData };
      updateRawData.numberOfSpins = inputValue;
      setSpinRawFormData(updateRawData);
      if (isNaN(inputValue)) {
        updateRawData.numberOfSpins = 1;
        setSpinRawFormData(updateRawData);
      }
    }
  };

  const dispatch = useDispatch();

  const onSubmit = async () => {
    setContentsErr(undefined);
    try {
      const segments: string[] = spinRawFormData.segments
        .split(",")
        .map((content: string) => content.trim());
      if (segments.length < 2) {
        setContentsErr("Contents must be atleast 2");
      }
      const segColors: string[] = spinRawFormData.segColors
        .split(",")
        .map((content: string) => content.trim());
      if (segColors.length < 2) {
        setContentsErr("Contents must be atleast 2");
      }
      const id = uuid();
      const formData = {
        id,
        segments,
        segColors,
        backgroundColor: spinRawFormData.backgroundColor,
        spinnerColor: spinRawFormData.spinnerColor,
        primaryColor: spinRawFormData.primaryColor,
        numberOfSpins: spinRawFormData.numberOfSpins,
        probability: spinRawFormData.probability,
      };
      console.log({ formData });
      setisFormValid(true);
      dispatch(updateSpinRawFormData({ ...spinRawFormData, id }));
      dispatch(setSpinTheWheelSettings(formData));
      console.log({ formData });
    } catch (err) {
      console.log(err);
      setContentsErr(undefined);
    }
  };

  const handleBlur = () => {
    const contents = spinRawFormData.segments
      .split(",")
      .map((item: string) => ({
        label: item.trim(),
        probability: 100,
        coupon_code: "",
        isWin: "win",
        color: "#000000",
      }));
    const updateRawData = { ...spinRawFormData };
    updateRawData.probability = contents;
    setSpinRawFormData(updateRawData);
    dispatch(updateSpinRawFormData(updateRawData));
  };
  const handlePercentageChange = (index: number, value: string) => {
    const updateRawData = { ...spinRawFormData };
    const updatedContents = [...spinRawFormData.probability];
    console.log(updatedContents);
    updatedContents[index] = {
      ...updatedContents[index],
      probability: parseInt(value, 10) || 0,
    };
    updateRawData.probability = updatedContents;
    setSpinRawFormData(updateRawData);
  };
  const handleInputBlur = () => {
    // Ensure at least one input is not zero
    const allZero = spinRawFormData.probability.every(
      (item) => item.probability === 0
    );
    if (allZero) {
      const updateRawData = { ...spinRawFormData };
      // Find the first input and set it to 1 if all inputs are zero
      const updatedProbability = [...spinRawFormData.probability];
      updatedProbability[0] = { ...updatedProbability[0], probability: 1 };
      updateRawData.probability = updatedProbability;
      setSpinRawFormData(updateRawData);
      toast.warn("Atleast one content probability must be 1");
    }
  };
  console.log({ spinRawFormData });
  const handleSelectedOptions = (selectedOptions: SelectedOption[]) => {
    // Do something with the selected options in this component
    console.log({ selectedOptions });
    const newSelectedOptions = selectedOptions
      .map((option) => option.value)
      .join(",");
    const updateRawData = { ...spinRawFormData };
    updateRawData.segments = newSelectedOptions;
    setSpinRawFormData(updateRawData);
  };
  const handleSelectedColors = (selectedOptions: SelectedOption[]) => {
    // Do something with the selected options in this component
    const newSelectedOptions = selectedOptions
      .map((option) => option.value)
      .join(",");
    const updateRawData = { ...spinRawFormData };
    updateRawData.segColors = newSelectedOptions;
    setSpinRawFormData(updateRawData);
  };
  const handleImageClear = (name: string) => {
    const updateRawData = { ...spinRawFormData };
    if (name === "spinner") {
      updateRawData.spinnerColor = {
        ...updateRawData.spinnerColor,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "background") {
      updateRawData.backgroundColor = {
        ...updateRawData.backgroundColor,
        imgName: "",
        imgUrl: "",
      };
    }
    setSpinRawFormData(updateRawData);
  };
  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string
  ) => {
    const updateScratchCardData = { ...scratchCardData };
    if (content === "description") {
      updateScratchCardData.description = e.target.value;
    }
    if (content === "heading") {
      updateScratchCardData.heading = e.target.value;
    }
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
            value={scratchCardData.heading}
          />
        </div>
        <div className="w-full flex gap-5">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            onChange={(e) => handleTextChange(e, "description")}
            value={scratchCardData.description}
            id="description"
            rows={5}
            cols={30}
            className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
          />
        </div>
      </div>
      <div className="w-full p-4 lg:p-8">
        <h2 className="font-bold text-base">Create Spin the wheel</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col items-center"
        >
          <div className="flex flex-col items-center w-full mt-5 md:mt-10 px-5">
            <div className="w-full flex flex-col py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Content on wheel
              </label>
              <CustomInput
                onSelectOptions={handleSelectedOptions}
                onblur={handleBlur}
              />
              <small
                className={`${
                  contentsErr === "undefined" ? "hidden" : "block text-rose-400"
                } text-red`}
              >
                {contentsErr}
              </small>
            </div>
            <div className="w-full flex flex-col py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Color of wheel (Sections)
              </label>

              <CustomColor onSelectOptions={handleSelectedColors} />
            </div>
            <div className="w-full flex justify-start my-5 self-start">
              <div className="font-semibold flex flex-col gap-5 min-w-[30%]">
                <div className="flex place-items-center gap-3">
                  <span className="w-4/5 whitespace-nowrap">Spinner</span>
                  <div className="w-1/5 flex justify-end">
                    <ColorPicker2 defaultColor="#3498db" name="spinner" />
                  </div>
                  <ImageUploader name="spinner" />
                  {spinRawFormData.spinnerColor.imgName && (
                    <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                      {spinRawFormData.spinnerColor.imgName}
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
                <div className="flex place-items-center">
                  <span className="w-4/5 whitespace-nowrap">Spinner Style</span>
                  <div className="w-1/5 flex justify-end">
                    {/* <ColorPicker2 defaultColor="#3498db" /> */}
                  </div>
                </div>
                <div className="flex place-items-center gap-3">
                  <span className="w-4/5 whitespace-nowrap">Border</span>
                  <div className="w-1/5 flex justify-end">
                    <ColorPicker2 defaultColor="#3498db" name="border" />
                  </div>
                  <div className="">
                    <ImageUploader name="background" />
                  </div>
                </div>
                <div className="flex place-items-center gap-3">
                  <span className="w-4/5 whitespace-nowrap">Background</span>
                  <div className="w-1/5 flex justify-end">
                    <ColorPicker2 defaultColor="#3498db" name="background" />
                  </div>
                  <ImageUploader name="background" />
                  {/* <BackgroundUploader /> */}
                  {spinRawFormData.backgroundColor.imgName && (
                    <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                      {spinRawFormData.backgroundColor.imgName}
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
              <label htmlFor="contents" className="mb-2 font-bold">
                Number of Spins
              </label>
              <input
                type="number"
                id="numberInput"
                min={1}
                className="py-2 px-2 border-none outline-none"
                value={spinRawFormData.numberOfSpins}
                onChange={handleNumberOfSpins}
              />
            </div>
            <div className="w-full flex flex-col py-2 mb-3 bg-input_bg rounded-xl">
              <div className="grid grid-cols-5 mb-5">
                <label className="font-bold text-center"></label>
                <label className="font-bold text-center">Probability</label>
                <label className="font-bold text-center">Coupon code</label>
                <label className="font-bold text-center">Win/No Win</label>
                <label className="font-bold text-center">Text Color</label>
              </div>
              <div className="w-full flex flex-col gap-y-3">
                {spinRawFormData.probability.map((content, index) => (
                  <div key={index} className="w-full grid grid-cols-5 gap-x-5">
                    <div className="flex place-items-center">
                      <div>{content.label}</div>
                    </div>
                    <div>
                      <input
                        value={content.probability}
                        placeholder="Percentage"
                        className="py-1 px-2 border-none outline-none  w-full"
                        onChange={(e) =>
                          handlePercentageChange(index, e.target.value)
                        }
                        onBlur={handleInputBlur}
                      />
                    </div>
                    <div>
                      <input
                        value={content.coupon_code}
                        className="py-1 px-2 border-none outline-none  w-full"
                      />
                    </div>
                    <div>
                      <select
                        value={content.isWin}
                        className="py-1 px-2 border-none outline-none  w-full"
                      >
                        <option value={"win"}>Win</option>
                        <option value={"no_win"}>No Win</option>
                      </select>
                    </div>
                    <div className="flex place-items-center justify-center">
                      <ColorPicker2
                        defaultColor={content.color}
                        name="probability"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-around items-center">
            <ClickEffectButton
              label={"Update Wheel"}
              clickFunction={() => {}}
            />
            {isFormValid && (
              <Link
                to="/campaigns/spin-the-wheel"
                className="flex items-center gap-2"
              >
                Go to game
                <ArrowRight size="32" color="#FF8A65" />
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpinTheWheelSetting;
