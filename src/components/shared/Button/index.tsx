import React from 'react'
import './button.css'

type Props = {
    children: JSX.Element | string,
    className?: string,
    style?: object,
}

const Button: React.FC<Props> = ({ children, className, style}) => {
  return (
    <div className={`button ${className ?? ''}`} style={{...style}}>
        {children}
    </div>
  )
}

export default Button;