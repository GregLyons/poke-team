import './TeamMember.css';

type AddIconProps = {
}

const AddIcon =({
}: AddIconProps) => {
  return (
    <div
      className="team-member__add"
    >
      <div className="team-member__add-h"></div>
      <div className="team-member__add-v"></div>
    </div>
  )
}

export default AddIcon;