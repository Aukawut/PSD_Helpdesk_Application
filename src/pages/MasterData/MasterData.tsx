import { PushPinRounded } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import FactoryComponent from "./ChildsComponents/FactoryComponent/FactoryComponent";
import CategoryComponent from "./ChildsComponents/CategoryComponent/CategoryComponent";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import RequestTypeComponents from "./ChildsComponents/RequestTypeComponents/RequestTypeComponents";
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import MachineComponents from "./ChildsComponents/MachineComponents/MachineComponents";
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';

const MasterData: React.FC = () => {
  const [value, setValue] = React.useState("1");
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
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(event);
    setValue(newValue);
  };
  return (
    <div className="overflow-hidden">
      <Typography fontSize={18} marginBottom={2} fontWeight={600}>
        <PushPinRounded sx={{ color: red[500] }} /> Master Data
      </Typography>
      <Box sx={{ ...cardStyle }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label={
                  <div
                    className="flex items-center gap-x-2"
                    
                  >
                    <HomeWorkRoundedIcon /> Factory
                  </div>
                }
                value="1"
              />
              <Tab
                label={
                  <div className="flex items-center gap-x-2">
                    <CategoryRoundedIcon /> Category
                  </div>
                }
                value="2"
              />
               <Tab
                label={
                  <div className="flex items-center gap-x-2">
                    <HandymanRoundedIcon /> Request types
                  </div>
                }
                value="3"
              />
               <Tab
                label={
                  <div className="flex items-center gap-x-2">
                    <PrecisionManufacturingRoundedIcon /> Machine
                  </div>
                }
                value="4"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <FactoryComponent />
          </TabPanel>
          <TabPanel value="2">
            <CategoryComponent />
          </TabPanel>
          <TabPanel value="3">
            <RequestTypeComponents />
          </TabPanel>
          <TabPanel value="4">
            <MachineComponents />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default MasterData;
