import { useEffect, useMemo, useState } from "react";
import { MemberItem, MemberItemQuery, MemberItemQueryResult } from "../../../../../types-queries/Builder/MemberItem";
import { Filters } from "../../../../App";
import { ItemSelectClickHandlers } from "../../TeamView";
import ItemSelectEntry from "./ItemSelectEntry";

type ItemSelectEntriesProps = {
  data: MemberItemQuery
  clickHandlers: ItemSelectClickHandlers
  filters: Filters
};

const ItemSelectEntries = ({
  data,
  clickHandlers,
  filters,
}: ItemSelectEntriesProps) => {
  const [sorted, setSorted] = useState(false);

  const originalEntries: MemberItem[] | undefined = useMemo(() => {
    // If not data, do nothing
    if (!data) return undefined;

    return data.items.edges.map((memberItemEdge: { node: MemberItemQueryResult, }) => {
      return new MemberItem(memberItemEdge.node, filters.genFilter.gen);
    });
  }, [data, filters.genFilter, ]);

  // Entries to be rendered, which should be sorted according to orderByKey
  const [entries, setEntries] = useState<MemberItem[] | undefined>(originalEntries);

  useEffect(() => {
    setEntries(originalEntries);
  }, [originalEntries, setEntries]);

  return (
    <div
      className="item-select__entries-wrapper"
    >
      {entries && entries.map(entry => {
        return (
          <ItemSelectEntry
            key={`itemSelectEntry_${entry.psID}`}
            clickHandlers={clickHandlers}
            item={entry}
          />
        )
      })}
    </div>
  )
};

export default ItemSelectEntries;