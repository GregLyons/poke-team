import { TeamMembersClickHandlers } from '../../TeamView';
import './TeamMember.css';

type AddIconProps = {
  clickHandlers: TeamMembersClickHandlers
  idx: number
};

const AddIcon = ({
  clickHandlers,
  idx,
}: AddIconProps) => {
  return (
    <button
      title={`Add a member to team slot ${idx + 1}.`}
      className="team-member__add"
      onClick={e => {
        e.preventDefault();
        clickHandlers.onAddClick(e, idx);
      }}
    >
      <div className="team-member__add-h"></div>
      <div className="team-member__add-v"></div>
    </button>
  )
}

export default AddIcon;