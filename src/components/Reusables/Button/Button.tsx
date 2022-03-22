import { useState } from "react";
import { useIsMounted } from "usehooks-ts";
import './Button.css';

type ButtonProps = {
  title: string
  label: string
  id?: string

  active: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled: boolean
  immediate: boolean
}

const Button = ({
  title,
  label,
  id,

  onClick,
  active,
  disabled,
  immediate,
}: ButtonProps) => {
  const [justClicked, setJustClicked] = useState(false);
  const isMounted = useIsMounted();

  return (
    <button
      title={title}
      id={id}
      className={`
        button
        ${(!immediate && active) || justClicked
          ? 'button --active'
          : ''
        }
      `}
      style={{
        boxShadow: justClicked ? 'none' : '',
      }}
      onClick={e => {
        setJustClicked(true);
        // justClicked is set to false after 250ms, but the component might unmount in that time. In that case, we don't perform the state update
        setTimeout(() => isMounted() && setJustClicked(false), 250);
        onClick(e);
      }}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {!disabled && label}
    </button>
  );
}



export default Button;