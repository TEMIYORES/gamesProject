import React, { useState } from "react";
import ColorPicker2 from "../ColorPicker";
import { AddCircle } from "iconsax-react";
import {
  getSpinTheWheelSetting,
  setSpinTheWheelSetting,
  spinTheWheelType,
} from "../../slices/spinthewheel";
import { useDispatch, useSelector } from "react-redux";

interface CustomSelectProps {
  onSelectOptions: (options: string[]) => void;
}

const SpinTheWheelCustomColor: React.FC<CustomSelectProps> = ({
  onSelectOptions,
}) => {
  const spinFormData: spinTheWheelType = useSelector(getSpinTheWheelSetting);
  const [selectedOptions, setSelectedOptions] = useState(
    spinFormData.segColors
  );
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  const handleInputKeyDown = (color: string) => {
    const newOption = color.trim();
    setSelectedOptions([...selectedOptions, newOption]);
    setInputValue("");
    onSelectOptions([...selectedOptions, newOption]); // Callback to parent component
  };
  const handleColorWheel = (color: string) => {
    const updateSpinFormData = { ...spinFormData };
    updateSpinFormData.segColors = [...updateSpinFormData.segColors, color];
    setInputValue(color);
  };

  const handleRemoveOption = (optionToRemove: string) => {
    const updateSpinFormData = { ...spinFormData };

    updateSpinFormData.segColors = updateSpinFormData.segColors.filter(
      (option) => option !== optionToRemove
    );
    setSelectedOptions(updateSpinFormData.segColors);
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };

  return (
    <div className="border border-slate-300 bg-inputBg">
      <div className="w-full grid grid-cols-4 gap-2 px-2 py-1 items-center rounded-sm">
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
        <div className="flex place-items-center gap-2">
          <ColorPicker2
            defaultColor="#000"
            name=""
            handleColorWheel={handleColorWheel}
          />
          {inputValue && (
            <button onClick={() => handleInputKeyDown(inputValue)}>
              <AddCircle size="20" color="#00ff00" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default SpinTheWheelCustomColor;
