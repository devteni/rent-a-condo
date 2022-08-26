import React from 'react'
import './button.css'

type Props = {
    children: JSX.Element | string,
    className?: string,
    style?: object,
}

const Button: React.FC<Props> = ({ children, className, style}) => {
  return (
    <button className={`button ${className ?? ''}`} style={{...style}}>
        {children}
    </button>
  )
}

export default Button;