import { Typography } from "@mui/material";
import { jobCountByStatus } from "./utils";
import CardJobCount from "../../components/CardJobCount/CardJobCount";

function Overview() {
  return (
    <div>
      <Typography variant="h6" fontSize={21} marginBottom={2} fontWeight={600}>Dashboard</Typography>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {jobCountByStatus?.map((job, index) => (
          <CardJobCount data={job} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Overview;
