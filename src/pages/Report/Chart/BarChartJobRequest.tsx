import React from "react"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import { Typography } from "@mui/material"

const BarChartJobRequest: React.FC = () => {
  const series = [
    {
      name: "Close jobs",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 120, 140, 150],
    },
    {
      name: "Overdue Jobs",
      data: [20, 35, 40, 45, 50, 55, 60, 75, 90, 95, 110, 130],
    },
  ]
  const options: ApexOptions = {
    chart: { fontFamily: "Prompt, sans-serif" },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "# (Jobs)",
      },
    },
    colors: ["#008FFB", "#bfc4c9"],
  }
  return (
    <div>
      <Typography>Report Job Closed and Overdue / Month (Current Year)</Typography>
      <ReactApexChart
        type="bar"
        series={series}
        options={options}
        height={350}
      />
    </div>
  )
}

export default BarChartJobRequest
