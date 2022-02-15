import { useEffect, useRef, useState } from "react";
import FontAwesome from "react-fontawesome";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import './DropdownMenu.css';

type Item<F> = {
  id: F
  label: JSX.Element
  selected: boolean
}

type DropdownMenuProps<E extends Item<F>, F> = {
  title: string
  items: E[]
  toggleSelect?: (id: F) => void

  dropdownWidth: number | string
  itemWidth: number | string
  dropLeft?: boolean
}

function DropdownMenu<E extends Item<F>, F>({
  title,
  items,
  toggleSelect,

  dropdownWidth,
  itemWidth,
  dropLeft = false,
}: DropdownMenuProps<E, F>) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const [triggerHeight, setTriggerHeight] = useState<null|number>(null);

  const [isActive, setIsActive] = useState(false);
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  // Close dropdown when open and user clicks off dropdown
  const handleClickOutside = () => {
    setIsActive(false);
  }
  useOnClickOutside(dropdownRef, handleClickOutside);


  // Reset heights on window resize
  useEffect(() => {
    setTimeout(() => {
      triggerRef.current && setTriggerHeight(triggerRef.current.scrollHeight);
    });
  }, [windowWidth, windowHeight, triggerRef, setTriggerHeight]);

  return (
    <div className="dropdown__wrapper"
      style={{
        position: 'relative',
        width: dropdownWidth,
      }}
    >
      <button
        ref={triggerRef}
        onClick={onClick}
        className="dropdown__trigger"
        style={{
          width: 'inherit',
          color: isActive 
            ? 'var(--blue1)' 
            : 'var(--light1)',
          boxShadow: isActive
            ? 'inset 3px 3px 2px 0 rgba(var(--green-bg-components), 0.5)'
            : 'var(--control-shadow)',
          borderRadius: isActive 
            ? 0
            : '',
          transition: 'border-radius 0.2s ease',
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
          width: dropdownWidth,
          minWidth: `min-content`,
          height: isActive
            ? 'auto'
            : 0,
          top: triggerHeight 
            ? triggerHeight
            : '',
          left: dropdownRef.current && triggerRef.current
            ? -dropdownRef.current.scrollWidth + triggerRef.current.scrollWidth
            : '',
          boxShadow: isActive
            ? `5px 15px 2px 2px rgba(0, 0, 0, 0.8),
              inset 3px 3px 4px 0 rgba(var(--green-bg-components), 0.5)`
            : '',
        }}
      >
        <ul 
          className="dropdown__options"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${itemWidth}, 1fr))`,
          }}
        >
          {items.map(item => {
            return (
              <li
                className="dropdown__option"
                key={`dropdown_${title}_${item.id}`}
              >
                {/* Match clicking range to content */}
                <span
                  onClick={e => {
                    e.preventDefault();
                    toggleSelect && toggleSelect(item.id);
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