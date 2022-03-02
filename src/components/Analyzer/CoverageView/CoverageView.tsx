import { useEffect, useMemo, useState } from "react";
import { Team } from "../../../hooks/App/Team";
import { useDelayedQuery } from "../../../hooks/Searches";
import { AbilityCoverageQuery, ABILITY_COVERAGE_QUERY, CoverageSearchVars, ItemCoverageQuery, ITEM_COVERAGE_QUERY, MoveCoverageQuery, MOVE_COVERAGE_QUERY } from "../../../types-queries/Analyzer/Coverage";
import { ABILITY_MATCHUP_QUERY, ITEM_MATCHUP_QUERY, MatchupSearchVars, MatchupSearchVarsType, AbilityMatchupQuery, ItemMatchupQuery, TypingMatchupQuery, TYPING_MATCHUP_QUERY } from "../../../types-queries/Analyzer/Matchups";
import { MemberPokemon } from "../../../types-queries/Builder/MemberPokemon";
import { CapsTypeName, toCapsTypeName } from "../../../types-queries/helpers";
import { Filters } from "../../App";
import FieldControl from "./FieldControl";
import SpeedControl from "./SpeedControl";
import StatusControl from "./StatusControl";
import TeamColumn from "./TeamColumn/TeamColumn";
import TypeMatchup from "./TypeMatchup/TypeMatchup";

import './CoverageView.css';
import { useQuery } from "@apollo/client";

type CoverageViewProps = {
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
  filters,
  team,
}: CoverageViewProps) => {
  const [relevantNames, setRelevantNames] = useState<string[] | null>(null);

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

  const onMouseOver = (psIDs: string[]) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setRelevantNames(psIDs);
    }
  }

  const onMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setRelevantNames(null);
  }

  return (
    <div
      className="coverage-view__wrapper"
    >
      <div className="team-column__cell">
        <TeamColumn
          filters={filters}
          team={team}
          relevantNames={relevantNames}
        />
      </div>
      <div className="type-matchup__cell">
        {loading_matchupAbility || loading_matchupItem || loading_matchupType || loading_coverageMove
          ? <div>Loading...</div>
          : data_matchupAbility && data_matchupItem && data_matchupType && data_coverageMove
            ? <TypeMatchup
                filters={filters}
                team={team}
                abilityData={data_matchupAbility} 
                itemData={data_matchupItem} 
                typingData={data_matchupType}
                moveData={data_coverageMove}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
              />
            : <div>Type matchup data not found.</div>
        }
      </div>
      <div className="field-control__cell">
        {loading_coverageAbility || loading_coverageItem || loading_coverageMove 
          ? <div>Loading...</div>
          : data_coverageAbility && data_coverageItem && data_coverageMove
            ? <FieldControl
                filters={filters}
                abilityData={data_coverageAbility} 
                itemData={data_coverageItem} 
                moveData={data_coverageMove} 
              />
            : <div>Field control data not found.</div>
        }
      </div>
      <div className="speed-control__cell">
        {loading_coverageAbility || loading_coverageItem || loading_coverageMove 
          ? <div>Loading...</div>
          : data_coverageAbility && data_coverageItem && data_coverageMove
            ? <SpeedControl
                filters={filters}
                abilityData={data_coverageAbility} 
                itemData={data_coverageItem} 
                moveData={data_coverageMove} 
              />
            : <div>Speed control data not found.</div>
        }

      </div>
      <div className="status-control__cell">
        {loading_coverageAbility || loading_coverageItem || loading_coverageMove 
          ? <div>Loading...</div>
          : data_coverageAbility && data_coverageItem && data_coverageMove
            ? <StatusControl
                filters={filters}
                abilityData={data_coverageAbility} 
                itemData={data_coverageItem} 
                moveData={data_coverageMove} 
              />
            : <div>Status control data not found.</div>
        }

      </div>
    </div>
  );
};

export default CoverageView;