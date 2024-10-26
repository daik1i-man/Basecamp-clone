import React, { createContext, useState } from 'react'

export const DeleteProjectModalContext = createContext();

export default function DeleteProjectModalContextComponent({ children }) {
    const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false);
    return (
        <DeleteProjectModalContext.Provider value={{ openDeleteProjectModal, setOpenDeleteProjectModal }}>
            {children}
        </DeleteProjectModalContext.Provider>
    )
}

