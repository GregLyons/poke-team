import { useEffect, useRef, useState } from "react";
import FontAwesome from "react-fontawesome";
import './Forms.css';

type Item<F> = {
  id: F
  label: JSX.Element
  selected: boolean
}

type DropdownMenuProps<E extends Item<F>, F> = {
  title: string
  items: E[]
  toggleSelect: (id: F) => void
}

function DropdownMenu<E extends Item<F>, F>({
  title,
  items,
  toggleSelect,
}: DropdownMenuProps<E, F>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  // Close dropdown when open and user clicks off dropdown
  useEffect(() => {
    const pageClickEvent: { (e: MouseEvent): void } = (e: MouseEvent) => {
      e.preventDefault();
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target as Node)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent)
    }

    return () => {
      window.removeEventListener('click', pageClickEvent)
    }
  }, [isActive]);

  return (
    <div className="dropdown__wrapper">
      <button
        onClick={onClick}
        className="dropdown__trigger"
      >
        <span className="dropdown__title">{title}</span>
        {isActive
          ? <FontAwesome name="angle-up"/>
          : <FontAwesome name="angle-down"/>}
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown dropdown--${isActive ? 'active' : 'inactive'}`}
      >
        <ul className={`dropdown__options`}>
          {items.map(item => {
            return (
              <li
                className="dropdown__option"
                key={`${title}_${item.id}`}
                style={{
                  backgroundColor: item.selected ? 'lightblue' : '',
                }}
              >
                <span
                  className="dropdown__button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSelect(item.id)
                  }}
                >
                  {item.label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;