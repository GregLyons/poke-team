import { useEffect, useRef, useState } from "react";
import FontAwesome from "react-fontawesome";
import { useEventListener, useOnClickOutside, useWindowSize } from "usehooks-ts";
import { classWithBGControl } from "../../../hooks/App/BGManager";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import './DropdownMenu.css';


type DropdownMenuProps = {
  label: string
  content: JSX.Element
  triggerID: string

  dropLeft?: boolean

  dropdownWidth: number | string
  backgroundLight: 'red' | 'green' | 'blue'
}

function DropdownMenu({
  label,
  content,
  triggerID,

  dropLeft,

  dropdownWidth,
  backgroundLight,
}: DropdownMenuProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const [triggerWidth, setTriggerWidth] = useState<null|number>(null);
  const [triggerHeight, setTriggerHeight] = useState<null|number>(null);
  const [contentWidth, setContentWidth] = useState<null|number>(null);
  const [contentHeight, setContentHeight] = useState<null|number>(null);

  const [isActive, setIsActive] = useState(false);
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  // Close dropdown when open and user clicks off dropdown
  const handleClickOutside = () => {
    setIsActive(false);
  }
  useOnClickOutside(contentRef, handleClickOutside);

  // Reset heights on window resize and when content is rendered (isActive changes)
  useEffect(() => {
    setTimeout(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.scrollWidth);
        setTriggerHeight(triggerRef.current.scrollHeight);
      }
      if (isActive && contentRef.current) {
        setContentWidth(contentRef.current.scrollWidth);
        setContentHeight(contentRef.current.scrollHeight);
      }
    });
  }, [windowWidth, windowHeight,
    triggerRef, contentRef, isActive,
    setTriggerHeight, setTriggerWidth,
    setContentHeight, setContentWidth,
  ]);

  // Closes window when focus leaves the content
  useEventListener('focusin', e => {
    const el = contentRef?.current;

    if (!el || el.contains(e.target as Node)) {
      return;
    }

    setIsActive(false);
  });

  return (
    <div className="dropdown__wrapper"
      style={{
        position: 'relative',
        width: dropdownWidth,
      }}
    >
      <button
        ref={triggerRef}
        title={`${isActive ? 'Close' : 'Open'} ${label} dropdown.`}
        className={classWithBGControl("dropdown__trigger", backgroundLight)}
        id={triggerID}

        style={{
          width: dropdownWidth,
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
        
        onClick={onClick}
      >
        <span className="dropdown__title">{label}</span>
        {isActive
          ? <FontAwesome name="angle-up"/>
          : <FontAwesome name="angle-down"/>}
      </button>
      {isActive && <div
        className="dropdown__content-wrapper"
        ref={contentRef}
        style={{
          width: `max(${dropdownWidth}, min-content)`,
          height: 'auto',
          top: triggerHeight !== null
            ? triggerHeight
            : '',
          left: triggerWidth !== null && contentWidth !== null && dropLeft
            ? -contentWidth + triggerWidth
            : '',
          boxShadow: `
            5px 5px 2px 2px rgba(0, 0, 0, 0.8),
            ${backgroundLight === 'blue'
              ? 'var(--bg-control-blue)'
              : backgroundLight === 'green'
                ? 'var(--bg-control-green)'
                : 'var(--bg-control-red)'
            }
          `,
        }}
      >
        <div
          className="dropdown__content-padder"
        >
          <ErrorBoundary orientation="bottom" nudge={dropLeft ? "left" : undefined}>
            {content}
          </ErrorBoundary>
        </div>
      </div>}
    </div>
  );
}

export default DropdownMenu;