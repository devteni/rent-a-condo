import React from 'react'
import './card.css';

type Props = {
    children: JSX.Element,
    className?: string,
    style?: object,
}

const Card : React.FC<Props> = ({ children, className, style }) => {
  return (
    <div className={`card ${className ?? ''}`} style={{...style}}>
        {children}
    </div>
  )
}

export default Card;