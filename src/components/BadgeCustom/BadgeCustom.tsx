import React from "react";
interface props {
  text: string;
  color: string;
}
const BadgeCustom: React.FC<props> = ({ text, color }) => {
  switch (color) {
    case "success":
      return (
        <div className="px-2 py-1 text-[11.5px] font-semibold bg-[#C7EBD1] text-[#075E45] inline-block rounded-lg">
          {text}
        </div>
      );
    case "danger":
      return (
        <div className="px-2 py-1 text-[11.5px] font-semibold bg-[#FADCD9] text-[#A1160A] inline-block rounded-lg">
          {text}
        </div>
      );
    default:
      return (
        <div className="px-2 py-1 text-[11.5px] font-semibold bg-[#DCE3E8] text-[#3E5463] inline-block rounded-lg">
          {text}
        </div>
      );
  }
};
export default BadgeCustom;
