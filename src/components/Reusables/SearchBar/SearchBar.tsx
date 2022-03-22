import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import './SearchBar.css';

type SearchBarProps = {
  id: string
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
  id,
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
    <fieldset className="search-bar__wrapper">
      <legend className="hidden-label">{title}</legend>
      <div className="search-bar__label">
        Search
      </div>
      <label htmlFor={id} className="hidden-label">Name search</label>
      <TextInput
        id={id}
        inputType='search'
        title={title}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchTermChange}
        setFocusedOnInput={setFocusedOnInput}
      />
      {containsOption && <>
        <label htmlFor={id + '_starts'} className="hidden-label">Start with</label>
        <Button
          id={id + 'starts'}
          title="Search by whether names start with the given search term."
          label="Starts"
          active={searchMode === 'STARTS'}
          onClick={e => handleSearchModeChange(e, 'STARTS')}
          disabled={false}
          immediate={false}
        />
        <label htmlFor={id + '_contains'} className="hidden-label">Contains</label>
        <Button
          id={id + '_contains'}
          title="Search by whether names contain with the given search term."
          label="Contains"
          active={searchMode === 'CONTAINS'}
          onClick={e => handleSearchModeChange(e, 'CONTAINS')}
          disabled={false}
          immediate={false}
        />
      </>}
    </fieldset>
  );
};

export default SearchBar;