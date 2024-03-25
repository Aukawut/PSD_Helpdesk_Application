import { PushPinRounded } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import React from "react"
import DonutChartTopRequest from "./Chart/DonutChartTopRequest"
import BarChartJobRequest from "./Chart/BarChartJobRequest"
import SplineChartJobRequest from "./Chart/SplineChartJobRequest"

const Report: React.FC = () => {
  const cardStyle = {
    boxShadow: "rgba(183, 194, 203, 0.3) 0px 1px 8px 0px",
    borderRadius: 2,
    padding: 3,
    background: "#fff",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgba(183, 194, 203, 0.5) 0px 2px 8px 0px",
    },
  }
  return (
    <div>
      <Typography fontSize={18} marginBottom={2} fontWeight={600}>
        <PushPinRounded sx={{ color: red[500] }} /> Summary Report
      </Typography>
      <Box>
        <div className="grid grid-cols-12 gap-2">
          <div className="grid col-span-5">
            <Box sx={{ ...cardStyle }}>
              <DonutChartTopRequest />
            </Box>
          </div>
          <div className="grid col-span-7">
            <Box sx={{ ...cardStyle }}>
              <SplineChartJobRequest />
            </Box>
          </div>
          <div className="col-span-12">
          <Box sx={{ ...cardStyle }}>
              <BarChartJobRequest />
            </Box>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Report
