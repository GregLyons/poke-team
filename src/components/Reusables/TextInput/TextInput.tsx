import { useEffect, useRef } from 'react';
import './TextInput.css';

type TextInputProps = {
  id: string
  title: string
  inputType: 'text' | 'search'
  
  value: string
  placeholder: string

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

  width?: number

  autoFocus?: boolean
  setFocusedOnInput?: React.Dispatch<React.SetStateAction<boolean>>
};

const TextInput = ({
  id,
  title,
  inputType,
  
  value,
  onChange,
  placeholder,
  width,
  autoFocus = true,
  setFocusedOnInput,
}: TextInputProps) => {
  const focusRef = useRef<HTMLInputElement>(null);

  // On first render, if 'autoFocus', focus on text input
  useEffect(() => {
    if (autoFocus && focusRef.current) focusRef.current.focus();
  }, [autoFocus, focusRef]);

  return (
    <div className="text-input__wrapper">
      <input
        ref={focusRef}
        title={title}
        type={inputType}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          maxWidth: `${width}ch`,
        }}
        onFocus={() => setFocusedOnInput && setFocusedOnInput(true)}
        onBlur={() => setFocusedOnInput && setFocusedOnInput(false)}

        id={id}
        className="text-input"
      />
    </div>
  )
};

export default TextInput;