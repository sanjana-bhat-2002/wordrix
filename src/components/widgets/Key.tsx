import React, { ReactNode } from 'react'

interface KeyProps {
    children: ReactNode
    flexGrow?: boolean
    onClick: () => void
    color?: string
}

const Key = ({ children, flexGrow, onClick, color='bg-gray-700' }: KeyProps) => {
    let flexgrow = flexGrow ? 'flex-grow' : '';
    
    return (
        <button 
            onClick={onClick} 
            className={`m-1 w-8 h-12 ${color} rounded-lg flex ${flexgrow} justify-center items-center`}
        >
            {children}
        </button>
    )
}

export default Key
