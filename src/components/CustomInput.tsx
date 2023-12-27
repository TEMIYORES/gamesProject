import React, { useState } from "react";

interface SelectedOption {
  value: string;
}
interface CustomSelectProps {
  onSelectOptions: (options: SelectedOption[]) => void;
  onblur: () => void;
}

const CustomInput: React.FC<CustomSelectProps> = ({
  onSelectOptions,
  onblur,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        const newOption: SelectedOption = {
          value: inputValue.trim(),
        };
        setSelectedOptions([...selectedOptions, newOption]);
        setInputValue("");
        onSelectOptions([...selectedOptions, newOption]); // Callback to parent component
      }
    }
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
        <input
          type="text"
          className="p-2 outline-none border-none w-full"
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
export default CustomInput;
