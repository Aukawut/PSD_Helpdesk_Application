import { Typography } from "@mui/material";
import { jobCountByStatus } from "./utils";

import CardJobCount from "../../components/CardJobCount/CardJobCount";

function Overview() {
  return (
    <div>
      <Typography variant="h6">Dashboard</Typography>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
        {jobCountByStatus?.map((job, _) => (
          <CardJobCount data={job} key={job.id} />
        ))}
      </div>
    </div>
  );
}

export default Overview;
