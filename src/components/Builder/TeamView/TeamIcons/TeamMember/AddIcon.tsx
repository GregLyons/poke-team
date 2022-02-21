import './TeamMember.css';

type AddIconProps = {
}

const AddIcon =({
}: AddIconProps) => {
  return (
    <div
      className="team-member__add"
    >
      <div className="team-member__add-nw"></div>
      <div className="team-member__add-ne"></div>
      <div className="team-member__add-sw"></div>
      <div className="team-member__add-se"></div>
    </div>
  )
}

export default AddIcon;