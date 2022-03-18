import { useEventListener } from "usehooks-ts";
import LoadIcon from "../../Reusables/LoadIcon/LoadIcon";

type PopupSearchProps<ResultEdge> = {
  data: ResultEdge[] | undefined
  loading: boolean
  searchBar: JSX.Element
  focusedOnInput: boolean
  onSelect: (result: ResultEdge) => (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void
};

function PopupSearch<Result extends { node: { psID: string, formattedName: string, }}> ({
  data,
  loading,
  searchBar,
  focusedOnInput,
  onSelect,
}: PopupSearchProps<Result>): JSX.Element {

  // 'Enter' selects first entry
  const onEnter = (event: KeyboardEvent) => {
    if (!focusedOnInput) return;
    if (event.code === 'Enter' && data && data.length > 0) onSelect(data[0])(event);
  }
  useEventListener('keydown', onEnter);

  return (
    <div
      className={`
        popup-search__wrapper
      `}
    >
      <div className="popup-search__search-bar">
        {searchBar}
      </div>
      <div className="popup-search__results">
        {loading
          ? <LoadIcon />
          : data && data.map(edge => (<div
            key={edge.node.psID}
            className={`
              popup-search__result
            `}
            onClick={onSelect(edge)}
          >
            {edge.node.formattedName}
          </div>))
        }
      </div>
    </div>
  );
};

export default PopupSearch;