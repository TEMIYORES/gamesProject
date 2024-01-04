import React, { useState } from "react";
import {
  getSpinTheWheelSetting,
  setSpinTheWheelSetting,
  spinTheWheelType,
} from "../../slices/spinthewheel";
import { useDispatch, useSelector } from "react-redux";

interface CustomSelectProps {
  onSelectOptions: (options: string[]) => void;
  onblur: () => void;
}

const SpinTheWheelCustomInput: React.FC<CustomSelectProps> = ({
  onSelectOptions,
  onblur,
}) => {
  const spinFormData: spinTheWheelType = useSelector(getSpinTheWheelSetting);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    spinFormData.segments
  );
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        const newOption = inputValue.trim();
        setSelectedOptions([...selectedOptions, newOption]);
        setInputValue("");
        onSelectOptions([...selectedOptions, newOption]); // Callback to parent component
      }
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    const updateSpinFormData = { ...spinFormData };
    updateSpinFormData.segments = updateSpinFormData.segments.filter(
      (option) => option !== optionToRemove
    );
    setSelectedOptions(updateSpinFormData.segments);
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };

  return (
    <div className="">
      <div className="grid grid-cols-4 gap-2 px-2 py-1 items-center rounded-sm bg-inputBg">
        {selectedOptions.map((option) => (
          <span key={option} className="flex gap-2 bg-[#E6E6E6] font-medium">
            <span className="px-2 py-1 pr-0 whitespace-nowrap">{option}</span>
            <button
              className="hover:bg-rose-200 w-full px-2 py-1"
              onClick={() => handleRemoveOption(option)}
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className="p-2 outline-none border-none w-full col-span-2"
          value={inputValue}
          onBlur={onblur}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type and separate by comma or enter"
        />
      </div>
    </div>
  );
};
export default SpinTheWheelCustomInput;
