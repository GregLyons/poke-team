type RemoveTimerProps = {
  removeDuration: number
  startTime: number
}

const RemoveTimer = ({
  removeDuration,
  startTime,
}: RemoveTimerProps) => {
  let time = (new Date()).getTime();
  setTimeout(() => time++);

  return (
    <div
      className="team-member__remove-timer"
      style={{
        width: `${100 - (time - startTime) / removeDuration * 100}%`
      }}
    />
  )
}

export default RemoveTimer;