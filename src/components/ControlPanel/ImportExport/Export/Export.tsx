import { Dex } from "@pkmn/dex";
import { Sets } from "@pkmn/sets";
import { useMemo } from "react";
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
      <Popup
        trigger={<div>EXPORT</div>}
        content={<div
          className="export__textbox-wrapper"
        >
          {/* Iterate over member strings */}
          {exportText.map((memberString, memberIdx) => (<div
            className="export__member"
            key={`exportMember_${memberIdx}`}
          >
            {/* Iterate over pieces of member string, e.g. move piece, ability piece */}
            {memberString.split('\n').map((memberStringPiece, pieceIdx) => (<div
              className="export__member-piece"
              key={`exportMemberPiece_${memberIdx}_${pieceIdx}_${memberStringPiece}`}
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