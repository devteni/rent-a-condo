import React from 'react'
import './button.css'

type Props = {
    children: JSX.Element | string,
    className?: string,
    style?: object,
    onClick?: () => void,
}

const Button: React.FC<Props> = ({ children, className, style, onClick}) => {
  return (
    <button className={`button ${className ?? ''}`} style={{...style}} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button;