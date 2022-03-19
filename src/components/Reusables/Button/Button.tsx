import { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => { setIsMounted(false) }
  }, [setIsMounted]);

  return (
    <button
      title={title}
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
        setTimeout(() => isMounted && setJustClicked(false), 250);
        onClick(e);
      }}
      disabled={disabled}
    >
      {!disabled && label}
    </button>
  );
}



export default Button;