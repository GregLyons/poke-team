import { Dex } from "@pkmn/dex";
import { Sets } from "@pkmn/sets";
import { useMemo, useRef } from "react";
import { Team } from "../../../../hooks/App/Team";
import { Filters } from "../../../App";
import Popup from "../../../Reusables/Popup/Popup";
import './Export.css';

type ExportProps = {
  filters: Filters
  team: Team
};

const Export = ({
  filters,
  team,
}: ExportProps) => {
  const exportEl = useRef<HTMLDivElement>(null);

  const selectExportString = () => {
    if (!exportEl.current) return;

    const el = exportEl.current;
    const range = document.createRange();
    range.selectNodeContents(el);

    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  const exportText: string[] = useMemo(() => {
    return team[filters.genFilter.gen].members.reduce((exportString: string[], currentMember) => {
      if (currentMember === null) return exportString;
      const set = currentMember.toPokemonSet();
      
      return exportString.concat([
        Sets.exportSet(set, Dex.forGen(filters.genFilter.gen)),
      ]);
    }, []);
  }, [filters, team, ]);

  return (
    <div
      className="export__wrapper"
      title="Export your team."
    >
      <label htmlFor="popup_export" className="hidden-label">Export your team</label>
      <Popup
        triggerID="popup_export"
        trigger={<div className="import-export__popup-trigger">EXPORT</div>}
        content={<div
          ref={exportEl}
          className="export__textbox-wrapper" 
          title="Copy this team string to your clipboard."
          onClick={e => {
            if (e.detail === 2) selectExportString()
          }}
          onFocus={() => selectExportString()}
          tabIndex={0}
        >
          {/* Iterate over member strings */}
          {exportText.map((memberString, memberIdx) => (<div
            className="export__member"
            key={memberIdx}
          >
            {/* Iterate over pieces of member string, e.g. move piece, ability piece */}
            {memberString.split('\n').map((memberStringPiece, pieceIdx) => (<div
              className="export__member-piece"
              key={pieceIdx}
            >
              {pieceIdx === 0
                // Extract name from string
                ? <><span className="export__member-name">{memberStringPiece.split(')')[0]})</span> {memberStringPiece.split(')').slice(1).join(')')}<br /></>
                : <>{memberStringPiece}<br /></>
              }
            </div>))}
          </div>))}
        </div>}
        orientation="bottom"
      />
    </div>
  );
};

export default Export;