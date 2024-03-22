import { Box, Button } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import React from "react";

const FactoryComponent: React.FC = () => {
  return (
    <div>
      <Box>
        <Button variant="contained" size="small" color="primary"><AddRoundedIcon /> Add</Button>
      </Box>
    </div>
  );
};

export default FactoryComponent;
