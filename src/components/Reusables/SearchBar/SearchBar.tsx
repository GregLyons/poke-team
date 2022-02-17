import Button from '../Button/Button';
import './SearchBar.css';

type SearchBarProps = {
  searchTerm: string
  handleSearchTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchMode: 'STARTS' | 'CONTAINS'
  handleSearchModeChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, mode: 'STARTS' | 'CONTAINS') => void
};

const SearchBar = ({
  searchTerm,
  handleSearchTermChange,
  searchMode,
  handleSearchModeChange,
}: SearchBarProps) => {
  return (
    <div className="search-bar__wrapper">
      <input
        className="search-bar"
        type="text" 
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <Button
        title="Search by whether names start with the given search term."
        label="STARTS"
        active={searchMode === 'STARTS'}
        onClick={e => handleSearchModeChange(e, 'STARTS')}
        disabled={false}
        immediate={false}
      />
      <Button
        title="Search by whether names contain with the given search term."
        label="CONTAINS"
        active={searchMode === 'CONTAINS'}
        onClick={e => handleSearchModeChange(e, 'CONTAINS')}
        disabled={false}
        immediate={false}
      />
    </div>
  );
};

export default SearchBar;