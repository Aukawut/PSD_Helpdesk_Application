import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useLocation } from "react-router-dom";
import { menuLists, settings } from "./utils";
import logoProspira from "../../assets/images/Prospira_logos.png";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

import { Link } from "react-router-dom";
import HeaderBar from "../HeaderBar/HeaderBar";
import { Avatar, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { usePSDHelpdeskStore } from "../../store";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function SideBarMenu(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const infoUser = usePSDHelpdeskStore((state) => state.info);

  const location = useLocation();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const activeColor: string = "#7352C7";
  const bgMenu: string = "#EAE6F7";
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,

        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  const drawer = (
    <div>
      <div className="p-2.5">
        <img
          src={logoProspira}
          alt={logoProspira}
          className="w-[auto] h-[2rem]"
        />
      </div>

      <div>
        <Box className="mx-2 bg-gray-100 rounded-2xl h-[100px] p-2">
          <Box className="flex justify-start items-center gap-x-2 h-full">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Remy Sharp"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299539-5187871.png?f=webp"
                sx={{ bgcolor: grey[300], width: 50, height: 50 }}
              />
            </StyledBadge>
            <Box>
              <Typography fontSize={14} fontWeight={600} color={grey[800]}>
                {infoUser?.ldap_info.LDAP_DisplayName}
              </Typography>
              <Typography
                fontSize={11}
                fontWeight={600}
                color={grey[700]}
                variant="caption"
              >
                {infoUser?.hrc_info.UHR_POSITION} (
                {infoUser?.hrc_info.ESD_ShortDepartment})
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
      <Divider sx={{ marginY: 1 }} />

      <List sx={{ paddingRight: 1.2 }}>
        {menuLists.map((menu, index) => (
          <Link key={index} to={menu.path}>
            <ListItem disablePadding sx={{ marginBottom: 1 }}>
              <ListItemButton
                sx={{
                  bgcolor: menu.path === location.pathname ? bgMenu : "",
                  color: menu.path === location.pathname ? "#7352C7" : "",
                  borderTopRightRadius: 25,
                  borderBottomRightRadius: 25,
                  borderLeft:
                    menu.path === location.pathname
                      ? `0.3rem solid ${activeColor}`
                      : "",
                  "&:hover": {
                    bgcolor: bgMenu,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: menu.path === location.pathname ? "#7352C7" : "",
                  }}
                >
                  <menu.icon />
                </ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
          overflow:'auto'
        }}
        
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
