import React from 'react'

type Props = {
    children: JSX.Element | React.ReactElement | null,
    className?: string
}
const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`page-container ${className ?? ''}`}>
        {children}
    </div>
  )
}

export default Container;