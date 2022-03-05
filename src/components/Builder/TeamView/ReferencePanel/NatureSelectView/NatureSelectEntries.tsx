import { useEffect, useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { MemberNature, MemberNatureQuery, MemberNatureResult } from "../../../../../types-queries/Member/MemberNature";
import { Filters } from "../../../../App";
import { NatureSelectHandlers } from "../../TeamView";
import NatureSelectEntry from "./NatureSelectEntry";

type NatureSelectEntriesProps = {
  data: MemberNatureQuery
  clickHandlers: NatureSelectHandlers
  filters: Filters
  focusedOnInput: boolean
};

const NatureSelectEntries = ({
  data,
  clickHandlers,
  filters,
  focusedOnInput,
}: NatureSelectEntriesProps) => {
  const originalEntries: MemberNature[] | undefined = useMemo(() => {
    // If not data, do nothing
    if (!data) return undefined;

    return data.natures.edges.map((memberNatureEdge: { node: MemberNatureResult, }) => {
      return new MemberNature(memberNatureEdge.node, filters.genFilter.gen);
    });
  }, [data, filters.genFilter, ]);

  // Entries to be rendered, which should be sorted according to orderByKey
  const [entries, setEntries] = useState<MemberNature[] | undefined>(originalEntries);

  useEffect(() => {
    setEntries(originalEntries);
  }, [originalEntries, setEntries]);

  // 'Enter' selects first entry
  const onEnter = (event: KeyboardEvent) => {
    if (!focusedOnInput) return;
    if (event.code === 'Enter' && entries && entries.length > 0) clickHandlers.onNatureSelect(event, entries[0]);
  }
  useEventListener('keydown', onEnter);

  return (
    <div
      className="nature-select__entries-wrapper"
    >
      {entries && entries.map(entry => {
        return (
          <NatureSelectEntry
            key={`natureSelectEntry_${entry.name}`}
            clickHandlers={clickHandlers}
            nature={entry}
          />
        )
      })}
    </div>
  )
};

export default NatureSelectEntries;