import { DocumentNode } from "graphql";
import { MemberResult } from "../../../../types-queries/Member/helpers";

type PopupSearchProps = {
  data: MemberResult[] | undefined
  searchBar: JSX.Element
};

const PopupSearch = ({
  data,
  searchBar,
}: PopupSearchProps) => {
  return (
    <div
      className={`
        popup-search__wrapper
      `}
    >
      <div className="popup-search__search-bar">
        {searchBar}
      </div>
      {data && data.map(edge => (<div
        key={`popup_result_${edge.psID}`}
        className={`
          popup-search__result
        `}
      >
        {edge.formattedName}
      </div>))}
    </div>
  );
};

export default PopupSearch;