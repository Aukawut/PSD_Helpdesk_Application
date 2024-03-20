import { OverridableComponent } from "@mui/material/OverridableComponent";
import { IconTypeMap } from "@mui/material";
type MenuSettingIcon = OverridableComponent<IconTypeMap<unknown, "svg">>;
import ConstructionIcon from "@mui/icons-material/Construction";
import QueuePlayNextRoundedIcon from "@mui/icons-material/QueuePlayNextRounded";
import SwipeRightRoundedIcon from "@mui/icons-material/SwipeRightRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";

export interface JobCount {
  id: number;
  status: string;
  amount: number;
  iconBgColor: string;
  textInsideBox: string;
}

interface iconType {
  id: number;
  icon: MenuSettingIcon;
}

export const iconJobStatus: iconType[] = [
  {
    id: 1,
    icon: QueuePlayNextRoundedIcon,
  },
  {
    id: 2,
    icon: SwipeRightRoundedIcon,
  },
  {
    id: 3,

    icon: CheckCircleOutlineRoundedIcon,
  },
  {
    id: 4,
    icon: ArrowOutwardRoundedIcon,
  },
  {
    id: 5,
    icon: ConstructionIcon,
  },
  {
    id: 6,
    icon: CreditScoreRoundedIcon,
  },
];
