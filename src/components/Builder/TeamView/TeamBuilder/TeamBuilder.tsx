import { useState } from 'react';
import { Team } from '../../../../hooks/App/Team';
import { Dispatches, Filters } from '../../../App';
import MemberDetails from './MemberDetails/MemberDetails';
import './TeamBuilder.css';
import TeamBuilderIcons from './TeamBuilderIcons/TeamBuilderIcons';
import TeamBuilderView from './TeamBuilderView/TeamBuilderView';

type TeamBuilderProps = {
  team: Team
  dispatches: Dispatches
  filters: Filters
}

type TeamBuilderView = null | 'ABILITY' | 'ITEM' | 'MOVE' | 'STATS';

const TeamBuilder = ({
  team,
  dispatches,
  filters,
}: TeamBuilderProps) => {
  const [view, setView] = useState<TeamBuilderView>(null);
  return (
    <div className="team-builder__wrapper">
      <TeamBuilderIcons
        team={team}
        dispatches={dispatches}
      />
      <MemberDetails
        dispatches={dispatches}
        filters={filters}
      />
      <TeamBuilderView
        filters={filters}
      />
    </div>
  )
};

export default TeamBuilder;
