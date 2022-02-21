import { useEffect, useRef, useState } from "react";
import { MemberPokemon, MemberPokemonQuery } from "../../../../../types-queries/Builder/MemberPokemon";
import { PokemonIconDatum } from "../../../../../types-queries/helpers";
import { Dispatches, Filters } from "../../../../App";
import AddIcon from "./AddIcon";
import RemoveIcon from "./RemoveIcon";
import TeamMemberIcon from "./TeamMemberIcon";

type TeamMemberProps = {
  data?: MemberPokemonQuery
  dispatches: Dispatches
  filters: Filters
  icon: PokemonIconDatum | null
  idx: number
}

const TeamMember = ({
  data,
  dispatches,
  filters,
  icon,
  idx,
}: TeamMemberProps) => {
  // Removing Pokemon
  // #region

  const [removing, setRemoving] = useState(false);
  let [startTime, setStartTime] = useState<number | undefined>();
  const removeTimer = useRef<NodeJS.Timeout>();
  const removeDuration = 1500;

  // When remove icon is clicked, begin removing the Pokemon; user has a chance to cancel
  const onRemoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    
    // Start removal timer
    setStartTime((new Date()).getTime());
    
    // Start removing Pokemon
    setRemoving(true);
    removeTimer.current = setTimeout(removePokemon, removeDuration);
  }

  // When removeTimer has expired, remove the Pokemon from the team
  const removePokemon = () => {
    // Remove Pokemon from team
    dispatches.dispatchTeam({
      type: 'remove_member',
      payload: {
        gen: filters.genFilter.gen,
        idx,
      }
    });

    // Removal is complete, so no longer removing
    setRemoving(false);

    // Clear removal timer
    setStartTime(undefined);
  }

  // If the user cancels the removal, the Pokemon is not removed from the team
  const onReturnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (startTime === undefined) return;

    // No longer removing Pokemon
    setRemoving(false);
    setStartTime(undefined);
    // Clear remove timer
    if (removeTimer.current) clearTimeout(removeTimer.current);
  }

  // #endregion

  // When data updates with a new Pokemon, create that Pokemon in team
  useEffect(() => {
    // If true, then no data to render
    if (!data?.pokemonByPSID?.length || !icon) return;

    // Otherwise, use icon data to set up team member
    dispatches.dispatchTeam({
      type: 'replace_member',
      payload: {
        gen: filters.genFilter.gen,
        member: new MemberPokemon(data.pokemonByPSID[0], icon, filters.genFilter.gen),
        idx,
      },
    })
  }, [data]);

  return (
    <div
      className={`
        team-member__wrapper
        ${icon === null
          ? 'team-member__wrapper--empty'
          : ''
        }
      `}
    > 
      {icon === null && <AddIcon
        onClick={() => {}}
      />}
      {icon && 
        <>
          <TeamMemberIcon
            pokemonIconDatum={icon}
            removing={removing}
            removeDuration={removeDuration}
            startTime={startTime}
          />
          <RemoveIcon
            removing={removing}
            onClick={removing
              ? onReturnClick
              : onRemoveClick
            }
          />
        </>
      }
    </div>
  )
};

export default TeamMember;