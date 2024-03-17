import { IconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
type MenuSettingIcon = OverridableComponent<IconTypeMap<unknown, 'svg'>>;
interface menuList {
  id: number
  name: string
  path: string
  icon: string
}
interface MenuSetting {
  id: number
  nameMenu: string
  path: string,
  icon: MenuSettingIcon;
}
export const menuLists: menuList[] = [
  {
    id: 1,
    name: "Overview",
    path: "/",
    icon: "",
  },
  {
    id: 2,
    name: "Report",
    path: "/report",
    icon: "",
  },
  {
    id: 3,
    name: "Master Data",
    path: "/report",
    icon: "",
  },
  {
    id: 4,
    name: "Tickets",
    path: "/tickets",
    icon: "",
  },
]
export const settings: MenuSetting[] = [
  {
    id: 1,
    nameMenu: "Profile",
    path: "/profile",
    icon:AccountBoxIcon
  },
  {
    id: 2,
    nameMenu: "Account",
    path: "/account",
    icon:AccountBoxIcon
  },
  {
    id: 3,
    nameMenu: "Dashboard",
    path: "/dashboard",
    icon:AccountBoxIcon
  },
  {
    id: 4,
    nameMenu: "Logout",
    path: "/logout",
    icon:AccountBoxIcon
  },
]
