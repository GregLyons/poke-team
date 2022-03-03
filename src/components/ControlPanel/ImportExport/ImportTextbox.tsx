import { useState } from "react";
import Button from "../../Reusables/Button/Button";

type ImportTextboxProps = {
  onImport: (teamString: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

const ImportTextbox = ({
  onImport,
}: ImportTextboxProps) => {
  const [teamString, setTeamString] = useState<string>('');
  return (
    <div className="import-textbox__wrapper">
      <textarea
        className="import-textbox__input"
        name="import-team"
        id=""
        cols={40}
        rows={15}
        placeholder="Import Pokemon in PokePaste format (sets separated by two line breaks). Remaining slots in the current team will be filled in with the imported Pokemon until no more slots are available."
        value={teamString}
        onChange={e => setTeamString(e.target.value)}
      />
      <div className="import-textbox__button">
        <Button
          title="Import Pokemon."
          label="IMPORT"

          active={true}
          onClick={onImport(teamString)}
          disabled={false}
          immediate={true}
        />
      </div>
    </div>
  )
};

export default ImportTextbox;