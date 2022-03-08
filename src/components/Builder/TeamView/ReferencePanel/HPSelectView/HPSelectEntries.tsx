import { useEffect, useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { TypeName } from "../../../../../types-queries/helpers";
import { HPTypeQuery } from "../../../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../../../App";
import { HPSelectHandlers } from "../../TeamView";
import HPSelectEntry from "./HPSelectEntry";

type HPSelectEntriesProps = {
  data: HPTypeQuery
  clickHandlers: HPSelectHandlers
  filters: Filters
  focusedOnInput: boolean
};

const HPSelectEntries = ({
  data,
  clickHandlers,
  filters,
  focusedOnInput,
}: HPSelectEntriesProps) => {
  const originalEntries: TypeName[] | undefined = useMemo(() => {
    // If not data, do nothing
    if (!data) return undefined;

    return data.types.edges
      .map(typeEdge => {
        return typeEdge.node.name;
      })
      // No normal/fairy hidden power
      .filter(typeName => !['normal', 'fairy'].includes(typeName));
  }, [data, ]);

  // Entries to be rendered, which should be sorted according to orderByKey
  const [entries, setEntries] = useState<TypeName[] | undefined>(originalEntries);

  useEffect(() => {
    setEntries(originalEntries);
  }, [originalEntries, setEntries]);

  // 'Enter' selects first entry
  const onEnter = (event: KeyboardEvent) => {
    if (!focusedOnInput) return;
    if (event.code === 'Enter' && entries && entries.length > 0) clickHandlers.onHPSelect(event, entries[0]);
  }
  useEventListener('keydown', onEnter);

  return (
    <div
      className="hp-select__entries-wrapper"
    >
      {entries && entries.map(typeName => {
        return (
          <HPSelectEntry
            key={`hpSelectEntry_${typeName}`}
            clickHandlers={clickHandlers}
            typeName={typeName}
            defaultIV={filters.genFilter.gen > 2 ? 31 : 15}
          />
        )
      })}
    </div>
  )
};

export default HPSelectEntries;