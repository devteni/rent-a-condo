import React from 'react';
import './form-input.css'

type Props = {
    id?: string,
    type?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    disabled?: boolean,
    value: string | number,
    min?: string | number,
    max?: string | number,
    maxLength?: number,
    minLength?: number,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onBlur?: () => void,
    noDefaultClasses?: boolean
};

const TextArea: React.FC<Props> = ({
    type,
    placeholder,
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
      <label htmlFor={'text-area'} className="form-label">{label}</label>
      <textarea
        id={props.id}
        placeholder={placeholder}
        value={value}
        maxLength={props.maxLength}
        minLength={props.minLength}
        className={!props.noDefaultClasses ? `form-input ${className ?? ''}` : `${className}`} 
        disabled={disabled}
        onChange={onChange}
      />
    </div>
    
  )
}

export default TextArea;