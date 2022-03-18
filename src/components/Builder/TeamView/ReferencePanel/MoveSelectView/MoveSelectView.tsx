import { useState } from "react";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { useDelayedQuery, useRemovalConnectedSearchBar } from "../../../../../hooks/Searches";
import { MoveColumnName, MovePaginationInput } from "../../../../../types-queries/helpers";
import { MemberMoveQuery, MemberMoveVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Member/MemberMove";
import { Filters } from "../../../../App";
import LoadIcon from "../../../../Reusables/LoadIcon/LoadIcon";
import SortSwitch from "../../../../Reusables/SortSwitch/SortSwitch";
import { MoveSelectHandlers } from "../../TeamView";
import MoveSelectEntries from "./MoveSelectEntries";
import './MoveSelectView.css';


type MoveSelectViewProps = {
  handlers: MoveSelectHandlers
  filters: Filters
  psID: string
}

const MoveSelectView = ({
  handlers,
  filters,
  psID,
}: MoveSelectViewProps) => {
  const [pagination, setPagination] = useState<MovePaginationInput>({
    orderBy: 'psID',
    sortBy: 'ASC',
  });

  const { queryVars, searchBar, focusedOnInput, } = useRemovalConnectedSearchBar<MemberMoveVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
      contains: '',
      startsWith: '',
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: "Search moves by name",
      backgroundLight: "green"
    },
  });

  const { data, loading, error } = useDelayedQuery<MemberMoveQuery, MemberMoveVars>({
    query: MEMBER_MOVESET_QUERY,
    queryVars,
    // Shorten the delay since users might be rapidly entering searches
    delay: 1,
  });

  const onPaginationChangeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, orderBy: MoveColumnName) => {
    e.preventDefault();

    // Reversing sortBy direction
    if (orderBy === pagination.orderBy) {
      setPagination({
        ...pagination,
        sortBy: pagination.sortBy === 'ASC'
          ? 'DESC'
          : 'ASC',
      })
    }
    else {
      setPagination({
        orderBy,
        sortBy: 'ASC',
      });
    }
  }

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div className="move-select__wrapper">
      <form>
        {searchBar}
      </form>
      <div className="move-select__results">
        <div className="move-select__legend">
          <div className="move-select__name">
            <span onClick={e => onPaginationChangeClick(e, 'psID')}>Name</span>
            <SortSwitch
              titleFor="name"
              onClick={e => onPaginationChangeClick(e, 'psID')}
              sortBy={pagination.orderBy === 'psID' ? pagination.sortBy : null}
            />
          </div>
          <div className="move-select__type">
            <span onClick={e => onPaginationChangeClick(e, 'type')}>Type</span>
            <SortSwitch
              titleFor="type"
              onClick={e => onPaginationChangeClick(e, 'type')}
              sortBy={pagination.orderBy === 'type' ? pagination.sortBy : null}
            />
          </div>
          <div className="move-select__power">
            <span onClick={e => onPaginationChangeClick(e, 'power')}>Pow</span>
            <SortSwitch
              titleFor="power"
              onClick={e => onPaginationChangeClick(e, 'power')}
              sortBy={pagination.orderBy === 'power' ? pagination.sortBy : null}
            />
          </div>
          <div className="move-select__pp">
            <span onClick={e => onPaginationChangeClick(e, 'pp')}>PP</span>
            <SortSwitch
              titleFor="PP"
              onClick={e => onPaginationChangeClick(e, 'pp')}
              sortBy={pagination.orderBy === 'pp' ? pagination.sortBy : null}
            />
          </div>
          <div className="move-select__accuracy">
            <span onClick={e => onPaginationChangeClick(e, 'accuracy')}>Acc</span>
            <SortSwitch
              titleFor="accuracy"
              onClick={e => onPaginationChangeClick(e, 'accuracy')}
              sortBy={pagination.orderBy === 'accuracy' ? pagination.sortBy : null}
            />
          </div>
          <div className="move-select__category">
            <span onClick={e => onPaginationChangeClick(e, 'category')}>Category</span>
            <SortSwitch
              titleFor="category"
              onClick={e => onPaginationChangeClick(e, 'category')}
              sortBy={pagination.orderBy === 'category' ? pagination.sortBy : null}
            />
          </div>
        </div>
        {loading
          ? <LoadIcon />
          : data && <MoveSelectEntries
              data={data}
              clickHandlers={handlers}
              filters={filters}
              focusedOnInput={focusedOnInput}
              pagination={pagination}
            />
        }
      </div>
    </div>
  )
};

export default MoveSelectView;