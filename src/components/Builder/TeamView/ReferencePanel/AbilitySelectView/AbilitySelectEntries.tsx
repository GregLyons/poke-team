import { useMemo, useState } from "react";
import { MemberAbility, MemberAbilityQuery, MemberAbilityQueryResult } from "../../../../../types-queries/Builder/MemberAbility";
import { Filters } from "../../../../App";
import AbilitySelectEntry from "./AbilitySelectEntry";

type AbilitySelectEntriesProps = {
  data: MemberAbilityQuery
  filters: Filters
};

const AbilitySelectEntries = ({
  data,
  filters,
}: AbilitySelectEntriesProps) => {
  const [sorted, setSorted] = useState(false);

  const originalEntries: MemberAbility[] | undefined = useMemo(() => {
    // If not data, do nothing
    if (!data) return undefined;

    return data.pokemonByPSID[0].abilities.edges.map((memberAbilityEdge: { node: MemberAbilityQueryResult, slot: 'ONE' | 'TWO' | 'HIDDEN' }) => {
      return new MemberAbility(memberAbilityEdge.node, filters.genFilter.gen, memberAbilityEdge.slot);
    });
  }, [data, filters.genFilter, ]);

  // Entries to be rendered, which should be sorted according to orderByKey
  const [entries, setEntries] = useState<MemberAbility[] | undefined>(originalEntries);

  return (
    <div
      className="ability-select__entries-wrapper"
    >
      {entries && entries.map(entry => {
        return (
          <AbilitySelectEntry
            key={`abilitySelectEntry_${entry.psID}`}
            ability={entry}
          />
        )
      })}
    </div>
  )
};

export default AbilitySelectEntries;