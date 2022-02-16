import { useRef } from 'react';
import { SortByEnum } from '../../../types-queries/helpers';
import './SortSwitch.css';

type SortSwitchProps = {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  sortBy: SortByEnum | null
};

const SortSwitch = ({
  onClick,
  sortBy,
}: SortSwitchProps) => {
  return (
    <div
      className={`
        sort-switch__wrapper
      `}
      onClick={onClick}
    >
      <div className="sort-switch__arrow-wrapper">
        <div 
          className={`
            sort-switch__asc
            ${sortBy === 'ASC'
              ? 'sort-switch__asc--active'
              : ''
            }
          `}
        />
        <div 
          className={`
            sort-switch__desc
            ${sortBy === 'DESC'
              ? 'sort-switch__desc--active'
              : ''
            }
          `}
        />
      </div>
    </div>
  )
}

export default SortSwitch;