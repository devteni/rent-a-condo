import React from 'react';
import './form-input.css'

type Props = {
    type?: string,
    name?: string,
    id?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    disabled?: boolean,
    value?: string | number,
    min?: string | number,
    max?: string | number,
    maxLength?: number,
    minLength?: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: () => void,
    noDefaultClasses?: boolean,
    required?: boolean,
    multiple?: boolean,
    accept?: string
};

const FormInput: React.FC<Props> = ({
    type,
    placeholder,
    name,
    label,
    className,
    disabled,
    value,
    onChange,
    onBlur,
    ...props
}) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">{label}</label>
      <input
          id={props.id}
          type={type ?? "text"}
          name={name}
          placeholder={placeholder}
          value={value}
          min={props.min}
          max={props.max}
          maxLength={props.maxLength}
          minLength={props.minLength}
          accept={props.accept}
          className={!props.noDefaultClasses ? `${className ?? ''}` : `${className}`} 
          disabled={disabled}
          onChange={onChange}
          multiple={props.multiple}
          required={props.required}
      />
    </div>
    
  )
}

export default FormInput;