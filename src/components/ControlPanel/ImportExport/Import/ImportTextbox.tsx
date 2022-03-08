import { useMemo, useState } from "react";
import Button from "../../../Reusables/Button/Button";
import { ImportState } from "./Import";

type ImportTextboxProps = {
  onImport: (importString: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  importState: ImportState
};

const ImportTextbox = ({
  onImport,
  importState,
}: ImportTextboxProps) => {
  const [importString, setImportString] = useState<string>('');

  /*
    Determine message to display based on various factors:
      First, flag 'importError', as that indicates we failed to parse the import string
      If we successfully parsed the import string, then we then attempt to run a GQL query. 'queryError' and 'loading' keep track of thi 
  */
  const messageDisplay: JSX.Element = useMemo(() => {
    return (
      <div className={`
        import-message__${importState.key}
      `}
      >
        {importState.messageComponent}
      </div>
    )
  }, [importState, ]);

  return (
    <div className="import__textbox-wrapper">
      <textarea
        className="import__input"
        name="import-team"
        id=""
        cols={40}
        rows={15}
        placeholder="Import Pokemon in PokePaste format (sets separated by two newline '\n' characters). Remaining slots in the current team will be filled in with the imported Pokemon until no more slots are available."
        value={importString}
        onChange={e => setImportString(e.target.value)}
      />
      <div className="import__bottom-wrapper">
        {messageDisplay}
        <div className="import__button">
          <Button
            title="Import Pokemon."
            label="IMPORT"

            active={true}
            onClick={onImport(importString)}
            disabled={false}
            immediate={true}
          />
        </div>
      </div>
    </div>
  )
};

export default ImportTextbox;