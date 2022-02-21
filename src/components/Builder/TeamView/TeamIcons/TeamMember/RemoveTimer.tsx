import { useState, } from "react";
import { useInterval } from "usehooks-ts";

type RemoveTimerProps = {
  removing: boolean
  removeDuration: number
  startTime: number
}

const RemoveTimer = ({
  removing,
  removeDuration,
  startTime,
}: RemoveTimerProps) => {
  const delay = 10;
  const [time, setTime] = useState<number>(startTime);

  useInterval(() => {
    setTime(time + delay);
  }, removing ? delay : null);

  return (
    <div
      className="team-member__remove-timer"
      style={{
        width: removing 
          ? `${70 - (time - startTime) / removeDuration * 100}%`
          : 0,
      }}
    />
  )
}

export default RemoveTimer;