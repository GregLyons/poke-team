import './TeamMember.css';

type AddIconProps = {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const AddIcon =({
  onClick,
}: AddIconProps) => {
  return (
    <div
      className="team-member__add"
      onClick={onClick}
    >
      <div className="team-member__add-nw"></div>
      <div className="team-member__add-ne"></div>
      <div className="team-member__add-sw"></div>
      <div className="team-member__add-se"></div>
    </div>
  )
}

export default AddIcon;