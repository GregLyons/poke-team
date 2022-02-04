type RemoveIconProps = {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  removing: boolean
}

const RemoveIcon = ({
  onClick,
  removing,
}: RemoveIconProps) => {
  return (
    <div
      className="team-member__remove-wrapper"
    >
      <div
        className={`
          team-member__remove
          ${removing
          ? 'team-member__return'
          : ''}
        `}
        onClick={onClick}
      >
        <div className="team-member__remove--top" />
        <div className="team-member__remove--left" />
        <div className="team-member__remove--bottom" />
        <div className="team-member__remove--right" />
      </div>
    </div>
  )
}

export default RemoveIcon;