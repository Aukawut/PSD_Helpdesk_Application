import { FC } from "react"
import { grey } from "@mui/material/colors"
import { Box, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { IconTypeMap } from "@mui/material"
import "./CardJobCount.css"
import CounterAnimate from "../CounterAnimate/CounterAnimate"

type MenuSettingIcon = OverridableComponent<IconTypeMap<unknown, "svg">>

interface JobCount {
  id: number
  status: string
  amount: number
  iconBgColor: string
  textInsideBox: string
  icon: MenuSettingIcon
}

interface propsJobCount {
  data: JobCount
}

const CardJobCount: FC<propsJobCount> = ({ data }) => {
  const cardStyle = {
    boxShadow: "rgba(183, 194, 203, 0.6) 0px 1px 8px 0px",
    borderRadius: 3,
    padding: 3,
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgba(183, 194, 203, 0.7) 0px 2px 8px 0px",
    },
  }
  return (
    <Box sx={{ ...cardStyle }}>
      <Box className="flex justify-between">
        <Box>
          <Typography fontSize={18} fontWeight={700} color="#6B819D">
            {data.status}
          </Typography>
          <Typography fontWeight={700} fontSize={30} color={grey[800]}>
            <CounterAnimate data={data}   />
          </Typography>
        </Box>
        <Box>
          <div
            className={`w-[5rem] h-[5rem] ${data.iconBgColor} rounded-full flex justify-center items-center`}
          >
            {
              <data.icon
                sx={{
                  marginRight: 1,
                  color: data.textInsideBox,
                  fontSize: "2rem",
                }}
                className={`svgIcon`}
              />
            }
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default CardJobCount
