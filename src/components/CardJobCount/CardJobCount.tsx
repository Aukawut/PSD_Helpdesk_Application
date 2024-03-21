import { FC, useEffect } from "react";
import { grey } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";
import "./CardJobCount.css";
import CounterAnimate from "../CounterAnimate/CounterAnimate";

import { iconJobStatus } from "../../pages/Overview/utils";

interface JobCount {
  id: number;
  status: string;
  amount: number;
  iconBgColor: string;
  textInsideBox: string;
}

interface propsJobCount {
  data: JobCount;
}

const CardJobCount: FC<propsJobCount> = ({ data }) => {
  const cardStyle = {
    boxShadow: "rgba(183, 194, 203, 0.6) 0px 1px 8px 0px",
    borderRadius: 3,
    padding: 3,
    background:'#fff',
    cursor: "pointer",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      boxShadow: "rgba(183, 194, 203, 0.7) 0px 2px 8px 0px",
      transform: "translateY(-2%)"
    },
  };

  const getIcon = (id: number, textColor: string) => {
    const obj = iconJobStatus.find((x) => x.id === id);
    if (obj !== undefined) {
      return <obj.icon sx={{ color: textColor,fontSize:32 }} />;
    } else {
      return "Loading..";
    }
  };
  useEffect(() => {}, [data]);
  return (
    <Box sx={{ ...cardStyle }}>
      <Box className="flex justify-between">
        <Box>
          <Typography fontSize={18} fontWeight={700} color="#6B819D">
            {data.status}
          </Typography>
          <Typography fontWeight={700} fontSize={30} color={grey[800]}>
            <CounterAnimate data={data} />
          </Typography>
        </Box>
        <Box>
          <div
            className={`w-[5rem] h-[5rem] rounded-full flex justify-center items-center ${data.iconBgColor}`}
          >
            {getIcon(data.id, data.textInsideBox)}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default CardJobCount;
