import { useEffect, useRef, useState } from "react";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";

import './Popup.css';

type PopupProps = {
  trigger: JSX.Element
  content: JSX.Element
  orientation: 'right' | 'bottom'
  onClose?: () => void
};

const Popup = ({
  trigger,
  content,
  orientation,
  onClose,
}: PopupProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  // Height or width of trigger, depending on orientation ('bottom' or 'right', respectively)
  const [triggerMainDisplacement, setTriggerMainDisplacement] = useState<null|number>(null);
  // Height or width of trigger, depending on orientation ('right' or 'bottom', respectively)
  const [triggerAuxDisplacement, setTriggerAuxDisplacement] = useState<null|number>(null);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActive(!isActive);
  }

  const handleClickOutside = () => {
    // Only want onClose() to activate for currently active Popups.
    if (onClose && isActive) onClose();
    return setIsActive(false);
  }
  useOnClickOutside(contentRef, handleClickOutside);

  // Reset displacement on window resize
  useEffect(() => {
    setTimeout(() => {
      // Displace popup to right or bottom of trigger, respectively
      triggerRef.current && setTriggerMainDisplacement(orientation === 'right'
        ? triggerRef.current.offsetWidth + 16
        : triggerRef.current.offsetHeight
      );

      // Displace popup so that it's as centered as possible, while respecting window boundary
      // Need windowWidth and windowHeight to be nonzero; on first render they are zero, so skip that render. Then, they will be updated to the actual values, which will trigger this effect again
      if (triggerRef.current && contentRef.current && windowWidth && windowHeight) {
        // Initial auxDisplacement, centering
        let auxDisplacement = orientation === 'right'
          ? (-contentRef.current.offsetHeight + triggerRef.current.offsetHeight) / 2
          : (-contentRef.current.offsetWidth + triggerRef.current.offsetWidth) / 2;

          
        // Additional displacement so that box doesn't go off screen
        const contentRect = contentRef.current.getBoundingClientRect();
        const displacementMagnitude = Math.abs(auxDisplacement);

        // Content will be displaced upwards
        if (orientation === 'right') {
          // Keep top from going off top of screen
          if (contentRect.top - displacementMagnitude < 0) {
            auxDisplacement += contentRect.top - displacementMagnitude + 16;
          }
          // Keep bottom from going off bottom of screen
          else if (contentRect.bottom - displacementMagnitude > windowHeight) {
            auxDisplacement -= contentRect.bottom - displacementMagnitude + 16;
          }
        }
        // Content will be displaced leftwards
        else {
          // Keep left from going off left of screen
          if (contentRect.left - displacementMagnitude < 0) {
            auxDisplacement += contentRect.left - displacementMagnitude + 16;
          }
          // Keep right from going off right of screen
          else if (contentRect.right - displacementMagnitude > windowWidth) {
            auxDisplacement -= contentRect.right - displacementMagnitude + 16;
          }
        }

        triggerRef.current && contentRef.current && setTriggerAuxDisplacement(auxDisplacement);
      }
    });
  }, [windowWidth, windowHeight, triggerRef, contentRef, setTriggerMainDisplacement, setTriggerAuxDisplacement]);

  return (
    <div className="popup-wrapper">
      <div
        className={`
          popup-trigger
          popup-trigger--${orientation}
          ${isActive
            ? `popup-trigger--active`
            : ''
          }
        `}
        ref={triggerRef}
        onClick={onClick}
      >
        {trigger}
      </div>
      <div
        className={`
          popup-content
          popup-content--${orientation}
          ${isActive
            ? `popup-content--active`
            : ''
          }
        `}
        ref={contentRef}
        style={{
          minWidth: `min-content`,
          top: triggerMainDisplacement && triggerAuxDisplacement
            ? orientation === 'right'
              // If horizontally oriented, no top-displacement
              ? triggerAuxDisplacement
              // If vertically oriented, use triggerDisplacement
              : triggerMainDisplacement
            : '',
          left: triggerMainDisplacement && triggerAuxDisplacement
            ? orientation === 'right'
              // If horizontally oriented, use triggerDisplacement
              ? triggerMainDisplacement
              // If vertically oriented, no left-displacement
              : triggerAuxDisplacement
            : '',
        }}
      >
        {/* Elements to give border along side that meets with the trigger, with gap for the trigger itself */}
        {orientation === 'right'
          ? (<>
              {/* Below trigger */}
              {/* <div
                className={`
                  popup-content__before
                  popup-content__before--right
                  ${isActive
                    ? `popup-content__before--active`
                    : ''
                  }
                `}
                style={{
                  content: '',
                  position: 'absolute',
                  width: '1px',
                  backgroundColor: 'var(--light3)',
                  bottom: 0,
                  height: triggerAuxDisplacement
                    ? Math.abs(triggerAuxDisplacement)
                    : '',
                }}
              /> */}
              {/* Above trigger */}
              {/* <div
                className={`
                  popup-content__after
                  popup-content__after--right
                  ${isActive
                    ? `popup-content__after--active`
                    : ''
                  }
                `}
                style={{
                  content: '',
                  position: 'absolute',
                  width: '1px',
                  backgroundColor: 'var(--light3)',
                  top: 0,
                  height: triggerAuxDisplacement
                    ? Math.abs(triggerAuxDisplacement)
                    : '',
                }}
              /> */}
            </>)
          : (<>
            {/* Left of trigger */}
            <div
              className={`
                popup-content__before
                popup-content__before--bottom
                ${isActive
                  ? `popup-content__before--active`
                  : ''
                }
              `}
              style={{
                content: '',
                position: 'absolute',
                height: '1px',
                backgroundColor: 'var(--light3)',
                left: 0,
                width: triggerAuxDisplacement
                  ? Math.abs(triggerAuxDisplacement)
                  : '',
              }}
            />
            {/* Right of trigger */}
            <div
              className={`
                popup-content__before
                popup-content__before--bottom
                ${isActive
                  ? `popup-content__before--active`
                  : ''
                }
              `}
              style={{
                content: '',
                position: 'absolute',
                height: '1px',
                backgroundColor: 'var(--light3)',
                right: 0,
                width: triggerAuxDisplacement
                  ? Math.abs(triggerAuxDisplacement) + 1
                  : '',
              }}
            />
          </>)
        }
        {/* div giving padding between border of Popup and the inside content */}
        <div
          className={`
            popup-padder
            popup-padder--${orientation}
            ${isActive
              ? `popup-padder--active`
              : ''
            }
          `}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Popup;