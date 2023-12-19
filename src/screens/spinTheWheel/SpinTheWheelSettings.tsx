import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setSpinTheWheelSettings } from "../../slices/spinthewheelSettings";
import { Link } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import ClickEffectButton from "../../components/ClickEffectButton";
import ColorPicker from "../../components/ColorPicker";
import { toast } from "react-toastify";
import {
  getSpinRawFormData,
  updateSpinRawFormData,
} from "../../slices/spinRawFormData";
import { v4 as uuid } from "uuid";

export interface initialType {
  id: string;
  segments: string;
  segColors: {
    label: string;
    value: string;
  }[];
  backgroundColor: string;
  spinnerColor: string;
  primaryColor: string;
  numberOfSpins: number;
  probability: {
    label: string;
    percentage: number;
  }[];
}
const SpinTheWheelSettings = () => {
  const [contentsErr, setContentsErr] = useState<string | undefined>(undefined);
  const [isFormValid, setisFormValid] = useState<boolean>(false);
  const spinformdata = useSelector(getSpinRawFormData);
  const [spinRawFormData, setSpinRawFormData] =
    useState<initialType>(spinformdata);

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
  const form = useForm({
    defaultValues: {
      contents: "",
    },
  });
  const dispatch = useDispatch();

  const { handleSubmit, formState } = form;
  const { errors } = formState;
  const errContents = errors?.contents?.message;
  useEffect(() => {
    setContentsErr(errContents);
  }, [errContents]);
  const onSubmit = async () => {
    setContentsErr(undefined);
    try {
      const segments: string[] = spinRawFormData.segments
        .split(",")
        .map((content: string) => content.trim());
      if (segments.length < 2) {
        setContentsErr("Contents must be atleast 2");
      }
      const segColors: string[] = spinRawFormData.segColors.map(
        (content) => content.value
      );
      const id = uuid();
      const formData = {
        id,
        segments,
        segColors: segColors,
        backgroundColor: spinRawFormData.backgroundColor,
        spinnerColor: spinRawFormData.spinnerColor,
        primaryColor: spinRawFormData.primaryColor,
        numberOfSpins: spinRawFormData.numberOfSpins,
        probability: spinRawFormData.probability,
      };
      setisFormValid(true);
      dispatch(updateSpinRawFormData({ ...spinRawFormData, id }));
      dispatch(setSpinTheWheelSettings(formData));
      console.log({ formData });
    } catch (err) {
      console.log(err);
      setContentsErr(undefined);
    }
  };
  const colors = [
    { label: "Red", value: "#FF0000" },
    { label: "Green", value: "#008000" },
    { label: "Blue", value: "#0000FF" },
    { label: "Yellow", value: "#FFFF00" },
    { label: "Purple", value: "#800080" },
    { label: "Orange", value: "#FFA500" },
    { label: "Pink", value: "#FFC0CB" },
    { label: "Black", value: "#000000" },
    { label: "Brown", value: "#A52A2A" },
    { label: "Cyan", value: "#00FFFF" },
    { label: "Magenta", value: "#FF00FF" },
    { label: "Lime", value: "#00FF00" },
    { label: "Silver", value: "#C0C0C0" },
    { label: "Gray", value: "#808080" },
    { label: "Maroon", value: "#800000" },
    { label: "Olive", value: "#808000" },
    { label: "Navy", value: "#000080" },
    { label: "Teal", value: "#008080" },
    { label: "Indigo", value: "#4B0082" },
    // Add more colors as needed...
  ];
  interface Option {
    value: string;
    label: string;
  }
  const query: Option[] = colors;
  const handleSearchInputChange = (
    query: MultiValue<{ label: string; value: string }>
  ) => {
    if (query.length <= spinRawFormData.probability.length) {
      if (query) {
        const updateRawData = { ...spinRawFormData };
        updateRawData.segColors = [...query];
        setSpinRawFormData(updateRawData);
        handleRawUpdateColors([...query]);
      } else {
        const updateRawData = { ...spinRawFormData };
        updateRawData.segColors = [];
        setSpinRawFormData(updateRawData);
      }
    }
  };
  const isOptionDisabled = (option: Option): boolean => {
    return (
      spinRawFormData.segColors.length >= spinRawFormData.probability.length &&
      !spinRawFormData.segColors.find(
        (item: Option) => item.value === option.value
      )
    );
  };

  const handleBorderColor = (data: string) => {
    const updateRawData = { ...spinRawFormData };
    updateRawData.primaryColor = data;
    setSpinRawFormData(updateRawData);
  };
  const handleBackgroundColor = (data: string) => {
    const updateRawData = { ...spinRawFormData };
    updateRawData.backgroundColor = data;
    setSpinRawFormData(updateRawData);
  };
  const handleSpinnerColor = (data: string) => {
    const updateRawData = { ...spinRawFormData };
    updateRawData.spinnerColor = data;
    setSpinRawFormData(updateRawData);
  };
  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const contents = event.target.value.split(",").map((item: string) => ({
      label: item.trim(),
      percentage: 100,
    }));
    const updateRawData = { ...spinRawFormData };
    updateRawData.probability = contents;
    setSpinRawFormData(updateRawData);
  };
  const handlePercentageChange = (index: number, value: string) => {
    const updateRawData = { ...spinRawFormData };
    const updatedContents = [...spinRawFormData.probability];
    console.log(updatedContents);
    updatedContents[index] = {
      ...updatedContents[index],
      percentage: parseInt(value, 10) || 0,
    };
    updateRawData.probability = updatedContents;
    setSpinRawFormData(updateRawData);
  };
  const handleInputBlur = () => {
    // Ensure at least one input is not zero
    const allZero = spinRawFormData.probability.every(
      (item) => item.percentage === 0
    );
    if (allZero) {
      const updateRawData = { ...spinRawFormData };
      // Find the first input and set it to 1 if all inputs are zero
      const updatedProbability = [...spinRawFormData.probability];
      updatedProbability[0] = { ...updatedProbability[0], percentage: 1 };
      updateRawData.probability = updatedProbability;
      setSpinRawFormData(updateRawData);
      toast.warn("Atleast one content probability must be 1");
    }
  };

  const handleRawUpdateSegment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updateRawData = { ...spinRawFormData };
    updateRawData.segments = event.target.value;
    setSpinRawFormData(updateRawData);
  };
  const handleRawUpdateColors = (colors: Option[]) => {
    const updateRawData = { ...spinRawFormData };
    updateRawData.segColors = [...colors];
    setSpinRawFormData(updateRawData);
    console.log({ spinRawFormData });
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4 lg:p-8">
        <h2 className="font-bold text-base">Create Spin the wheel</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col items-center"
        >
          <div className="flex flex-col items-center w-full mt-5 md:mt-10 ">
            <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Content on wheel
              </label>
              <input
                id="contents"
                required
                placeholder="Enter contents separated by comma ','"
                className="py-2 px-2 border border-slate-400 outline-none"
                onBlur={handleBlur}
                onChange={handleRawUpdateSegment}
                value={spinRawFormData.segments}
              />
              <small
                className={`${
                  contentsErr === "undefined" ? "hidden" : "block text-rose-400"
                } text-red`}
              >
                {contentsErr}
              </small>
            </div>
            <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Color of wheel (Sections)
              </label>

              <Select
                classNames={{
                  control: () => "border border-none shadow-none rounded-md ",
                }}
                className="w-full outline-none shadow-none border-none"
                isMulti
                options={query}
                value={spinRawFormData.segColors}
                isOptionDisabled={isOptionDisabled}
                placeholder="Search..."
                onChange={handleSearchInputChange}
              />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:justify-between">
              <div className="flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                <label htmlFor="contents" className="mb-2 font-bold">
                  Background Color
                </label>
                <ColorPicker
                  selectedColor={spinRawFormData.backgroundColor}
                  handleColorChange={handleBackgroundColor}
                />
              </div>
              <div className="flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                <label htmlFor="contents" className="mb-2 font-bold">
                  Wheel Spinner Color
                </label>
                <ColorPicker
                  selectedColor={spinRawFormData.spinnerColor}
                  handleColorChange={handleSpinnerColor}
                />
              </div>
              <div className="flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                <label htmlFor="contents" className="mb-2 font-bold">
                  Border Color
                </label>
                <ColorPicker
                  selectedColor={spinRawFormData.primaryColor}
                  handleColorChange={handleBorderColor}
                />
              </div>
            </div>
            <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
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
            <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Set probability
              </label>
              <div className="w-full flex flex-col gap-y-3">
                {spinRawFormData.probability.map((content, index) => (
                  <div key={index} className="w-full flex gap-x-5">
                    <input
                      value={content.label}
                      placeholder="Label"
                      className="py-2 px-2 border-none outline-none mr-2 w-full disabled:bg-blue-50"
                      disabled
                    />
                    <input
                      value={content.percentage}
                      placeholder="Percentage"
                      className="py-2 px-2 border-none outline-none  w-full"
                      onChange={(e) =>
                        handlePercentageChange(index, e.target.value)
                      }
                      onBlur={handleInputBlur}
                    />
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

export default SpinTheWheelSettings;
