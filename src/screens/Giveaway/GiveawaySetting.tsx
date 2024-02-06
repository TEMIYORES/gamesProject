import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import Select from "react-select";
import {
  getGiveawayData,
  giveawayType,
  setGiveaway,
} from "../../slices/giveaway";
import GiveawayColorPicker from "../../components/Giveaway/GiveawayColorPicker";
import GiveawayImageUploader from "../../components/Giveaway/GiveawayImageUploader";
import { ToggleLeft, ToggleRight } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { Add, Calendar, Trash } from "iconsax-react";
import { Option } from "../../utils/types";

const GiveawaySetting = () => {
  const giveawayData: giveawayType = useSelector(getGiveawayData);
  const dispatch = useDispatch();

  const handleImageClear = (name?: string) => {
    const updateGiveawayData = { ...giveawayData };
    if (name === "background") {
      updateGiveawayData.background = {
        ...updateGiveawayData.background,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "mobile_background") {
      updateGiveawayData.mobileBackground = {
        ...updateGiveawayData.mobileBackground,
        imgName: "",
        imgUrl: "",
      };
    }
    if (name === "manualCodeBackground") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        manual: {
          ...updateGiveawayData.type.manual,
          codeBackground: {
            ...updateGiveawayData.type.manual.codeBackground,
            imgName: "",
            imgUrl: "",
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
            imgName: "",
            imgUrl: "",
          },
        },
      };
    }
    if (name === "autoCodeBackground") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        auto: {
          ...updateGiveawayData.type.auto,
          codeBackground: {
            ...updateGiveawayData.type.auto.codeBackground,
            imgName: "",
            imgUrl: "",
          },
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
            imgName: "",
            imgUrl: "",
          },
        },
      };
    }

    dispatch(setGiveaway(updateGiveawayData));
  };
  const handleToggleSwitch = (name: string) => {
    const updateGiveawayData = { ...giveawayData };
    if (name === "copy") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        auto: {
          ...updateGiveawayData.type.auto,
          enableCopy: !updateGiveawayData.type.auto.enableCopy,
        },
      };
    }
    if (name === "download") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        auto: {
          ...updateGiveawayData.type.auto,
          enableDownload: !updateGiveawayData.type.auto.enableDownload,
        },
      };
    }
    if (name === "share") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        auto: {
          ...updateGiveawayData.type.auto,
          enableShare: !updateGiveawayData.type.auto.enableShare,
        },
      };
    }
    if (name === "manualCopy") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        manual: {
          ...updateGiveawayData.type.manual,
          enableCopy: !updateGiveawayData.type.manual.enableCopy,
        },
      };
    }
    if (name === "manualDownload") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        manual: {
          ...updateGiveawayData.type.manual,
          enableDownload: !updateGiveawayData.type.manual.enableDownload,
        },
      };
    }
    if (name === "manualShare") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        manual: {
          ...updateGiveawayData.type.manual,
          enableShare: !updateGiveawayData.type.manual.enableShare,
        },
      };
    }
    if (name === "enableSocialShare") {
      updateGiveawayData.enableSocialShare =
        !updateGiveawayData.enableSocialShare;
    }
    if (name === "enableFollowNow") {
      updateGiveawayData.enableFollowNow = !updateGiveawayData.enableFollowNow;
    }
    dispatch(setGiveaway(updateGiveawayData));
  };
  const handleTextChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
    content: string,
    type?: string
  ) => {
    const updateGiveawayData = { ...giveawayData };
    if (content === "description") {
      updateGiveawayData.gameDescription = e.target.value;
    }
    if (content === "heading") {
      updateGiveawayData.gameHeading = e.target.value;
    }
    if (content === "selectType") {
      updateGiveawayData.selectType = e.target.value;
    }
    if (content === "afterHeading") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        userGenerated: {
          ...updateGiveawayData.type.userGenerated,
          afterHeading: e.target.value,
        },
      };
    }
    if (content === "afterDescription") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        userGenerated: {
          ...updateGiveawayData.type.userGenerated,
          afterDescription: e.target.value,
        },
      };
    }
    if (content === "buttonText") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        userGenerated: {
          ...updateGiveawayData.type.userGenerated,
          buttonText: e.target.value,
        },
      };
    }
    if (content === "uploadType") {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        userGenerated: {
          ...updateGiveawayData.type.userGenerated,
          uploadType: e.target.value,
        },
      };
    }
    if (content === "startDate") {
      updateGiveawayData.duration = {
        ...updateGiveawayData.duration,
        startDate: e.target.value,
      };
    }
    if (content === "endDate") {
      updateGiveawayData.duration = {
        ...updateGiveawayData.duration,
        endDate: e.target.value,
      };
    }

    if (type === "share") {
      if (
        content === "facebook" ||
        content === "instagram" ||
        content === "twitter" ||
        content === "tiktok" ||
        content === "whatsapp" ||
        content === "messenger"
      ) {
        updateGiveawayData.sharePlatforms = {
          ...updateGiveawayData.sharePlatforms,
          [content]: e.target.value,
        };
      }
    } else if (type === "follow") {
      if (
        content === "facebook" ||
        content === "instagram" ||
        content === "twitter" ||
        content === "tiktok" ||
        content === "whatsapp" ||
        content === "messenger"
      ) {
        updateGiveawayData.followPlatforms = {
          ...updateGiveawayData.followPlatforms,
          [content]: e.target.value,
        };
      }
    }
    dispatch(setGiveaway(updateGiveawayData));
  };

  const [socialOption, setSocialOption] = useState<Option[]>([]);
  const [followOption, setFollowOption] = useState<Option[]>([]);

  const handleSocialChange = (selectedOption: unknown) => {
    // Handle the selected option
    if (selectedOption) {
      setSocialOption(selectedOption as Option[]);
    }
  };

  const handleFollowChange = (selectedOption: unknown) => {
    // Handle the selected option
    if (selectedOption) {
      setFollowOption(selectedOption as Option[]);
    }
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
    content: string
  ) => {
    const updateGiveawayData = { ...giveawayData };

    if (content === "participants")
      updateGiveawayData.participants = e.target.value;
    if (content === "numberOfShare")
      updateGiveawayData.numberOfShare = e.target.value;
    dispatch(setGiveaway(updateGiveawayData));
  };

  const handlePercentageChange = (index: number, value: string) => {
    const updateGiveawayData = { ...giveawayData };
    const updatedContents = [...giveawayData.type.manual.codes];
    updatedContents[index] = {
      ...updatedContents[index],
      probability: parseInt(value, 10) || 0,
    };
    updateGiveawayData.type = {
      ...updateGiveawayData.type,
      manual: {
        ...updateGiveawayData.type.manual,
        codes: updatedContents,
      },
    };
    dispatch(setGiveaway(updateGiveawayData));
  };
  const handleInputBlur = () => {
    // Ensure at least one input is not zero
    const allZero = giveawayData.type.manual.codes.every(
      (item) => item.probability === 0
    );
    if (allZero) {
      const updateGiveawayData = { ...giveawayData };
      // Find the first input and set it to 1 if all inputs are zero
      const updatedProbability = [...giveawayData.type.manual.codes];
      updatedProbability[0] = { ...updatedProbability[0], probability: 1 };
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        manual: {
          ...updateGiveawayData.type.manual,
          codes: updatedProbability,
        },
      };
      dispatch(setGiveaway(updateGiveawayData));
      toast.warn("Atleast one content probability must be 1");
    }
  };
  const handleCodeSettingTextChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    content: string,
    index: number
  ) => {
    const updateGiveawayData = { ...giveawayData };

    if (index !== undefined) {
      updateGiveawayData.type = {
        ...updateGiveawayData.type,
        manual: {
          ...updateGiveawayData.type.manual,
          codes: updateGiveawayData.type.manual.codes.map((items, index2) => {
            if (index === index2) {
              if (content === "text") {
                items = { ...items, text: e.target.value };
              }
              if (content === "value") {
                items = { ...items, value: e.target.value };
              }
            }
            return items;
          }),
        },
      };
    }
    dispatch(setGiveaway(updateGiveawayData));
  };
  const handleCodeAdd = () => {
    const updateGiveawayData = { ...giveawayData };

    const newItem = {
      label: `Code ${giveawayData.type.manual.codes.length + 1}`,
      text: "",
      value: "",
      probability: 100,
    };
    updateGiveawayData.type = {
      ...updateGiveawayData.type,
      manual: {
        ...updateGiveawayData.type.manual,
        codes: [...updateGiveawayData.type.manual.codes, newItem],
      },
    };
    dispatch(setGiveaway(updateGiveawayData));
  };
  const handleCodeRemove = (index: number) => {
    const updateGiveawayData = { ...giveawayData };

    updateGiveawayData.type = {
      ...updateGiveawayData.type,
      manual: {
        ...updateGiveawayData.type.manual,
        codes: giveawayData.type.manual.codes.slice(0, index),
      },
    };
    dispatch(setGiveaway(updateGiveawayData));
  };
  const socialOptions: Option[] = [
    { label: "Facebook", value: "facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "tiktok", label: "Tiktok" },
    { value: "whatsapp", label: "Whatsapp" },
    { value: "messenger", label: "Messenger" },
  ];
  return (
    <div className="w-full mb-5 p-2">
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
            value={giveawayData.gameHeading}
          />
        </div>

        <div className="w-full flex gap-5">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            onChange={(e) => handleTextChange(e, "description")}
            value={giveawayData.gameDescription}
            id="description"
            rows={5}
            cols={30}
            className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400"
          />
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Background
          </span>
          <div className="flex">
            <GiveawayColorPicker
              defaultColor={giveawayData.background.color || "#C3BEED"}
              name="background"
            />
          </div>
          <GiveawayImageUploader name="background" />
          {giveawayData.background.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {giveawayData.background.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("background");
                }}
              >
                x
              </span>
            </span>
          )}
        </div>
        <div className="flex place-items-center gap-3">
          <span className="w-2/5 whitespace-nowrap font-semibold">
            Mobile Background
          </span>
          <div className="flex">
            <GiveawayColorPicker
              defaultColor={giveawayData.mobileBackground.color || "#C3BEED"}
              name="mobile_background"
            />
          </div>
          <GiveawayImageUploader name="mobile_background" />
          {giveawayData.mobileBackground.imgName && (
            <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
              {giveawayData.mobileBackground.imgName}
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleImageClear("mobile_background");
                }}
              >
                x
              </span>
            </span>
          )}
        </div>
      </div>
      <h3 className="text-slate-500 font-semibold my-5">Game Setting</h3>
      <div className="w-full pl-3 flex flex-col gap-5 ">
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Type</label>
          <select
            value={giveawayData.selectType}
            className="w-25 border border-slate-700 rounded-md outline-none px-1 bg-[#F1F5F9]"
            onChange={(e) => handleTextChange(e, "selectType")}
          >
            <option>Auto</option>
            <option>User Generated</option>
            <option>Manual</option>
          </select>
        </div>
        <hr className="border border-gray-500 border-dashed"></hr>
        {giveawayData.selectType === "User Generated" && (
          <div className="flex flex-col gap-5">
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Upload Type</label>

              <select
                className="w-20 border border-slate-700 rounded-md outline-none px-1 bg-[#F1F5F9]"
                value={giveawayData.type.userGenerated.uploadType}
                onChange={(e) => handleTextChange(e, "uploadType")}
              >
                <option>File</option>
                <option>Text</option>
              </select>
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Button Text</label>
              <input
                className="py-1 px-2  outline-none bg-[#F1F5F9] border border-slate-200 rounded-lg"
                value={giveawayData.type.userGenerated.buttonText}
                onChange={(e) => handleTextChange(e, "buttonText")}
              />
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Button Color</label>
              <GiveawayColorPicker
                defaultColor={
                  giveawayData.type.userGenerated.buttonColor || "#6563FF"
                }
                name="buttonColor"
              />
            </div>
            <h3 className="text-slate-500 font-semibold my-5">
              After Submission
            </h3>
            <div className="w-full flex place-items-center gap-5">
              <label htmlFor="heading" className="font-semibold">
                Heading
              </label>
              <input
                id="heading"
                className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400 rounded-lg"
                onChange={(e) => handleTextChange(e, "afterHeading")}
                value={giveawayData.type.userGenerated.afterHeading}
              />
            </div>

            <div className="w-full flex gap-5">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                onChange={(e) => handleTextChange(e, "afterDescription")}
                value={giveawayData.type.userGenerated.afterDescription}
                id="description"
                rows={5}
                cols={30}
                className="w-[70%] border bg-[#F1F5F9] p-1 outline-slate-400 rounded-lg"
              />
            </div>
            <div className="flex place-items-center gap-3">
              <span className="w-2/5 whitespace-nowrap font-semibold">
                Upload Image
              </span>
              <GiveawayImageUploader name="uploadImage" />
              {giveawayData.type.userGenerated.uploadImage.imgName && (
                <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                  {giveawayData.type.userGenerated.uploadImage.imgName}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleImageClear("uploadImage");
                    }}
                  >
                    x
                  </span>
                </span>
              )}
            </div>
          </div>
        )}
        {giveawayData.selectType === "Auto" && (
          <div className="flex flex-col gap-5">
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Code Background</label>
              {/* <GiveawayColorPicker
                defaultColor={
                  giveawayData.type.auto.codeBackground.color || "#ffffff"
                }
                name="codeBackground"
              /> */}
              <GiveawayImageUploader name="autoCodeBackground" />
              {giveawayData.type.auto.codeBackground.imgName && (
                <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                  {giveawayData.type.auto.codeBackground.imgName}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleImageClear("autoCodeBackground");
                    }}
                  >
                    x
                  </span>
                </span>
              )}
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Mobile Background</label>
              {/* <GiveawayColorPicker
                defaultColor={
                  giveawayData.type.auto.mobileBackground.color || "#ffffff"
                }
                name="autoMobileBackground"
              /> */}
              <GiveawayImageUploader name="autoMobileBackground" />
              {giveawayData.type.auto.mobileBackground.imgName && (
                <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                  {giveawayData.type.auto.mobileBackground.imgName}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleImageClear("autoMobileBackground");
                    }}
                  >
                    x
                  </span>
                </span>
              )}
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Enable Copy</label>
              <div
                onClick={() => handleToggleSwitch("copy")}
                className="cursor-pointer"
              >
                {giveawayData.type.auto.enableCopy ? (
                  <ToggleRight size={32} color="#6563FF" weight="fill" />
                ) : (
                  <ToggleLeft size={32} color="#6563FF" weight="light" />
                )}
              </div>
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Enable Download</label>
              <div
                onClick={() => handleToggleSwitch("download")}
                className="cursor-pointer"
              >
                {giveawayData.type.auto.enableDownload ? (
                  <ToggleRight size={32} color="#6563FF" weight="fill" />
                ) : (
                  <ToggleLeft size={32} color="#6563FF" weight="light" />
                )}
              </div>
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Enable Share</label>
              <div
                onClick={() => handleToggleSwitch("share")}
                className="cursor-pointer"
              >
                {giveawayData.type.auto.enableShare ? (
                  <ToggleRight size={32} color="#6563FF" weight="fill" />
                ) : (
                  <ToggleLeft size={32} color="#6563FF" weight="light" />
                )}
              </div>
            </div>
          </div>
        )}
        {giveawayData.selectType === "Manual" && (
          <div className="flex flex-col gap-5">
            <div className="w-full pl-3 flex flex-col gap-5">
              <div className="w-full flex flex-col py-2 mb-3 bg-input_bg rounded-xl">
                <div className="grid grid-cols-9 mb-5">
                  <label className="font-bold text-center col-span-2"></label>
                  <label className="font-bold text-center whitespace-nowrap col-span-2">
                    Text
                  </label>
                  <label className="font-bold text-center whitespace-nowrap col-span-2">
                    Value
                  </label>
                  <label className="font-bold text-center whitespace-nowrap col-span-2">
                    Probability
                  </label>
                  <label className="font-bold text-center whitespace-nowrap col-span-2"></label>
                </div>
                <div className="w-full flex flex-col gap-y-3">
                  {giveawayData.type.manual.codes.map((content, index) => (
                    <div
                      key={index}
                      className="w-full grid grid-cols-9 gap-x-5"
                    >
                      <div className="flex place-items-center col-span-2">
                        <div>{content.label}</div>
                      </div>
                      <div className="col-span-2">
                        <input
                          value={content.text}
                          className="py-1 px-2 border-none rounded-md outline-none w-full bg-[#F1F5F9]"
                          onChange={(e) =>
                            handleCodeSettingTextChange(e, "text", index)
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          value={content.value}
                          className="py-1 px-2 border-none rounded-md outline-none w-full bg-[#F1F5F9]"
                          onChange={(e) =>
                            handleCodeSettingTextChange(e, "value", index)
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          value={content.probability}
                          placeholder="Percentage"
                          className="py-1 px-2 border-none rounded-md outline-none w-full bg-[#F1F5F9]"
                          onChange={(e) =>
                            handlePercentageChange(index, e.target.value)
                          }
                          onBlur={handleInputBlur}
                        />
                      </div>
                      {index === giveawayData.type.manual.codes.length - 1 &&
                        index !== 0 && (
                          <div className="col-span-1">
                            <Trash
                              size="28"
                              color="#ff0000"
                              variant="Bold"
                              className="cursor-pointer"
                              onClick={() => handleCodeRemove(index)}
                            />
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="p-3 flex gap-1 place-items-center cursor-pointer bg-primary w-fit text-white rounded-lg mb-3"
              onClick={handleCodeAdd}
            >
              <Add size="20" color="#ffffff" />
              Add Code
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Code Background</label>
              {/* <GiveawayColorPicker
                defaultColor={
                  giveawayData.type.manual.codeBackground.color || "#ffffff"
                }
                name="manualCodeBackground"
              /> */}
              <GiveawayImageUploader name="manualCodeBackground" />
              {giveawayData.type.manual.codeBackground.imgName && (
                <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                  {giveawayData.type.manual.codeBackground.imgName}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleImageClear("manualCodeBackground");
                    }}
                  >
                    x
                  </span>
                </span>
              )}
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Mobile Background</label>
              {/* <GiveawayColorPicker
                defaultColor={
                  giveawayData.type.manual.mobileBackground.color || "#ffffff"
                }
                name="manualMobileBackground"
              /> */}
              <GiveawayImageUploader name="manualMobileBackground" />
              {giveawayData.type.manual.mobileBackground.imgName && (
                <span className="bg-[#E6E6E6] py-1 px-2 flex place-items-center gap-x-2 whitespace-nowrap ">
                  {giveawayData.type.manual.mobileBackground.imgName}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleImageClear("manualMobileBackground");
                    }}
                  >
                    x
                  </span>
                </span>
              )}
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Enable Copy</label>
              <div
                onClick={() => handleToggleSwitch("manualCopy")}
                className="cursor-pointer"
              >
                {giveawayData.type.manual.enableCopy ? (
                  <ToggleRight size={32} color="#6563FF" weight="fill" />
                ) : (
                  <ToggleLeft size={32} color="#6563FF" weight="light" />
                )}
              </div>
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Enable Download</label>
              <div
                onClick={() => handleToggleSwitch("manualDownload")}
                className="cursor-pointer"
              >
                {giveawayData.type.manual.enableDownload ? (
                  <ToggleRight size={32} color="#6563FF" weight="fill" />
                ) : (
                  <ToggleLeft size={32} color="#6563FF" weight="light" />
                )}
              </div>
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Enable Share</label>
              <div
                onClick={() => handleToggleSwitch("manualShare")}
                className="cursor-pointer"
              >
                {giveawayData.type.manual.enableShare ? (
                  <ToggleRight size={32} color="#6563FF" weight="fill" />
                ) : (
                  <ToggleLeft size={32} color="#6563FF" weight="light" />
                )}
              </div>
            </div>
          </div>
        )}
        <hr className="border border-gray-500 border-dashed"></hr>

        <div className="flex flex-col place-items-start gap-3">
          <label className="font-semibold">Duration</label>
          <div className="ml-20">
            <div className="w-full flex gap-5 items-center justify-start mb-5">
              <label className="font-semibold text-slate-500">Start Date</label>
              <Calendar size="20" color="#6563FF" />
              <input
                type="date"
                value={giveawayData.duration.startDate}
                onChange={(e) => handleTextChange(e, "startDate")}
              />
            </div>
            <div className="w-full flex gap-5 items-center justify-start">
              <label className="font-semibold text-slate-500">End Date</label>
              <Calendar size="20" color="#6563FF" />
              <input
                type="date"
                value={giveawayData.duration.endDate}
                onChange={(e) => handleTextChange(e, "endDate")}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Participants</label>
          <input
            value={giveawayData.participants}
            className="py-1 px-2 w-20 rounded-md outline-none bg-[#F1F5F9] border border-slate-200"
            onChange={(e) => handleNumberChange(e, "participants")}
          />
        </div>
        <hr className="border border-gray-500 border-dashed"></hr>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Enable Social Share</label>
          <div
            onClick={() => handleToggleSwitch("enableSocialShare")}
            className="cursor-pointer"
          >
            {giveawayData.enableSocialShare ? (
              <ToggleRight size={32} color="#6563FF" weight="fill" />
            ) : (
              <ToggleLeft size={32} color="#6563FF" weight="light" />
            )}
          </div>
        </div>
        {giveawayData.enableSocialShare && (
          <>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Number of Share</label>
              <input
                value={giveawayData.numberOfShare}
                onChange={(e) => handleNumberChange(e, "numberOfShare")}
                className="py-1 px-2 rounded-md w-20 outline-none bg-[#F1F5F9] border border-slate-200"
              />
            </div>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Select Platforms</label>
              <Select
                className="w-full outline-none focus:outline-none active:outline-none  shadow-none border-none"
                isMulti
                options={socialOptions}
                placeholder="Search..."
                onChange={handleSocialChange}
              />
            </div>
            <h2 className="w-full text-center font-semibold text-lg">
              Add Link
            </h2>
            {socialOption.map((option) => {
              return (
                <div className="flex gap-10 place-items-center">
                  <label className="w-2/5 font-semibold">{option.label}</label>
                  {(option.value === "facebook" ||
                    option.value === "instagram" ||
                    option.value === "whatsapp" ||
                    option.value === "messenger" ||
                    option.value === "tiktok" ||
                    option.value === "twitter") && (
                    <input
                      value={giveawayData.sharePlatforms[option.value]}
                      onChange={(e) =>
                        handleTextChange(e, option.value, "share")
                      }
                      className="w-full rounded-md py-1 px-2 outline-none bg-[#F1F5F9] border border-slate-200"
                    />
                  )}
                </div>
              );
            })}
          </>
        )}
        <hr className="border border-gray-500 border-dashed"></hr>
        <div className="flex gap-10 place-items-center">
          <label className="w-2/5 font-semibold">Enable Follow Now</label>
          <div
            onClick={() => handleToggleSwitch("enableFollowNow")}
            className="cursor-pointer"
          >
            {giveawayData.enableFollowNow ? (
              <ToggleRight size={32} color="#6563FF" weight="fill" />
            ) : (
              <ToggleLeft size={32} color="#6563FF" weight="light" />
            )}
          </div>
        </div>
        {giveawayData.enableFollowNow && (
          <>
            <div className="flex gap-10 place-items-center">
              <label className="w-2/5 font-semibold">Select Platforms</label>
              <Select
                className="w-full outline-none focus:outline-none active:outline-none  shadow-none border-none"
                isMulti
                options={socialOptions}
                placeholder="Search..."
                onChange={handleFollowChange}
              />
            </div>
            <h2 className="w-full text-center font-semibold text-lg">
              Add Link
            </h2>
            {followOption.map((option) => {
              return (
                <div className="flex gap-10 place-items-center">
                  <label className="w-2/5 font-semibold">{option.label}</label>
                  {(option.value === "facebook" ||
                    option.value === "instagram" ||
                    option.value === "whatsapp" ||
                    option.value === "messenger" ||
                    option.value === "tiktok" ||
                    option.value === "twitter") && (
                    <input
                      value={giveawayData.followPlatforms[option.value]}
                      onChange={(e) =>
                        handleTextChange(e, option.value, "follow")
                      }
                      className="w-full rounded-md py-1 px-2 outline-none bg-[#F1F5F9] border border-slate-200"
                    />
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default GiveawaySetting;
