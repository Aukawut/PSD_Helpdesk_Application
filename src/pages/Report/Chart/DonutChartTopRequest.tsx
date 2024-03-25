import React from "react"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import { Typography } from "@mui/material"

const DonutChartTopRequest: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 600,
        animateGradually: {
          enabled: true,
          delay: 100,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 300,
        },
      },
      background: "none",
      fontFamily: "Prompt, sans-serif",
    },

    labels: ["Comedy", "Action", "Romance", "Drama", "SciFi"],
    stroke: {
      width: 0,
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.3,
      },
    },
  }

  const series = [31, 40, 28, 51, 42]

  return (
    <div>
      <Typography>Top 5 machines with the most repair requests</Typography>
      <div className="mt-[2rem]">

      <ReactApexChart type="donut" options={options} series={series} />
      </div>
    </div>
  )
}

export default DonutChartTopRequest
