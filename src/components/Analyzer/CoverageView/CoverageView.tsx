import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { Team } from "../../../hooks/App/Team";
import { AbilityCoverageQuery, ABILITY_COVERAGE_QUERY, CoverageSearchVars, ItemCoverageQuery, ITEM_COVERAGE_QUERY, MoveCoverageQuery, MOVE_COVERAGE_QUERY } from "../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { AbilityMatchupQuery, ABILITY_MATCHUP_QUERY, ItemMatchupQuery, ITEM_MATCHUP_QUERY, MatchupSearchVars, MatchupSearchVarsType, TypingMatchupQuery, TYPING_MATCHUP_QUERY } from "../../../types-queries/Analyzer/Matchups";
import { CapsTypeName, toCapsTypeName } from "../../../types-queries/helpers";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Dispatches, Filters } from "../../App";
import LoadIcon from "../../Reusables/LoadIcon/LoadIcon";
import TeamColumn from "../TeamColumn/TeamColumn";
import './CoverageView.css';
import FieldControl from "./FieldControl/FieldControl";
import SpeedControl from "./SpeedControl/SpeedControl";
import StatusControl from "./StatusControl/StatusControl";
import TypeMatchup from "./TypeMatchup/TypeMatchup";


type CoverageViewProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team
};

type NamesForQueries = {
  matchups: {
    typeNames: CapsTypeName[]
    abilityPSIDs: string[]
    itemPSIDs: string[]
  }
  coverage: {
    abilityPSIDs: string[]
    itemPSIDs: string[]
    movePSIDs: string[]
  }
}

