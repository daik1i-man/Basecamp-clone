import React, { createContext, useState } from 'react'

export const ModalContext = createContext();

export default function DefaultModalContext({ children }) {
    const [open, setOpen] = useState(false);
    return (
        <ModalContext.Provider value={{ open, setOpen }}>
            {children}
        </ModalContext.Provider>)
}

