import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MailIcon from "@mui/icons-material/Mail"
import Toolbar from "@mui/material/Toolbar"
import { Outlet, useLocation } from "react-router-dom"
import { menuLists, settings } from "./utils"
import logoProspira from "../../assets/images/Prospira_logos.png"


import { Link } from "react-router-dom"
import HeaderBar from "../HeaderBar/HeaderBar"

const drawerWidth = 240

interface Props {
  window?: () => Window
}

export default function SideBarMenu(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const location = useLocation()
  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const activeColor: string = "#787fff"

  const drawer = (
    <div className="pr-2">
      <div className="p-2">
        <img
          src={logoProspira}
          alt={logoProspira}
          className="w-[auto] h-[2rem]"
        />
      </div>

      <div>
        <Box className="w-[100%] h-[100px] border-2"></Box>
      </div>
      <Divider />

      <List>
        {menuLists.map((menu, index) => (
          <Link key={menu.id} to={menu.path}>
            <ListItem disablePadding sx={{ marginBottom: 1 }}>
              <ListItemButton
                sx={{
                  bgcolor: menu.path === location.pathname ? activeColor : "",
                  color: menu.path === location.pathname ? "#fff" : "",
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                  "&:hover": {
                    bgcolor: activeColor,
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: menu.path === location.pathname ? "#fff" : "" }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: "flex", background: "#F5F9FC", height: "100vh" }}>
      
      <HeaderBar
        drawerWidth={drawerWidth}
        settings={settings}
        isClosing={isClosing}
        handleDrawerToggle={handleDrawerToggle}
      />
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
