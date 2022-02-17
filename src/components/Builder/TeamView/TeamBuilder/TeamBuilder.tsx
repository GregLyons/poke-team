import './TeamBuilder.css';

type TeamBuilderProps = {

}

const TeamBuilder = ({

}: TeamBuilderProps) => {
  return (
    <div className="team-builder__wrapper">
      <div className="team-builder__member-wrapper">Member</div>
      <div className="team-builder__search-wrapper">Search</div>
    </div>
  )
};

export default TeamBuilder;
