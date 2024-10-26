import React, { createContext, useState } from 'react'

export const RegisterStateModalContext = createContext();

export default function RegisterStateModalContextComponent({ children }) {
    const [openRegisterStateModal, setOpenRegisterStateModal] = useState(false);
    return (
        <RegisterStateModalContext.Provider value={{ openRegisterStateModal, setOpenRegisterStateModal }}>
            {children}
        </RegisterStateModalContext.Provider>
    )
}

