import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useRef, useEffect } from "react";
import { grey } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import ProspiraLogo from "../../assets/images/Prospira_logos.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
type NavigateFunction = (path: string) => void;
const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const inputUsernameRef = useRef<HTMLInputElement>(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate: NavigateFunction = useNavigate();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const notifySuccess = () => {
    toast.success(
      <div>
        <p>Login successfully!</p>
        <p className="text-[13px]">เข้าสู่ระบบสำเร็จ</p>
      </div>,
      {
        position: "top-right",
        autoClose: 750,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    setTimeout(() => {
      navigate("/");
    }, 700);
  };
  const notifyError = (message: string) => {
    toast.error(
      <div>
        <p>{message}</p>
      </div>,
      {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(
        `${import.meta.env.VITE_LDAP_SERVICE_APACHE}/ldap_service_login/index`,
        {
          router: "login",
          username,
          password,
        }
      )
      .then((res) => {
        if (!res.data.err && res.data.status === "Ok") {
          notifySuccess();
        } else {
          notifyError(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (inputUsernameRef.current) {
      inputUsernameRef.current.focus();
    }
  }, []);
  return (
    <div className="bg-gray-100 h-[100vh]">
      <ToastContainer />
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
                Welcome back please enter your details.
              </Typography>
              <div className="mt-[1rem]">
                <form onSubmit={handleLogin}>
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
                      onChange={(e) => setPassword(e.target.value)}
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
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ padding: 1.2 }}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Box>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex relative bg-[#E1E2E6] h-full justify-center items-center">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin" />
                      <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
