import { useSelector } from "react-redux";
import { getGiveawayData } from "../../../slices/giveaway";
import { ArchiveBox, CopySimple, ShareNetwork } from "@phosphor-icons/react";
import instagram from "../../../assets/insta.png";
import whatsapp from "../../../assets/whatsapp.png";
import x from "../../../assets/x.png";
import meta from "../../../assets/meta.png";
import messenger from "../../../assets/messenger.png";
import tiktok from "../../../assets/tiktok.png";
import ticket from "../../../assets/ticket.png";
import { Guid } from "../../../utils/Guid";
import { useEffect, useState } from "react";
const AutoPreview = () => {
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
  const [code, setCode] = useState("");
  useEffect(() => {
    setCode(Guid());
  }, []);
  return (
    <div className="w-1/2 flex flex-col gap-5 items-center justify-center">
      <div className="font-medium text-4xl text-center">
        {giveawayData.gameHeading || "[header]"}
      </div>
      <div className="mt-2 text-center mb-5">
        {giveawayData.gameDescription || "[description]"}
      </div>
      <div
        style={{ backgroundImage: `url(${ticket})` }}
        className="bg-center bg-cover bg-no-repeat w-80 h-40 flex justify-center items-center"
      >
        <div className="w-56 h-32 rounded-lg border-4 border-dashed border-black text-center flex items-center justify-center">
          <p className="py-5 px-5 rounded-lg border border-dashed border-black font-semibold text-xl bg-inputBg">
            {code}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5">
        {giveawayData.type.auto.enableCopy && (
          <CopySimple size={32} color="#000000" weight="fill" />
        )}
        {giveawayData.type.auto.enableDownload && (
          <ArchiveBox size={32} color="#000000" weight="fill" />
        )}
        {giveawayData.type.auto.enableShare && (
          <ShareNetwork size={32} color="#000000" weight="fill" />
        )}
      </div>
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

export default AutoPreview;
