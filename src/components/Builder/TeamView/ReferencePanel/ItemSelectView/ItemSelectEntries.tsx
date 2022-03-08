import { useEffect, useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { MemberItem, MemberItemQuery, MemberItemResult } from "../../../../../types-queries/Member/MemberItem";
import { Filters } from "../../../../App";
import { ItemSelectHandlers } from "../../TeamView";
import ItemSelectEntry from "./ItemSelectEntry";

type ItemSelectEntriesProps = {
  data: MemberItemQuery
  clickHandlers: ItemSelectHandlers
  filters: Filters
  focusedOnInput: boolean
};

const ItemSelectEntries = ({
  data,
  clickHandlers,
  filters,
  focusedOnInput,
}: ItemSelectEntriesProps) => {
  const [sorted, setSorted] = useState(false);

  const originalEntries: MemberItem[] | undefined = useMemo(() => {
    // If not data, do nothing
    if (!data) return undefined;

    return data.items.edges.map((memberItemEdge: { node: MemberItemResult, }) => {
      return new MemberItem(memberItemEdge.node, filters.genFilter.gen);
    });
  }, [data, filters.genFilter, ]);

  // Entries to be rendered, which should be sorted according to orderByKey
  const [entries, setEntries] = useState<MemberItem[] | undefined>(originalEntries);

  useEffect(() => {
    setEntries(originalEntries);
  }, [originalEntries, setEntries]);

  // 'Enter' selects first entry
  const onEnter = (event: KeyboardEvent) => {
    if (!focusedOnInput) return;
    if (event.code === 'Enter' && entries && entries.length > 0) clickHandlers.onItemSelect(event, entries[0]);
  }
  useEventListener('keydown', onEnter);

  return (
    <div
      className="item-select__entries-wrapper"
    >
      {entries && entries.map(entry => {
        return (
          <ItemSelectEntry
            key={entry.psID}
            clickHandlers={clickHandlers}
            item={entry}
          />
        )
      })}
    </div>
  )
};

export default ItemSelectEntries;