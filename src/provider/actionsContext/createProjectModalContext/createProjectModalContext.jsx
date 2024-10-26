import React, { createContext, useState } from 'react'

export const CreateProjectModalContext = createContext();

export default function CreateProjectModalContextComponent({ children }) {
    const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);
    return (
        <CreateProjectModalContext.Provider value={{ openCreateProjectModal, setOpenCreateProjectModal }}>
            {children}
        </CreateProjectModalContext.Provider>
    )
}

