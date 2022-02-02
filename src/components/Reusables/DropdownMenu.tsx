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
  columnWidth: number | string
}

function DropdownMenu<E extends Item<F>, F>({
  title,
  items,
  toggleSelect,
  columnWidth,
}: DropdownMenuProps<E, F>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
  console.log(isActive && dropdownRef.current);
  return (
    <div className="dropdown__wrapper"
      style={{
        position: 'relative',
        width: '200px',
      }}
    >
      <button
        ref={triggerRef}
        onClick={onClick}
        className="dropdown__trigger"
        style={{
          width: 'inherit',
        }}
      >
        <span className="dropdown__title">{title}</span>
        {isActive
          ? <FontAwesome name="angle-up"/>
          : <FontAwesome name="angle-down"/>}
      </button>
      <div
        className="dropdown__content-wrapper"
        ref={dropdownRef}
        style={{
          height: isActive && dropdownRef.current ? dropdownRef.current.scrollHeight : 0,
          top: triggerRef.current ? triggerRef.current.scrollHeight + 'px' : '',
          transition: !isActive ? '' : '0.5s ease',
        }}
      >
        <ul 
          className="dropdown__options"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${columnWidth}, 1fr))`,
          }}
        >
          {items.map(item => {
            return (
              <li
                className="dropdown__option"
                key={`${title}_${item.id}`}
                onClick={e => {
                  e.preventDefault();
                  toggleSelect(item.id);
                }}
              >
                {item.label}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;