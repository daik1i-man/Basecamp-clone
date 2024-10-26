import React from 'react'
import ActionsContextProvider from './actionsContext/actionsContextProvider'
import DatasContextProvider from './datasContext/datasContextProvider'

export default function ContextsProvider({ children }) {
    return (
        <ActionsContextProvider>
            <DatasContextProvider>
                {children}
            </DatasContextProvider>
        </ActionsContextProvider>
    )
}

