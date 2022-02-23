import { useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { MemberAbility, MemberAbilityQuery, MemberAbilityQueryResult } from "../../../../../types-queries/Builder/MemberAbility";
import { Filters } from "../../../../App";
import { AbilitySelectClickHandlers } from "../../TeamView";
import AbilitySelectEntry from "./AbilitySelectEntry";

type AbilitySelectEntriesProps = {
  data: MemberAbilityQuery
  clickHandlers: AbilitySelectClickHandlers
  filters: Filters
  focusedOnInput: boolean
};

const AbilitySelectEntries = ({
  data,
  clickHandlers,
  filters,
  focusedOnInput,
}: AbilitySelectEntriesProps) => {
  const entries: MemberAbility[] | undefined = useMemo(() => {
    // If not data, do nothing
    if (!data) return undefined;

    return data.pokemonByPSID[0].abilities.edges.map((memberAbilityEdge: { node: MemberAbilityQueryResult, slot: 'ONE' | 'TWO' | 'HIDDEN' }) => {
      return new MemberAbility(memberAbilityEdge.node, filters.genFilter.gen, memberAbilityEdge.slot);
    });
  }, [data, filters.genFilter, ]);

  // 'Enter' selects first entry
  const onEnter = (event: KeyboardEvent) => {
    if (!focusedOnInput) return;
    if (event.code === 'Enter' && entries && entries.length > 0) clickHandlers.onAbilitySelect(event, entries[0]);
  }
  useEventListener('keydown', onEnter);

  return (
    <div
      className="ability-select__entries-wrapper"
    >
      {entries && entries.map(entry => {
        return (
          <AbilitySelectEntry
            key={`abilitySelectEntry_${entry.psID}`}
            clickHandlers={clickHandlers}
            ability={entry}
          />
        )
      })}
    </div>
  )
};

export default AbilitySelectEntries;