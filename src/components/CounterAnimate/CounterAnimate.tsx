import { FC } from "react"
import { JobCount } from "../../pages/Overview/utils";
interface propsJobCount {
    data: JobCount
  }
const CounterAnimate: FC<propsJobCount> = ({data}) => {
  return <div>{data.amount}</div>
}

export default CounterAnimate
