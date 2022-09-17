import React from 'react';
import './form-input.css'

type Props = {
    type?: string,
    name?: string,
    placeholder?: string,
    className?: string,
    disabled?: boolean,
    value: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: () => void 
};

const FormInput: React.FC<Props> = ({
    type,
    placeholder,
    name,
    className,
    disabled,
    value,
    onChange,
    onBlur,
}) => {
  return (
    <input
        type={type ?? "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        className={`form-input ${className ?? ''}`} 
        disabled={disabled}
        onChange={onChange}
    />
  )
}

export default FormInput;