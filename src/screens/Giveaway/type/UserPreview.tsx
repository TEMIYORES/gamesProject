import { useSelector } from "react-redux";
import { getGiveawayData } from "../../../slices/giveaway";
import instagram from "../../../assets/insta.png";
import whatsapp from "../../../assets/whatsapp.png";
import x from "../../../assets/x.png";
import meta from "../../../assets/meta.png";
import messenger from "../../../assets/messenger.png";
import imgIcon from "../../../assets/img.png";
import tiktok from "../../../assets/tiktok.png";
const UserPreview = () => {
  const giveawayData = useSelector(getGiveawayData);
  const Socials: {
    name:
      | "instagram"
      | "whatsapp"
      | "twitter"
      | "facebook"
      | "messenger"
      | "tiktok";
    img: string;
  }[] = [
    { name: "instagram", img: instagram },
    { name: "whatsapp", img: whatsapp },
    { name: "twitter", img: x },
    { name: "facebook", img: meta },
    { name: "messenger", img: messenger },
    { name: "tiktok", img: tiktok },
  ];
  const socialLinks = giveawayData.sharePlatforms;

  return (
    <div className="w-1/2 flex flex-col gap-5 items-center justify-center">
      <div className="font-medium text-4xl text-center">
        {giveawayData.gameHeading || "[header]"}
      </div>
      <div className="mt-2 text-center mb-5">
        {giveawayData.gameDescription || "[description]"}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className=" w-80 h-90 bg-[#cae2ff2d] rounded-lg py-5 px-5">
          <div className="w-full h-full backdrop-blur-lg shadow-2xl bg-white border border-blue-300 rounded-lg p-10">
            <div className="flex flex-col place-items-center gap-y-1">
              <p className="text-xl">Upload your file</p>
              <p className="text-xs text-slate-400">
                File should be an image like
              </p>
              <label htmlFor="spinnerUpload" className="w-full">
                <div className="mt-8 w-full h-32 border-dashed border-2 border-gray-400 mb-4 rounded-lg cursor-pointer flex flex-col place-items-center justify-center gap-y-2">
                  <img src={imgIcon} alt="img icon" className="w-1/5" />
                  <p className="text-xs text-slate-400">
                    Drop your file or click to browse
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
        <p className="font-semibold text-lg mb-5">OR</p>
        <p className="w-52 h-20 rounded-lg border border-black font-semibold text-xl flex items-center justify-center">
          Text
        </p>
      </div>
      <button
        style={{ backgroundColor: giveawayData.type.userGenerated.buttonColor }}
        className="text-white rounded-full py-2 px-10"
      >
        {giveawayData.type.userGenerated.buttonText}
      </button>
      <hr className="w-full border border-gray-500 border-dashed"></hr>

      {giveawayData.enableSocialShare && (
        <>
          <div className="text-center">
            <h3 className="text-xl font-medium">Win Extra Chance</h3>
            <h3>Share it with 'N' friends</h3>
          </div>
          <div className="flex items-center justify-center gap-5">
            {Socials.map(({ name, img }) => {
              if (socialLinks[name] !== "") {
                return (
                  <img
                    className="w-10 object-fill rounded-xl cursor-pointer"
                    src={img}
                    alt="social_icon"
                  />
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPreview;
