import GameSidebar from "../../components/GameSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getGameType } from "../../slices/gameType";
import { ChangeEvent, useEffect, useState } from "react";
import monitorImage from "../../assets/monitor.png";
import phoneImage from "../../assets/mobile-phone.png";
import cancelImage from "../../assets/cancel.png";
import reloadImage from "../../assets/reload.png";
import {
  getSpinTheWheelSetting,
  setSpinTheWheelSetting,
  spinTheWheelType,
} from "../../slices/spinthewheel";
import PreviewSpinTheWheel from "../spinTheWheel/EntrySpinTheWheel";
import { Add, Trash } from "iconsax-react";
import RedirectSpinTheWheel from "../spinTheWheel/RedirectSpinTheWheel";
import { EnvelopeOpen, FacebookLogo, TwitterLogo } from "@phosphor-icons/react";
import SpinTheWheelImageUploader from "../../components/spinTheWheel/SpinTheWheelImageUploader";
import { toast } from "react-toastify";
import { setAllGames } from "../../slices/allGames";
import { useNavigate } from "react-router";
const Redirect = () => {
  const gameType = useSelector(getGameType);
  const spinSetting = useSelector(getSpinTheWheelSetting);
  const dispatch = useDispatch();
  const [selectedGame, setSelectGameSetting] =
    useState<spinTheWheelType | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (gameType === "Spin the wheel") {
      setSelectGameSetting(spinSetting);
    }
  }, [gameType, spinSetting]);

  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string
  ) => {
    const updateScratchCardData = { ...selectedGame };
    if (content === "description") {
      updateScratchCardData.redirectDescription = e.target.value;
    }
    if (content === "heading") {
      updateScratchCardData.redirectHeading = e.target.value;
    }
    dispatch(setSpinTheWheelSetting(updateScratchCardData));
  };
  const handleImageClear = (name: string) => {
    const updateSpinFormData = { ...selectedGame };
    if (name === "redirect_bg") {
      updateSpinFormData.redirectBackground = {
        ...updateSpinFormData.redirectBackground!,
        imgName: "",
        imgUrl: "",
      };
    }
    dispatch(setSpinTheWheelSetting(updateSpinFormData));
  };
  const PublishGame = () => {
    let publishedGames;
    if (localStorage.getItem("publishedGames")) {
      publishedGames = JSON.parse(localStorage.getItem("publishedGames") || "");
    }
    console.log({ publishedGames });
    if (publishedGames) {
      const updateSelectedGame = { ...selectedGame };
      updateSelectedGame.createDate = new Date();
      updateSelectedGame.gameStatus = "published";
      const duplicateGame = publishedGames.filter(
        (game: any) => game.id === updateSelectedGame.id
      );
      if (duplicateGame.length) {
        toast.warn("Game already saved!");
        dispatch(setSpinTheWheelSetting({}));
        navigate("/");
        return;
      }
      const updatedGames = [...publishedGames, updateSelectedGame];
      const uniqueGames = Array.from(
        new Set(updatedGames.map((item) => item.id))
      ).map((id) => {
        return updatedGames.find((item) => item.id === id);
      });
      dispatch(setAllGames([uniqueGames]));
      localStorage.setItem("publishedGames", JSON.stringify(uniqueGames));
      toast.success("Game published successfully");
      dispatch(setSpinTheWheelSetting({}));
      navigate("/");
    } else {
      const updateSelectedGame = { ...selectedGame };
      updateSelectedGame.createDate = new Date();
      updateSelectedGame.gameStatus = "published";
      dispatch(setAllGames([updateSelectedGame]));
      localStorage.setItem(
        "publishedGames",
        JSON.stringify([updateSelectedGame])
      );
      toast.success("Game published successfully");
      dispatch(setSpinTheWheelSetting({}));
      navigate("/");
    }
  };
  return (
    <div className="flex">
      <div className="hidden md:flex w-[25%] lg:w-[30%] xl:w-[30%] bg-white sticky top-0 bottom-0 left-0 h-screen overflow-y-auto flex-col items-start border border-black scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <GameSidebar />
        <div className="w-full mt-5 p-2">
          <h3 className="mb-5 text-slate-500 font-semibold">Page Setting</h3>
          <div className="w-full pl-3 flex flex-col gap-5">
            <div className="w-full flex place-items-center gap-5">
              <label htmlFor="heading" className="font-semibold">
                Heading
              </label>
              <input
                id="heading"
                className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
                onChange={(e) => handleTextChange(e, "heading")}
                value={selectedGame?.redirectHeading}
              />
            </div>
            <div className="w-full flex gap-5">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                onChange={(e) => handleTextChange(e, "description")}
                value={selectedGame?.redirectDescription}
                id="description"
                rows={5}
                cols={30}
                className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
              />
            </div>
            <div className="w-full flex gap-5">
              <label htmlFor="description" className="font-semibold">
                Background
              </label>
              <SpinTheWheelImageUploader name="redirect_background" />
              {selectedGame?.redirectBackground.imgName && (
                <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                  {selectedGame?.redirectBackground.imgName}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleImageClear("redirect_bg");
                    }}
                  >
                    x
                  </span>
                </span>
              )}
            </div>
            <div>
              <label htmlFor="fields" className="font-semibold">
                Fields
              </label>
              <div className="w-[95%] flex flex-col gap-3 mt-3">
                <div className="flex gap-4 place-items-center">
                  <div className="place-items-center p-3 rounded-md bg-inputBg flex gap-3 w-[90%]">
                    <FacebookLogo size={32} color="#150080" weight="fill" />
                    <span>Facebook</span>
                  </div>
                  <Trash size="28" color="#9c9c9c" variant="Bold" />
                </div>
                <div className="flex gap-4 place-items-center">
                  <div className="place-items-center p-3 rounded-md bg-inputBg flex gap-3 w-[90%]">
                    <TwitterLogo size="28" color="#150080" weight="fill" />
                    <span>Twitter</span>
                  </div>
                  <Trash size="28" color="#9c9c9c" variant="Bold" />
                </div>
                <div className="flex gap-4 place-items-center">
                  <div className="place-items-center p-3 rounded-md bg-inputBg flex gap-3 w-[90%]">
                    <EnvelopeOpen size={32} color="#150080" weight="fill" />
                    <span>Email Address</span>
                  </div>
                  <Trash size="28" color="#9c9c9c" variant="Bold" />
                </div>
                <div className="p-3 flex gap-1 place-items-center cursor-pointer">
                  <Add size="20" color="#150080" />
                  Add Socials
                </div>
              </div>
              <button
                className="bg-primary text-white rounded-md p-3 w-2/5"
                onClick={PublishGame}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-[60%] sticky top-0 bottom-0 left-0 h-screen overflow-y-auto flex-col items-start border pt-10 px-10">
        <div className="w-1/5 mx-auto grid grid-cols-4 place-items-center">
          <img
            src={monitorImage}
            alt="monitor"
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
          <img
            src={phoneImage}
            alt="monitor"
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
          <img
            src={cancelImage}
            alt="monitor"
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
          <img
            src={reloadImage}
            alt="monitor"
            className="bg-white p-3 rounded-lg border-2 border-slate-300 cursor-pointer"
          />
        </div>
        <div className="w-full h-full items-start border-4 border-slate-300 bg-white rounded-md">
          <div className="flex place-items-center w-[95%] mx-auto gap-10 my-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-bgAccent rounded-full"></div>
              <div className="w-3 h-3 bg-bgAccent rounded-full"></div>
              <div className="w-3 h-3 bg-bgAccent rounded-full"></div>
            </div>
            <div className="bg-bgAccent rounded-lg w-full h-7 flex place-items-center px-2 text-sm">
              {location.href + "/" + selectedGame?.id}
            </div>
          </div>
          <div className="w-full mt-20 flex flex-col place-items-center justify-center">
            {gameType === "Spin the wheel" && <RedirectSpinTheWheel />}
            {gameType === "Scratch Card" && <PreviewSpinTheWheel />}
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-disabled text-center">
            Powered by Gamelogo
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
