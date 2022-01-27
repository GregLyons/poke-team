import { useState } from "react";
import FontAwesome from 'react-fontawesome';

type DropdownProps<E> = {
  title: string
  items: E[]
  toggleItem: (item: E) => void,
}

function Dropdown<E extends {id: string, title: string, selected: boolean}>({
  title,
  items,
  toggleItem,
}: DropdownProps<E>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <div className="dd-wrapper">
      <button
        type="button"
        className="dd-header"
        onClick={toggleOpen}
      >
        <div className="dd-title">{title}</div>
        {isOpen 
          ? <FontAwesome name="angle-up" size="2x" />
          : <FontAwesome name="angle-down" size="2x" />}
      </button>
      {isOpen && (
        <div
          role="list"
          className="dd-list"
        >
          {items.map((item) => (
            <button
              type="button"
              className="dd-list-item"
              key={item.id}
              onClick={() => toggleItem(item)}
            >
              {item.title}
              {' '}
              {item.selected && <FontAwesome name="check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;