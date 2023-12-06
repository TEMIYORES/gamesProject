import { useState } from "react";

const ClickEffectButton = ({
  label,
  clickFunction,
}: {
  label: string;
  clickFunction: () => void;
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000); // Reset the clicked state after 300 milliseconds
    clickFunction();
  };

  return (
    <button
      type="submit"
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-300 ${
        clicked ? "bg-blue-700" : ""
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ClickEffectButton;
