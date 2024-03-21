import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { usePSDHelpdeskStore } from "../../store";
import { Box } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface jobByFactory {
  label: string;
  y: number;
}
const DonutChartJobFactory: React.FC = () => {
  const [jobs, setJob] = useState<jobByFactory[]>();
  const token = usePSDHelpdeskStore((state) => state.token);
  const baseURL = import.meta.env.VITE_NODE_SERVER;
  const cardStyle = {
    boxShadow: "rgba(183, 194, 203, 0.6) 0px 1px 8px 0px",
    borderRadius: 3,
    padding: 3,
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgba(183, 194, 203, 0.7) 0px 2px 8px 0px",
    },
  };
  const getJobs = async () => {
    axios
      .get(`${baseURL}/jobs/jobByFactory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.err && res.data.msg === "Ok") {
          setJob(res.data.result);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getJobs();
  }, []);
  const data = {
    labels: jobs && jobs?.map((val) => val.label),
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderRadius: 10,
        borderWidth: 1,
      },
    ],

   
  };
  return (
    <Box className="p-[1rem] flex justify-center" sx={{ ...cardStyle }}>
      {jobs && jobs.length > 0 ? (
        <div className="w-[250px] mb-2">
          <Doughnut data={data} options={{cutout:'70%'}}/>
        </div>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default DonutChartJobFactory;
