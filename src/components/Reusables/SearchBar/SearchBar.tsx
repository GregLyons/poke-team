import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import './SearchBar.css';

type SearchBarProps = {
  title: string
  placeholder: string

  searchTerm: string
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchMode: 'STARTS' | 'CONTAINS'
  handleSearchModeChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => void

  containsOption?: boolean
  
  backgroundLight: 'red' | 'green' | 'blue'

  setFocusedOnInput: React.Dispatch<React.SetStateAction<boolean>>
};

const SearchBar = ({
  title,
  placeholder,
  searchTerm,
  handleSearchTermChange,
  searchMode,
  handleSearchModeChange,

  containsOption = true,

  setFocusedOnInput,
}: SearchBarProps) => {
  return (
    <div className="search-bar__wrapper">
      <div className="search-bar__label">
        Search
      </div>
      <TextInput
        title={title}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchTermChange}
        setFocusedOnInput={setFocusedOnInput}
      />
      {containsOption && <>
        <Button
          title="Search by whether names start with the given search term."
          label="Starts"
          active={searchMode === 'STARTS'}
          onClick={e => handleSearchModeChange(e, 'STARTS')}
          disabled={false}
          immediate={false}
        />
        <Button
          title="Search by whether names contain with the given search term."
          label="Contains"
          active={searchMode === 'CONTAINS'}
          onClick={e => handleSearchModeChange(e, 'CONTAINS')}
          disabled={false}
          immediate={false}
        />
      </>}
    </div>
  );
};

export default SearchBar;