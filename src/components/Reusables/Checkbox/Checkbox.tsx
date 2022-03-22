import './Checkbox.css';

type CheckboxProps = {
  id: string
  label: string
  title: string

  // Name attribute is optional; when the label is of a type (e.g. TypeName, SinglesTier), then we'll use a curried function for onChange instead
  name?: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const Checkbox = ({
  id,
  label,
  title,

  name,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className="checkbox__wrapper" title={title}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name ? name : ''}
        
        id={id}
        className="checkbox__input"
      />
      <label
        htmlFor={id}
        className="checkbox__label"
      >
        {label}
      </label>
    </div>
  )
};

export default Checkbox;