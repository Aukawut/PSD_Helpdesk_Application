import React from 'react'
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import { Typography } from '@mui/material'

const SplineChartJobRequest:React.FC = () => {
    const series =  [{
        name: 'Closed jobs',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'Overdue Jobs',
        data: [11, 32, 45, 32, 34, 52, 41]
      }]
      const options:ApexOptions =  {
        chart: {
          height:350,
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
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        yaxis:{
            title:{
                text: "# (Jobs)",
            }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        colors: ["#008FFB", "#fa2020"],
      }
    
    
   
  return (
    <div>
        <Typography>
        Last 7 days Job Closed and Overdue (Current Year)
        </Typography>
        <ReactApexChart type='area' series={series} options={options}/></div>
  )
  }

export default SplineChartJobRequest