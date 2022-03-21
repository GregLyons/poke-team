import { useEffect, useMemo, useRef, useState } from "react";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import './Popup.css';


type PopupProps = {
  trigger: JSX.Element
  content: JSX.Element
  orientation: 'top' | 'bottom' | 'left' | 'right'
  nudge?: 'top' | 'bottom' | 'left' | 'right'

  onClose?: () => void
  forceClose?: boolean
};

const Popup = ({
  trigger,
  content,
  orientation,
  nudge,

  onClose,
  forceClose,
}: PopupProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);

  const [triggerDim, setTriggerDim] = useState<{ width: number, height: number, } | undefined>();
  const [contentDim, setContentDim] = useState<{ width: number, height: number, } | undefined>();
  const windowSize = useWindowSize();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  const handleClickOutside = () => {
    // Only want onClose() to activate for currently active Popups.
    if (isActive && onClose) onClose();
    return setIsActive(false);
  }
  useOnClickOutside(contentRef, handleClickOutside);

  // When forceClose is set to 'true' by some other component, close the pop-up window
  useEffect(() => {
    if (forceClose && isActive) setIsActive(false);
  }, [forceClose, isActive, setIsActive]);

  useEffect(() => {
    if (triggerRef.current) setTriggerDim({
      width: triggerRef.current.offsetWidth,
      height: triggerRef.current.offsetHeight,
    });
    if (contentRef.current) setContentDim({
      width: contentRef.current.offsetWidth,
      height: contentRef.current.offsetHeight,
    });
  }, [windowSize, isActive, contentRef, triggerRef, content, trigger, ]);

  const positioning: React.CSSProperties = useMemo(() => {
    if (!triggerDim) return {};

    let top: number | string = '';
    let bottom: number | string = '';
    let left: number | string = '';
    let right: number | string = '';

    const padding = '0.5rem';

    switch(orientation) {
      case 'top':
        bottom = `calc(${triggerDim.height}px + ${padding})`
        if (contentDim) {
          left = `calc(${-contentDim.width / 2 + triggerDim.width / 2}px + ${padding})`;
        }
        break;

      case 'bottom':
        top = `calc(${triggerDim.height}px + ${padding})`
        if (contentDim) {
          left = `calc(${-contentDim.width / 2 + triggerDim.width / 2}px + ${padding})`;
        }
        break;

      case 'left':
        if (contentDim) {
          top = `calc(-${contentDim.height / 2 - triggerDim.height / 2}px)`;
        }
        right = `calc(${triggerDim.width}px + ${padding})`;
        break;

      case 'right':
        if (contentDim) {
          top = `calc(-${contentDim.height / 2 - triggerDim.height / 2}px)`;
        }
        left = `calc(${triggerDim.width}px + ${padding})`;
        break;
    }

    switch(nudge) {
      case 'top':
        top = '';
        bottom = 0;
        break;

      case 'bottom':
        top = 0;
        bottom = '';
        break;

      case 'left':
        left = '';
        right = 0;
        break;

      case 'right':
        left = 0;
        right = '';
        break;
    }

    return {
      top,
      bottom,
      left,
      right,
    };
  }, [orientation, nudge, triggerDim, contentDim, content, trigger, ]);

  return (
    <div
      className="popup-wrapper"
      style={triggerDim && {
        ...triggerDim,
      }}
    >
      <button
        className={`
          popup-trigger
          ${isActive
            ? `--active`
            : ''
          }
        `}
        ref={triggerRef}
        onClick={onClick}
      >
        {trigger}
      </button>
      {isActive && <div
        ref={contentRef}
        className={`
          popup-content
          ${isActive
            ? `--active`
            : ''
          }
        `}
        style={{
          ...positioning,
          width: 'fit-content',
        }}
      >
        {/* div giving padding between border of Popup and the inside content */}
          <div
            className={`
              popup-padder
              ${isActive
                ? `--active`
                : ''
              }
            `}
          >
            {content}
          </div>
      </div>}
    </div>
  );
};

export default Popup;