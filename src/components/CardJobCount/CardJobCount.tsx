import { FC } from "react";

import { Card } from "@mui/material";

interface JobCount {
  id: number;
  status: string;
  amount: number;
}

interface propsJobCount {
  data: JobCount;
}

const CardJobCount: FC<propsJobCount> = ({ data }) => {
  console.log(data);
  return (
    <Card
      sx={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: 3,
        padding:1
      }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga odio, quas
      est suscipit sunt neque repellendus dolorum quia saepe laborum alias
      dolores cum asperiores quod, eligendi cupiditate reiciendis minus cumque.
    </Card>
  );
};

export default CardJobCount;
