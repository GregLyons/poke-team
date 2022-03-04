import { ApolloError } from "@apollo/client";
import { useState } from "react";
import { GenerationNum } from "../../../types-queries/helpers";
import Button from "../../Reusables/Button/Button";

type ImportTextboxProps = {
  onImport: (importString: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  importError: boolean
  lateMembers: [string, GenerationNum][]
  loading: boolean
  queryError: ApolloError | undefined
};

const ImportTextbox = ({
  onImport,
  importError,
  queryError,
  lateMembers,
  loading,
}: ImportTextboxProps) => {
  const [importString, setImportString] = useState<string>('');
  return (
    <div className="import-textbox__wrapper">
      <textarea
        className="import-textbox__input"
        name="import-team"
        id=""
        cols={40}
        rows={15}
        placeholder="Import Pokemon in PokePaste format (sets separated by two newline '\n' characters). Remaining slots in the current team will be filled in with the imported Pokemon until no more slots are available."
        value={importString}
        onChange={e => setImportString(e.target.value)}
      />
      <div className="import-textbox__bottom-wrapper">
        <div className="import-textbox__message">
          {importError  
            ? <span className="import-textbox__error">ERROR: check formatting</span>
            : queryError 
              ? <span className="import-textbox__error">ERROR: failed query</span>
              : loading
                ? <span className="import-textbox__loading">Loading...</span> 
                : lateMembers && lateMembers.length > 0
                  ? <span className="import-textbox__error">{lateMembers.map(d => `${d[0]} (Gen ${d[1]})`).join(',')} not valid!</span>
                  : ''
          }
        </div>
        <div className="import-textbox__button">
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