const CoverageView = ({
  dispatches,
  filters,
  team,
}: CoverageViewProps) => {
  const [relevantNames, setRelevantNames] = useState<MemberPSIDObject | null>(null);

  const namesForQueries: NamesForQueries = useMemo(() => {
    let names: NamesForQueries = {
      matchups: {
        typeNames: [] as CapsTypeName[],
        abilityPSIDs: [] as string[],
        itemPSIDs: [] as string[],
      },
      coverage: {
        abilityPSIDs: [] as string[],
        itemPSIDs: [] as string[],
        movePSIDs: [] as string[],
      },
    };

    // Iterate over non-null members to extract names
    const nonNullMembers: MemberPokemon[] = (team[filters.genFilter.gen].members.filter(d => d !== null) as MemberPokemon[]);
    for (let member of nonNullMembers) {
      // Names from typing
      for (let typeName of member.typing) names.matchups.typeNames.push(toCapsTypeName(typeName));

      // Ability name
      if (member.ability?.psID) {
        names.matchups.abilityPSIDs.push(member.ability?.psID);
        names.coverage.abilityPSIDs.push(member.ability?.psID);
      }
      // Item name
      if (member.item?.psID) {
        names.matchups.itemPSIDs.push(member.item?.psID);
        names.coverage.itemPSIDs.push(member.item?.psID);  
      }
      // Move names
      for (let move of member.moveset) {
        if (move === null) continue;
        else names.coverage.movePSIDs.push(move?.psID);  
      }
    }

    return names;
  }, [filters, team]);

  const memberAndEntityPSIDs: MemberAndEntityPSIDs = useMemo(() => {
    const nonNullMembers: MemberPokemon[] = (team[filters.genFilter.gen].members.filter(d => d !== null) as MemberPokemon[]);

    return nonNullMembers.map(d => {
      const movePSIDs: string[] = (d.moveset.map(d => d?.psID).filter(d => d !== undefined) as string[]);
      return {
        psID: d.psID,
        typing: d.typing,
        abilityPSID: d.ability?.psID,
        itemPSID: d.item?.psID,
        movePSIDs,
      };
    });
  }, [team, filters]);

  // Matchup queries
  // #region

  const { data: data_matchupType, loading: loading_matchupType, error: error_matchupType } = useQuery<TypingMatchupQuery, MatchupSearchVarsType>(
    TYPING_MATCHUP_QUERY, 
    {
      variables: {
        gen: filters.genFilter.gen,
        names: namesForQueries.matchups.typeNames,
      }
    }
  );

  const { data: data_matchupAbility, loading: loading_matchupAbility, error: error_matchupAbility } = useQuery<AbilityMatchupQuery, MatchupSearchVars>(
    ABILITY_MATCHUP_QUERY, 
    {
      variables: {
        gen: filters.genFilter.gen,
        psIDs: namesForQueries.matchups.abilityPSIDs,
        }
      }
    );

  const { data: data_matchupItem, loading: loading_matchupItem, error: error_matchupItem } = useQuery<ItemMatchupQuery, MatchupSearchVars>(
    ITEM_MATCHUP_QUERY, 
    {
      variables: {
        gen: filters.genFilter.gen,
        psIDs: namesForQueries.matchups.itemPSIDs,
      }
    }
  );

  // #endregion

  // Coverage queries
  // #region

  const { data: data_coverageAbility, loading: loading_coverageAbility, error: error_coverageAbility } = useQuery<AbilityCoverageQuery, CoverageSearchVars>(
    ABILITY_COVERAGE_QUERY, 
    {
      variables: {
        gen: filters.genFilter.gen,
        psIDs: namesForQueries.coverage.abilityPSIDs,
      }
    }
  );

  const { data: data_coverageItem, loading: loading_coverageItem, error: error_coverageItem } = useQuery<ItemCoverageQuery, CoverageSearchVars>(
    ITEM_COVERAGE_QUERY, 
    {
      variables: {
        gen: filters.genFilter.gen,
        psIDs: namesForQueries.coverage.itemPSIDs,
      }
    }
  );

  const { data: data_coverageMove, loading: loading_coverageMove, error: error_coverageMove } = useQuery<MoveCoverageQuery, CoverageSearchVars>(
    MOVE_COVERAGE_QUERY, 
    {
      variables: {
        gen: filters.genFilter.gen,
        psIDs: namesForQueries.coverage.movePSIDs,
      }
    }
  );

  // #endregion

  // Keeps track of whether a popup search window has been opened
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);

  // When hovering over a data point, store the relevant names
  const onMouseOver = (memberPSIDObject: MemberPSIDObject) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => {
      e.preventDefault();

      // If popup window is active, then don't change relevant names; the relevant names of the popup window (member name and entity name) take precedence
      if (!isPopupActive) setRelevantNames(memberPSIDObject);
    }
  }

  // Upon leaving a data point, discard the relevant names
  const onMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => {
    e.preventDefault();

    // If popup window is active, then don't change relevant names; the relevant names of the popup window (member name and entity name) take precedence
    if (!isPopupActive) setRelevantNames(null);
  }

  // When ability, item, or move is clicked, emphasize the entity and member, and set 'isPopupActive' to 'true', as this action will open a pop-up window
  const onEntityClick = (memberPSID: string, entityPSID: string) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setRelevantNames({
        [memberPSID]: [entityPSID],
      });
      setIsPopupActive(true);
    };
  }

  // Once the pop-up window closes, set 'isPopupActive' to 'false', and set 'revantNames' to 'null'
  const onPopupClose = () => {
    setIsPopupActive(false);
    return setRelevantNames(null);
  }

  for (let error of [error_matchupAbility, error_matchupItem, error_coverageMove, error_coverageAbility, error_coverageItem, error_coverageMove]) {
    if (error) return (<div>Error! {error.message}</div>);
  }

  return (
    <div
      className="coverage-view__wrapper"
    >
      <section className="team-column__cell">
        <h2 className="hidden-header">Your team</h2>
        <TeamColumn
          teamDispatch={dispatches.dispatchTeam}
          filters={filters}
          team={team}
          mode={'normal'}
          relevantNames={relevantNames}
          onEntityClick={onEntityClick}
          onPopupClose={onPopupClose}
        />
      </section>
      <section className="type-matchup__cell">
        <h2 className="hidden-header">Your team's type matchups</h2>
        {loading_matchupAbility || loading_matchupItem || loading_matchupType || loading_coverageMove
          ? <LoadIcon />
          : data_matchupAbility && data_matchupItem && data_matchupType && data_coverageMove
            ? <TypeMatchup
                filters={filters}

                abilityData={data_matchupAbility} 
                itemData={data_matchupItem} 
                typingData={data_matchupType}
                moveData={data_coverageMove}

                memberAndEntityPSIDs={memberAndEntityPSIDs}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              />
            : <div>Type matchup data not found.</div>
        }
      </section>
      <section className="status-control__cell">
        <h2 className="hidden-header">Your team's ability to cause and resist status effects</h2>
        {loading_coverageAbility || loading_coverageItem || loading_coverageMove 
          ? <LoadIcon />
          : data_coverageAbility && data_coverageItem && data_coverageMove
            ? <StatusControl
                filters={filters}
                
                abilityData={data_coverageAbility} 
                itemData={data_coverageItem} 
                moveData={data_coverageMove}

                memberAndEntityPSIDs={memberAndEntityPSIDs}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              />
            : <div>Status control data not found.</div>
        }
      </section>
      <section className="field-control__cell">
        <h2 className="hidden-header">Your team's ability to create and mitigate hazards, weather, and terrain.</h2>
        {loading_coverageAbility || loading_coverageItem || loading_coverageMove 
          ? <LoadIcon />
          : data_coverageAbility && data_coverageItem && data_coverageMove
            ? <FieldControl
                filters={filters}

                abilityData={data_coverageAbility} 
                itemData={data_coverageItem} 
                moveData={data_coverageMove}

                memberAndEntityPSIDs={memberAndEntityPSIDs}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              />
            : <div>Field control data not found.</div>
        }
      </section>
      <section className="speed-control__cell">
        <h2 className="hidden-header">Your team's forms of speed control.</h2>
        {loading_coverageAbility || loading_coverageItem || loading_coverageMove 
          ? <LoadIcon />
          : data_coverageAbility && data_coverageItem && data_coverageMove
            ? <SpeedControl
                abilityData={data_coverageAbility} 
                itemData={data_coverageItem} 
                moveData={data_coverageMove}

                memberAndEntityPSIDs={memberAndEntityPSIDs}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              />
            : <div>Speed control data not found.</div>
        }

      </section>
    </div>
  );
};

export default CoverageView;