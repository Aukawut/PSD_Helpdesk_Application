import { Box, Button, FormControl, TextField, Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useState, useRef, useEffect } from "react"
import { grey } from "@mui/material/colors"
import Checkbox from "@mui/material/Checkbox"
import ProspiraLogo from "../../assets/images/Prospira_logos.png"

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [checked, setChecked] = useState<boolean>(false)
  const inputUsernameRef = useRef<HTMLInputElement>(null)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  useEffect(() => {
    if (inputUsernameRef.current) {
      inputUsernameRef.current.focus()
    }
  }, [])
  return (
    <div className="bg-gray-100 h-[100vh]">
      <div className="grid grid-cols-2">
        <div className="bg-[#F9F9F9] flex justify-center h-[100vh] items-center">
          <div className="w-[85%] h-[80%] rounded-xl shadow-lg">
            <div className="m-2">
              <img
                src={ProspiraLogo}
                alt={ProspiraLogo}
                className="h-[1.3rem] w-[auto]"
              />
            </div>
            <div className="p-[4rem]">
              <Typography variant="h5" fontWeight="bold">
                PSD Helpdesk System
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: grey[700] }}
                fontSize={14}
              >
                Welcome by please enter your details.
              </Typography>
              <div className="mt-[1rem]">
                <form action="">
                  <FormControl fullWidth sx={{ marginBottom: "0.8rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="Enter your username"
                      variant="outlined"
                      inputRef={inputUsernameRef}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormControl>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <Box className="flex items-center mt-2">
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <Typography fontSize={14}>Remember me</Typography>
                  </Box>
                  <Box className="my-2">
                    <Button variant="contained" fullWidth sx={{ padding: 1.2 }}>
                      Login
                    </Button>
                  </Box>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#E1E2E6]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          corrupti temporibus numquam sequi consequuntur expedita, aliquid
          provident, at impedit non tempore cupiditate soluta? Quidem fuga
          obcaecati fugiat. Possimus, tempora eaque!
        </div>
      </div>
    </div>
  )
}

export default Login
