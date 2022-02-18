import './TextInput.css';

type TextInputProps = {
  title: string
  
  value: string
  placeholder: string

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  width?: number
};

const TextInput = ({
  title,
  value,
  onChange,
  placeholder,
  width,
}: TextInputProps) => {
  return (
    <div className="text-input__wrapper">
      <input
        title={title}
        type="text"
        className="text-input"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          width: `${width}ch`,
        }}
      />
    </div>
  )
};

export default TextInput;