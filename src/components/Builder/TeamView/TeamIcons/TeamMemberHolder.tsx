import { useQuery } from '@apollo/client';
import { PokemonIconDatum } from '../../../../types-queries/helpers';
import { MemberPokemonQuery, MemberPokemonVars, POKEMONICON_TO_MEMBER_QUERY } from '../../../../types-queries/Member/MemberPokemon';
import { Dispatches, Filters } from '../../../App';
import { TeamMembersClickHandlers } from '../TeamView';
import TeamMember from './TeamMember/TeamMember';
import './TeamMembers.css';

type TeamMemberHolderProps = {
  selected: boolean
  clickHandlers: TeamMembersClickHandlers
  dispatches: Dispatches
  filters: Filters
  icon: PokemonIconDatum | null
  idx: number
}

const TeamMemberHolder = ({
  selected,
  clickHandlers,
  dispatches,
  filters,
  icon,
  idx,
}: TeamMemberHolderProps) => {
  const { data, loading, error } = useQuery<MemberPokemonQuery, MemberPokemonVars>(POKEMONICON_TO_MEMBER_QUERY, {
    variables: {
      gen: filters.genFilter.gen,
      psID: icon?.psID || '',
    }
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <li className={`
      team-member-holder__wrapper
      ${selected
        ? 'team-member-holder__wrapper--active'
        : ''
      }
    `}>
      <div className="team-member-holder__header">
        {selected
          ? 'Active'
          : 'Member ' + (idx + 1)
        }
      </div>
      <div
        className={`
          team-member-holder__content
        `}
      >
        {loading
          ? <div>Loading...</div>
          : <TeamMember
              selected={selected}
              clickHandlers={clickHandlers}
              data={data}
              dispatches={dispatches}
              filters={filters}
              icon={icon}
              idx={idx}
            />
        }
      </div>
    </li>
  );
};

export default TeamMemberHolder;
