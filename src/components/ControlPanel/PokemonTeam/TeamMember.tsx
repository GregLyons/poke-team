import { useRef, useState } from "react";
import { Team, TeamAction, TeamMode } from "../../../hooks/App/Team";
import { PokemonIconDatum } from "../../../types-queries/helpers";
import RemoveIcon from "./RemoveIcon";
import TeamMemberIcon from "./TeamMemberIcon";

type TeamMemberProps = {
  position: number
  member: PokemonIconDatum
  dispatchTeam: React.Dispatch<TeamAction>
  team: Team
}

const TeamMember = ({
  position,
  member,
  dispatchTeam,
  team,
}: TeamMemberProps) => {
  // const [replacing, setReplacing] = useState(false);
  const [removing, setRemoving] = useState(false);
  let [startTime, setStartTime] = useState<number | undefined>();
  const removeTimer = useRef<NodeJS.Timeout>();

  const removeDuration = 1500;
  // const replaceDuration = 1000;

  const onReplaceClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    if (removing || team.mode !== 'replace') return;

    // We're replacing existing Pokemon
    // if (member.psID && member.psID !== team.loadedPokemon?.psID) {
    //   setReplacing(true);
    //   setTimeout(() => {
    //     setReplacing(false);
    //   }, replaceDuration);
    // }

    if (team.mode === 'replace' && team.loadedPokemon !== null) {
      dispatchTeam({
        type: 'replace',
        payload: position,
      });
    }
  }

  /* Removing Pokemon */
  /* #region */

  function removePokemon() {
    if (team.mode === 'default') {
      dispatchTeam({
        type: 'remove',
        payload: position,
      });
    }

    // No longer removing Pokemon
    setRemoving(false);

    // Get rid of removal timer
    setStartTime(undefined);
  }

  const onRemoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    // if (replacing) return;
    
    // Start removal timer
    setStartTime((new Date()).getTime());
    
    // Start removing Pokemon
    setRemoving(true);
    removeTimer.current = setTimeout(removePokemon, removeDuration);
  }

  const onReturnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (startTime === undefined) return;

    // No longer removing Pokemon
    setRemoving(false);
    setStartTime(undefined);
    // Clear remove timer
    if (removeTimer.current) clearTimeout(removeTimer.current);
  }

  /* #endregion */

  return (
    <div
      className={`
        team-member__wrapper
        ${team.mode === 'replace'
          ? 'team-member__wrapper--replace'
          : ''
        }
      `}
      onClick={onReplaceClick}
    >
      {member.psID && (
        <>
          <TeamMemberIcon
            pokemonIconDatum={member}
            removing={removing}
            // replaceDuration={replaceDuration}
            removeDuration={removeDuration}
            startTime={startTime}
          />
          <RemoveIcon
            removing={removing}
            onClick={removing 
              ? onReturnClick
              : onRemoveClick}
          />
        </>
      )}
    </div>
  );
}

export default TeamMember;