import { useEffect, useRef, useState } from "react";
import FontAwesome from "react-fontawesome";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { classWithBGControl } from "../../../hooks/App/BGManager";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import './DropdownMenu.css';


type DropdownMenuProps = {
  label: string
  content: JSX.Element

  dropLeft?: boolean

  dropdownWidth: number | string
  backgroundLight: 'red' | 'green' | 'blue'
}

function DropdownMenu({
  label,
  content,

  dropLeft,

  dropdownWidth,
  backgroundLight,
}: DropdownMenuProps) {
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
        className={classWithBGControl("dropdown__trigger", backgroundLight)}
        style={{
          color: isActive 
            ? 'var(--blue1)' 
            : 'var(--light1)',
          boxShadow: isActive
            ? ''
            : 'var(--control-shadow)',
          borderRadius: isActive 
            ? 0
            : '',
        }}
      >
        <span className="dropdown__title">{label}</span>
        {isActive
          ? <FontAwesome name="angle-up"/>
          : <FontAwesome name="angle-down"/>}
      </button>
      {isActive && <div
        className={classWithBGControl("dropdown__content-wrapper", backgroundLight)}
        ref={dropdownRef}
        style={{
          width: dropdownWidth,
          minWidth: `min-content`,
          height: 'auto',
          top: triggerHeight 
            ? triggerHeight
            : '',
          right: dropLeft
            ? 0
            : '',
          boxShadow: `
            5px 5px 2px 2px rgba(0, 0, 0, 0.8),
            ${backgroundLight === 'blue'
              ? 'var(--bg-control-blue)'
              : backgroundLight === 'green'
                ? 'var(--bg-control-green)'
                : 'var(--bg-control-red)'
            }
          `
        }}
      >
        <ErrorBoundary>
          {content}
        </ErrorBoundary>
      </div>}
    </div>
  );
}

export default DropdownMenu;