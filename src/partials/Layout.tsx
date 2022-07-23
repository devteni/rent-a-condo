import React from 'react'

type Props = {
    children: JSX.Element
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='page-container'>
        {children}
    </div>
  )
}

export default Layout;