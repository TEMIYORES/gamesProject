import React, { useState } from "react";
import ColorPicker2 from "./ColorPicker";
import { AddCircle } from "iconsax-react";

interface SelectedOption {
  value: string;
}
interface CustomSelectProps {
  onSelectOptions: (options: SelectedOption[]) => void;
}

const CustomColor: React.FC<CustomSelectProps> = ({ onSelectOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputKeyDown = (color: string) => {
    const newOption: SelectedOption = {
      value: color.trim(),
    };
    setSelectedOptions([...selectedOptions, newOption]);
    setInputValue("");
    onSelectOptions([...selectedOptions, newOption]); // Callback to parent component
  };
  const handleColorWheel = (color: string) => {
    setInputValue(color);
  };

  const handleRemoveOption = (optionToRemove: SelectedOption) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option.value !== optionToRemove.value
    );
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="">
      <div className="flex gap-2 bg-white px-2 py-1 items-center rounded-sm">
        {selectedOptions.map((option) => (
          <span
            key={option.value}
            className="flex gap-2 bg-[#E6E6E6] font-medium"
          >
            <span className="px-2 py-1 pr-0 whitespace-nowrap">
              {option.value}
            </span>
            <button
              className="hover:bg-rose-200 w-full px-2 py-1"
              onClick={() => handleRemoveOption(option)}
            >
              ×
            </button>
          </span>
        ))}
        <span className="ml-5">Colour of wheel</span>
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
  );
};
export default CustomColor;
