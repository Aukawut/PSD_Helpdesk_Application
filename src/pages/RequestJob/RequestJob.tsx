import { Box, Typography } from "@mui/material";
import React from "react";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import { red } from "@mui/material/colors";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FormRequestJobs from "../../components/FormRequestJobs/FormRequestJobs";

const RequestJob: React.FC = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event);

    setValue(newValue);
  };
  const cardStyle = {
    boxShadow: "rgba(183, 194, 203, 0.4) 0px 1px 8px 0px",
    borderRadius: 2,
    padding: 3,
    background: "#fff",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgba(183, 194, 203, 0.5) 0px 2px 8px 0px",
    },
  };
  return (
    <div>
      <Typography fontSize={18} marginBottom={2} fontWeight={600}>
        <PushPinRoundedIcon sx={{ color: red[500] }} /> Jobs Request
      </Typography>

      <Box sx={{ ...cardStyle }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Jobs Request form" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <FormRequestJobs />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default RequestJob;
