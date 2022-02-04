import { useState } from "react";

import './Button.css';

type ButtonProps = {
  title: string
  label: string

  active: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled: boolean
  immediate: boolean
}

const Button = ({
  label,
  title,

  onClick,
  active,
  disabled,
  immediate,
}: ButtonProps) => {
  const [justClicked, setJustClicked] = useState(false);

  return (
    <button
      title={title}
      className={`
        button
        ${(!immediate && active) || justClicked
          ? 'button--active'
          : ''
        }
      `}
      style={{
        boxShadow: justClicked ? 'none' : '',
      }}
      onClick={e => {
        setJustClicked(true);
        setTimeout(() => setJustClicked(false), 250);
        onClick(e);
      }}
      disabled={disabled}
    >
      {label}
    </button>
  );
}



export default Button;