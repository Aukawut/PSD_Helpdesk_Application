import { FC } from "react";
import { JobCount } from "../../pages/Overview/utils";
import CountUp from 'react-countup';

interface propsJobCount {
  data: JobCount;
}
const CounterAnimate: FC<propsJobCount> = ({ data }) => {
  return (
    <div>
      <CountUp start={0} end={data.amount} duration={0.5} useEasing={true} />
    </div>
  );
};

export default CounterAnimate;
