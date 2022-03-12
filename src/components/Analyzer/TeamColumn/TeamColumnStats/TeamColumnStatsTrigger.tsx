import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";

type TeamColumnStatsTriggerProps = {
  member: MemberPokemon

  determineRelevance: (name: string | undefined) => string
};

const TeamColumnStatsTrigger = ({
  member,
  determineRelevance,
}: TeamColumnStatsTriggerProps) => {
  return (<>
    <div
      className={`
        team-column__stat-wrapper
        ${determineRelevance('HP')}
      `}
    >
      <span className="team-column__text">
        HP&nbsp; {member.computeHP()}
      </span>
    </div>
    <div
      className={`
        team-column__stat-wrapper
        ${determineRelevance('Def')}
      `}
    >
      <span className="team-column__text">
        Def {member.computeDefense()}
      </span>
    </div>
    <div
      className={`
        team-column__stat-wrapper
        ${determineRelevance('SpD')}
      `}
    >
      <span className="team-column__text">
        SpD {member.computeSpecialDefense()}
      </span>
    </div>
    <div
      className={`
        team-column__stat-wrapper
        ${determineRelevance('Atk')}
      `}
    >
      <span className="team-column__text">
        Atk {member.computeAttack()}
      </span>
    </div>
    <div
      className={`
        team-column__stat-wrapper
        ${determineRelevance('SpA')}
      `}
    >
      <span className="team-column__text">
        SpA {member.computeSpecialAttack()}
      </span>
    </div>
    <div
      className={`
        team-column__stat-wrapper
        ${determineRelevance('Spe')}
      `}
    >
      <span className="team-column__text">
        Spe {member.computeSpeed()}
      </span>
    </div>
  </>)
};

export default TeamColumnStatsTrigger;