import { useMemo } from "react";
import { Team } from "../../../hooks/App/Team";
import { useDelayedQuery } from "../../../hooks/Searches";
import { AbilityCoverageQuery, ABILITY_COVERAGE_QUERY, CoverageSearchVars, ItemCoverageQuery, ITEM_COVERAGE_QUERY, MoveCoverageQuery, MOVE_COVERAGE_QUERY } from "../../../types-queries/Analyzer/Coverage";
import { ABILITY_MATCHUP_QUERY, ITEM_MATCHUP_QUERY, MatchupSearchVars, MatchupSearchVarsType, AbilityMatchupQuery, ItemMatchupQuery, TypingMatchupQuery, TYPING_MATCHUP_QUERY } from "../../../types-queries/Analyzer/Matchups";
import { MemberPokemon } from "../../../types-queries/Builder/MemberPokemon";
import { CapsTypeName, toCapsTypeName } from "../../../types-queries/helpers";
import { Filters } from "../../App";

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

  const { data: data_matchupType, loading: loading_matchupType, error: error_matchupType } = useDelayedQuery<TypingMatchupQuery, MatchupSearchVarsType>({
    query: TYPING_MATCHUP_QUERY, 
    queryVars: {
      gen: filters.genFilter.gen,
      names: namesForQueries.matchups.typeNames,
    },
    delay: 50,
  });

  const { data: data_matchupAbility, loading: loading_matchupAbility, error: error_matchupAbility } = useDelayedQuery<AbilityMatchupQuery, MatchupSearchVars>({
    query: ABILITY_MATCHUP_QUERY, 
    queryVars: {
      gen: filters.genFilter.gen,
      psIDs: namesForQueries.matchups.abilityPSIDs,
    },
    delay: 50,
  });

  const { data: data_matchupItem, loading: loading_matchupItem, error: error_matchupItem } = useDelayedQuery<ItemMatchupQuery, MatchupSearchVars>({
    query: ITEM_MATCHUP_QUERY, 
    queryVars: {
      gen: filters.genFilter.gen,
      psIDs: namesForQueries.matchups.itemPSIDs,
    },
    delay: 50,
  });

  // #endregion

  // Coverage queries
  // #region

  const { data: data_coverageAbility, loading: loading_coverageAbility, error: error_coverageAbility } = useDelayedQuery<AbilityCoverageQuery, CoverageSearchVars>({
    query: ABILITY_COVERAGE_QUERY, 
    queryVars: {
      gen: filters.genFilter.gen,
      psIDs: namesForQueries.coverage.abilityPSIDs,
    },
    delay: 50,
  });

  const { data: data_coverageItem, loading: loading_coverageItem, error: error_coverageItem } = useDelayedQuery<ItemCoverageQuery, CoverageSearchVars>({
    query: ITEM_COVERAGE_QUERY, 
    queryVars: {
      gen: filters.genFilter.gen,
      psIDs: namesForQueries.coverage.itemPSIDs,
    },
    delay: 50,
  });

  const { data: data_coverageMove, loading: loading_coverageMove, error: error_coverageMove } = useDelayedQuery<MoveCoverageQuery, CoverageSearchVars>({
    query: MOVE_COVERAGE_QUERY, 
    queryVars: {
      gen: filters.genFilter.gen,
      psIDs: namesForQueries.coverage.movePSIDs,
    },
    delay: 50,
  });

  // #endregion

  return (
    <div>yo</div>
  );
};

export default CoverageView;