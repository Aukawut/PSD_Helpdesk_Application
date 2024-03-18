import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IconTypeMap } from "@mui/material";
type MenuSettingIcon = OverridableComponent<IconTypeMap<unknown, "svg">>;
import ConstructionIcon from '@mui/icons-material/Construction';
import QueuePlayNextRoundedIcon from '@mui/icons-material/QueuePlayNextRounded';
import SwipeRightRoundedIcon from '@mui/icons-material/SwipeRightRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
export interface JobCount {
  id: number
  status: string
  amount: number  
  iconBgColor: string
  textInsideBox: string
  icon:MenuSettingIcon
}

export const jobCountByStatus: JobCount[] = [
  {
    id: 1,
    status: "New Jobs",
    amount: 62,
    iconBgColor: "bg-[#FF579A]",
    textInsideBox: "#BB004B",
    icon:QueuePlayNextRoundedIcon
  },
  {
    id: 2,
    status: "Accept Jobs",
    amount: 10,
    iconBgColor: "bg-[#5C60F5]",
    textInsideBox: "#36388E",
    icon:SwipeRightRoundedIcon
  },
  {
    id: 3,
    status: "Finish Jobs",
    amount: 242,
    iconBgColor: "bg-[#36A2EB]",
    textInsideBox: "#0C6BAB",
    icon:CheckCircleOutlineRoundedIcon
  },
  {
    id: 4,
    status: "Outside Jobs",
    amount: 15,
    iconBgColor: "bg-[#FF8C00]",
    textInsideBox: "#BD6800",
    icon:ArrowOutwardRoundedIcon
  },
  {
    id: 5,
    status: "Improve Jobs",
    amount: 15,
    iconBgColor: "bg-[#4BC0C0]",
    textInsideBox: "#249292",
    icon:ConstructionIcon
  },
  {
    id: 6,
    status: "Close jobs",
    amount: 4236,
    iconBgColor: "bg-[#c9cdcf]",
    textInsideBox: "#A4A9AB",
    icon:CreditScoreRoundedIcon
  },
]
