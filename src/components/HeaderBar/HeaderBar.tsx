import React from "react"
import AppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Tooltip from "@mui/material/Tooltip"
import Menu from "@mui/material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import { styled } from "@mui/material/styles"
import Badge from "@mui/material/Badge"
import { IconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { FC } from "react"
import {grey} from '@mui/material/colors'

type MenuSettingIcon = OverridableComponent<IconTypeMap<unknown, 'svg'>>;

interface MenuSetting {
  id: number
  nameMenu: string
  path: string,
  icon:MenuSettingIcon
}
interface HeaderBarProps {
  drawerWidth: number
  settings: MenuSetting[]
  isClosing: boolean
  handleDrawerToggle: () => void
}

const HeaderBar: FC<HeaderBarProps> = ({
  drawerWidth,
  settings,
  handleDrawerToggle,
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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
  }))
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontSize: { xs: 16, sm: 20 } }}>
                  PSD Helpdesk System
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt="Aemy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.14))',
                      mt: 1.2,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                      {<setting.icon sx={{marginRight:1,color:grey[600]}}  />}
                      <Typography textAlign="center">
                        {setting.nameMenu}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default HeaderBar
