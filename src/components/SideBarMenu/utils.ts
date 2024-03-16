interface menuList {
  id: number
  name: string
  path: string
  icon: string
}
interface MenuSetting {
  id: number
  nameMenu: string
  path: string
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
  },
  {
    id: 2,
    nameMenu: "Account",
    path: "/account",
  },
  {
    id: 3,
    nameMenu: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 4,
    nameMenu: "Logout",
    path: "/logout",
  },
]
