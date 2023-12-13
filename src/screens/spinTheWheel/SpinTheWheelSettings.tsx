import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { setSpinTheWheelSettings } from "../../slices/spinthewheelSettings";
import { Link } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import ClickEffectButton from "../../components/ClickEffectButton";
import ColorPicker from "../../components/ColorPicker";

const SpinTheWheelSettings = () => {
  const [contentsErr, setContentsErr] = useState<string | undefined>(undefined);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFormValid, setisFormValid] = useState<boolean>(false);
  const [probability, setProbability] = useState<
    { label: string; percentage: number }[]
  >([]);
  const [selectedBorderColor, setSelectedBorderColor] = useState<string[]>([]);
  const [selectedSpinnerColor, setSelectedSpinnerColor] = useState<string[]>(
    []
  );
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<
    string[]
  >([]);
  const [numberofspins, setnumberofspins] = useState<number | string>(""); // Initializing value as 0
  const handleNumberOfSpins = (e: any) => {
    const inputValue = parseInt(e.target.value, 10);
    // Allow positive numbers only
    if (isNaN(inputValue) || inputValue >= 0) {
      setnumberofspins(inputValue);
      if (isNaN(inputValue)) {
        setnumberofspins(1);
      }
    }
  };
  const form = useForm({
    defaultValues: {
      contents: "",
    },
  });
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  let errContents = errors?.contents?.message;
  useEffect(() => {
    setContentsErr(errContents);
  }, [errContents]);
  const onSubmit = async (data: any) => {
    setContentsErr(undefined);
    try {
      const segments: string[] = data.contents
        .split(",")
        .map((content: string) => content.trim());
      if (segments.length < 2) {
        setContentsErr("Contents must be atleast 2");
      }
      const formData = {
        segments,
        segColors: selectedColors,
        backgroundColor: selectedBackgroundColor,
        spinnerColor: selectedSpinnerColor,
        primaryColor: selectedBorderColor,
        numberOfSpins: numberofspins,
        probability: probability,
      };
      setisFormValid(true);
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
  const handleSearchInputChange = (query: any) => {
    console.log("colors", query.length);
    console.log("probability", probability.length);
    if (query.length <= probability.length) {
      if (query) {
        const selectedOptions = (query as Option[]).map(
          (option) => option.value
        );
        setSelectedColors([...selectedOptions]);
      } else {
        setSelectedColors([]);
      }
    }
  };
  const isOptionDisabled = (option: Option): boolean => {
    return (
      selectedColors.length >= probability.length &&
      !selectedColors.find((item: any) => item === option.value)
    );
  };

  const handleBorderColor = (data: any) => {
    setSelectedBorderColor(data.value);
  };
  const handleBackgroundColor = (data: any) => {
    setSelectedBackgroundColor(data);
    console.log(data);
  };
  const handleSpinnerColor = (data: any) => {
    setSelectedSpinnerColor(data.value);
  };
  const handleBlur = (event: any) => {
    const contents = event.target.value.split(",").map((item: string) => ({
      label: item.trim(),
      percentage: 100,
    }));
    setProbability(contents);
  };
  const handlePercentageChange = (index: number, value: string) => {
    const updatedContents = [...probability];
    updatedContents[index].percentage = parseInt(value, 10) || 0;
    setProbability(updatedContents);
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
                {...register("contents", { required: "Content is required" })}
                placeholder="Enter contents separated by comma ','"
                className="py-2 px-2 border border-slate-400 outline-none"
                onBlur={handleBlur}
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
                <ColorPicker handleColorChange={handleBackgroundColor} />
              </div>
              <div className="flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                <label htmlFor="contents" className="mb-2 font-bold">
                  Wheel Spinner Color
                </label>
                <ColorPicker handleColorChange={handleSpinnerColor} />
              </div>
              <div className="flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
                <label htmlFor="contents" className="mb-2 font-bold">
                  Border Color
                </label>
                <ColorPicker handleColorChange={handleBorderColor} />

                {/* <Select
                classNames={{
                  control: () => "border border-none shadow-none rounded-md ",
                }}
                className="w-full outline-none shadow-none border-none"
                options={query}
                placeholder="Search..."
                onChange={handleBorderColor}
              /> */}
              </div>
            </div>
            <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Number of Spins
              </label>
              <input
                type="number"
                id="numberInput"
                placeholder="0"
                className="py-2 px-2 border-none outline-none"
                value={numberofspins}
                onChange={handleNumberOfSpins}
              />
            </div>
            <div className="w-full flex flex-col px-5 py-2 mb-3 bg-input_bg rounded-xl">
              <label htmlFor="contents" className="mb-2 font-bold">
                Set probability
              </label>
              <div className="w-full flex flex-col gap-y-3">
                {probability.map((content, index) => (
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
