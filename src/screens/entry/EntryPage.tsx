import { useNavigate, useParams } from "react-router";

const EntryPage = () => {
  const params = useParams();
  const { gameId } = params;
  const navigate = useNavigate();

  let publishedGames;
  if (localStorage.getItem("publishedGames")) {
    publishedGames = JSON.parse(localStorage.getItem("publishedGames") || "");
  }
  const selectedGame = publishedGames.filter((item: any) => item.id === gameId);
  console.log(selectedGame);
  return (
    <div className="relative w-[40%] mx-auto justify-center flex flex-col gap-5 mt-20">
      <div className="font-medium text-4xl text-center">
        {selectedGame[0].heading || "[header]"}
      </div>
      <div className="mt-2 text-center">
        {selectedGame[0].description || "[description]"}
      </div>
      <div className="flex flex-col w-full gap-3">
        <div className="w-full flex gap-4">
          <input
            className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
            placeholder="Firstname"
          />
          <input
            className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
            placeholder="Lastname"
          />
        </div>
        <input
          type="email"
          className="bg-inputBg p-3 rounded-md tex-xl outline-none border-none flex-1"
          placeholder="email"
        />
      </div>
      <button
        className="p-3 bg-primary text-white rounded-md"
        onClick={() => navigate(`/game/${selectedGame[0].id}`)}
      >
        Start Spinning
      </button>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled text-center">
        Powered by Gamelogo
      </div>
    </div>
  );
};

export default EntryPage;
