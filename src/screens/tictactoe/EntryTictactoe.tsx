import { useSelector } from "react-redux";
import { getTictactoeData } from "../../slices/tictactoe";

const EntryTictactoe = () => {
  const tictactoeData = useSelector(getTictactoeData);

  return (
    <div className="w-[60%] mx-auto justify-center flex flex-col gap-5">
      <div className="font-medium text-4xl text-center">
        {tictactoeData.heading || "[header]"}
      </div>
      <div className="mt-2 text-center">
        {tictactoeData.description || "[description]"}
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
        Start Tic Tac Toe
      </button>
    </div>
  );
};

export default EntryTictactoe;
