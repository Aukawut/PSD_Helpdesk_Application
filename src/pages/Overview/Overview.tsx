import { Typography } from "@mui/material";
import CardJobCount from "../../components/CardJobCount/CardJobCount";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePSDHelpdeskStore } from "../../store";
import "react-toastify/dist/ReactToastify.css";
import { JobCount } from "./utils";
import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import { red } from "@mui/material/colors";

function Overview() {
  const [jobsCount, setJobsCount] = useState<JobCount[]>();
  const baseURL = import.meta.env.VITE_NODE_SERVER;
  const token = usePSDHelpdeskStore((state) => state.token);

  const getJobCount = async () => {
    await axios
      .get(`${baseURL}/jobs/count/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.err && res.data.msg === "Ok") {
          console.log(res.data);

          setJobsCount(res.data.result);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getJobCount();
  }, []);
  return (
    <div>
      <Typography fontSize={18} marginBottom={2} fontWeight={600}>
        <PushPinRoundedIcon sx={{ color: red[500] }} /> Overview
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {jobsCount?.map((job, index: number) => (
          <CardJobCount data={job} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Overview;
