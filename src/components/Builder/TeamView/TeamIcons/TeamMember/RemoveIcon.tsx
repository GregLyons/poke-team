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
      <button
        title={removing
          ? 'Stop removing this team member.'
          : 'Remove this team member.'
        }
        className={`
          team-member__remove
          ${removing
          ? 'team-member__return'
          : ''}
        `}
        onClick={e => {
          onClick(e);
          e.stopPropagation();
        }}
      >
        <div className="team-member__remove.--top" />
        <div className="team-member__remove.--left" />
        <div className="team-member__remove.--bottom" />
        <div className="team-member__remove.--right" />
      </button>
    </div>
  )
}

export default RemoveIcon;