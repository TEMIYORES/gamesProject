import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";

interface colorPickerType {
  handleColorChange: (color: string) => void;
}
const ColorPicker: React.FC<colorPickerType> = ({ handleColorChange }) => {
  const [color, setColor] = useState<string>("#ffffff"); // Initial color

  const handleChange = (selectedColor: ColorResult) => {
    setColor(selectedColor.hex);
    handleColorChange(selectedColor.hex);
  };

  return (
    <div>
      <ChromePicker color={color} onChange={handleChange} />
    </div>
  );
};

export default ColorPicker;
