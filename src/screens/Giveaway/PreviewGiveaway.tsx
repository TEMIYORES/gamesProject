import { useSelector } from "react-redux";
import { getGiveawayData } from "../../slices/giveaway";
import AutoPreview from "./type/AutoPreview";
import ManualPreview from "./type/ManualPreview";
import UserPreview from "./type/UserPreview";

const PreviewGiveaway = () => {
  const giveawayData = useSelector(getGiveawayData);

  return (
    <>
      <div
        style={{
          backgroundColor: giveawayData.background.color,
          backgroundImage: `url(${giveawayData.background.imgUrl})`,
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="py-10 flex flex-col items-center"
      >
        {giveawayData.selectType === "Auto" && <AutoPreview />}
        {giveawayData.selectType === "Manual" && <ManualPreview />}
        {giveawayData.selectType === "User Generated" && <UserPreview />}
      </div>
    </>
  );
};

export default PreviewGiveaway;
