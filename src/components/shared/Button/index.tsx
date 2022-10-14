import React, { ButtonHTMLAttributes } from 'react'
import './button.css'

type Props = {
    children: JSX.Element | string,
    id?: string,
    type?: "button" | "submit" | "reset" | undefined,
    name?: string,
    className?: string,
    value?: string | number | readonly string[] | undefined,
    style?: object,
    onClick?: (e?: any) => void,
}

const Button: React.FC<Props> = ({ 
    children, 
    className, 
    value,
    name,
    style, 
    onClick,
    ...props
  }) => {
  return (
    <button 
      id={props.id} 
      type={props.type}
      name={name} 
      value={value} 
      className={`button ${className ?? ''}`} 
      style={{...style}} 
      onClick={onClick}
      >
        {children}
    </button>
  )
}

export default Button;