import { useQuery } from '@apollo/client';
import { MemberPokemonQuery, MemberPokemonVars, POKEMONICON_TO_MEMBER_QUERY } from '../../../../types-queries/Builder/MemberPokemon';
import { PokemonIconDatum } from '../../../../types-queries/helpers';
import { Dispatches, Filters } from '../../../App';
import TeamMember from './TeamMember/TeamMember';
import './TeamMembers.css';

type TeamMemberHolderProps = {
  dispatches: Dispatches
  filters: Filters
  icon: PokemonIconDatum | null
  idx: number
}

const TeamMemberHolder = ({
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
    <div className="team-member-holder__wrapper">
      <div className="team-member-holder__header">
        Member
      </div>
      <div className="team-member-holder__content">
        {loading
          ? <div>Loading...</div>
          : <TeamMember
              data={data}
              dispatches={dispatches}
              filters={filters}
              icon={icon}
              idx={idx}
            />
        }
      </div>
    </div>
  );
};

export default TeamMemberHolder;
