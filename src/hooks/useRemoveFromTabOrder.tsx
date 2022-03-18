import { useEffect } from "react";

export const useRemoveFromTabOrder = (ref: React.RefObject<Element>)=> {
  useEffect(() => {
    if (!ref.current) return;

    const interactiveElements = Array.from(
      ref.current.querySelectorAll(
        'a:not([tabindex="0"]), button:not([tabindex="0"])'
      )
    );

    interactiveElements.forEach(el => el.setAttribute("tabindex", "-1"));
  }, [ref.current]);
};