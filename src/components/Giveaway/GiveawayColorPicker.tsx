import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { getGiveawayData, setGiveaway } from "../../slices/giveaway";

interface ColorPickerProps {
  defaultColor: string;
  name: string;
  handleColorWheel?: (color: string, index: number) => void;
}

const GiveawayColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor,
  name,
  handleColorWheel,
}) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const giveawayData = useSelector(getGiveawayData);
  const dispatch = useDispatch();
  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    const updateGiveawayData = { ...giveawayData };

    if (name === "background") {
      updateGiveawayData.background = {
        ...updateGiveawayData.background,
        color: color.hex,
      };
    }
    if (name === "mobile_background") {
      updateGiveawayData.mobileBackground = {
        ...updateGiveawayData.mobileBackground,
        color: color.hex,
      };
    }
    if (name === "buttonColor") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        userGenerated: {
          ...updateGiveawayData.type.userGenerated,
          buttonColor: color.hex,
        },
      };
    }
    if (name === "autoMobileBackground") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        auto: {
          ...updateGiveawayData.type.auto,
          mobileBackground: {
            ...updateGiveawayData.type.auto.mobileBackground,
            color: color.hex,
          },
        },
      };
    }
    if (name === "codeBackground") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        auto: {
          ...updateGiveawayData.type.auto,
          codeBackground: {
            ...updateGiveawayData.type.auto.codeBackground,
            color: color.hex,
          },
        },
      };
    }
    if (name === "manualCodeBackground") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        manual: {
          ...updateGiveawayData.type.manual,
          codeBackground: {
            ...updateGiveawayData.type.manual.codeBackground,
            color: color.hex,
          },
        },
      };
    }
    if (name === "manualMobileBackground") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        manual: {
          ...updateGiveawayData.type.manual,
          mobileBackground: {
            ...updateGiveawayData.type.manual.mobileBackground,
            color: color.hex,
          },
        },
      };
    }

    dispatch(setGiveaway(updateGiveawayData));
    if (handleColorWheel !== undefined)
      handleColorWheel(color.hex, parseInt(name));
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prevState) => !prevState);
  };

  return (
    <div className="relative ">
      <div className="">
        <span className="flex place-items-center gap-1">
          <div
            style={{ backgroundColor: selectedColor }}
            className="w-5 h-5 rounded-full flex place-items-center justify-center border border-black"
          ></div>
          {showColorPicker ? (
            <ArrowUp2
              size="15"
              color="#000"
              onClick={toggleColorPicker}
              className="cursor-pointer"
            />
          ) : (
            <ArrowDown2
              size="15"
              color="#000"
              onClick={toggleColorPicker}
              className="cursor-pointer"
            />
          )}
        </span>
      </div>
      {showColorPicker && (
        <ChromePicker
          className="absolute z-10"
          color={selectedColor}
          onChange={handleColorChange}
        />
      )}
    </div>
  );
};

export default GiveawayColorPicker;
