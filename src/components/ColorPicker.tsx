import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";

interface colorPickerType {
  handleColorChange: (color: string) => void;
  selectedColor: string;
}
const ColorPicker: React.FC<colorPickerType> = ({
  handleColorChange,
  selectedColor,
}) => {
  const [color, setColor] = useState<string>("#ffffff"); // Initial color

  const handleChange = (selectedColor: ColorResult) => {
    setColor(selectedColor.hex);
    handleColorChange(selectedColor.hex);
  };

  return (
    <div>
      <ChromePicker color={selectedColor || color} onChange={handleChange} />
    </div>
  );
};

export default ColorPicker;
