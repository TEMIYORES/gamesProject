import { useSelector } from "react-redux";
import { getSpinTheWheelSetting } from "../../slices/spinthewheel";

const PreviewSpinTheWheel = () => {
  const spinSetting = useSelector(getSpinTheWheelSetting);

  return (
    <div className="w-[60%] mx-auto justify-center flex flex-col gap-5">
      <div className="font-medium text-4xl text-center">
        {spinSetting.heading || "[header]"}
      </div>
      <div className="mt-2 text-center">
        {spinSetting.description || "[description]"}
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="w-full flex gap-4">
          <input
            className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
            placeholder="Firstname"
            disabled
          />
          <input
            className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
            placeholder="Lastname"
            disabled
          />
        </div>
        <input
          type="email"
          className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
          placeholder="email"
          disabled
        />
      </div>
      <button className="p-3 bg-primary text-white rounded-md">
        Start Spinning
      </button>
    </div>
  );
};

export default PreviewSpinTheWheel;
