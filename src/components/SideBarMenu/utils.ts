import { IconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HandymanIcon from '@mui/icons-material/Handyman';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PieChartIcon from '@mui/icons-material/PieChart';

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
    icon: AccountBoxIcon,
  },
  {
    id: 2,
    nameMenu: "Account",
    path: "/account",
    icon: AccountBoxIcon,
  },
  {
    id: 3,
    nameMenu: "Dashboard",
    path: "/dashboard",
    icon: AccountBoxIcon,
  },
  {
    id: 4,
    nameMenu: "Logout",
    path: "/logout",
    icon: AccountBoxIcon,
  },
];
