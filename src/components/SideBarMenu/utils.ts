import { IconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import PortraitRoundedIcon from '@mui/icons-material/PortraitRounded';
import HandymanIcon from '@mui/icons-material/Handyman';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PieChartIcon from '@mui/icons-material/PieChart';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

type MenuSettingIcon = OverridableComponent<IconTypeMap<unknown, "svg">>;
interface menuList {
  id: number;
  name: string;
  path: string;
  icon: MenuSettingIcon;
}
interface MenuSetting {
  id: number;
  nameMenu: string;
  path: string;
  icon: MenuSettingIcon;
}
export const menuLists: menuList[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    icon: PieChartIcon,
  },
  {
    id: 2,
    name: "Job Request",
    path: "/request",
    icon: HandymanIcon,
  },
  {
    id: 3,
    name: "Master Data",
    path: "/masterData",
    icon: TextSnippetIcon,
  },
  {
    id: 4,
    name: "Summary Report",
    path: "/report",
    icon: AssessmentIcon,
  },
];
export const settings: MenuSetting[] = [
  {
    id: 1,
    nameMenu: "Profile",
    path: "/profile",
    icon: PortraitRoundedIcon,
  },
  {
    id: 2,
    nameMenu: "Admin Manual",
    path: "/manual/admin",
    icon: AdminPanelSettingsRoundedIcon,
  },
  {
    id: 3,
    nameMenu: "User Manual",
    path: "/manual/user",
    icon: TurnedInNotRoundedIcon,
  },
  {
    id: 4,
    nameMenu: "Logout",
    path: "/logout",
    icon: ExitToAppRoundedIcon,
  },
];
