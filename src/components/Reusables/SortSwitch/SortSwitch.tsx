import { SortByEnum } from '../../../types-queries/helpers';
import './SortSwitch.css';

type SortSwitchProps = {
  titleFor: string
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  sortBy: SortByEnum | null
};

const SortSwitch = ({
  titleFor,
  onClick,
  sortBy,
}: SortSwitchProps) => {
  return (
    <button
      title={`Sort by ${titleFor}, ${sortBy === 'ASC'
        ? 'descending'
        : 'ascending'
      }`}
      className={`
        sort-switch__wrapper
      `}
      onClick={onClick}
    >
      <div  className="sort-switch__arrow-wrapper">
        <div
          className={`
            sort-switch__asc
            ${sortBy === 'ASC'
              ? 'sort-switch__asc --active'
              : ''
            }
          `}
        />
        <div
          className={`
            sort-switch__desc
            ${sortBy === 'DESC'
              ? 'sort-switch__desc --active'
              : ''
            }
          `}
        />
      </div>
    </button>
  )
}

export default SortSwitch;