import React, { createContext, useState } from 'react'

export const UpdateProjectModalContext = createContext();

export default function UpdateProjectModalContextComponent({ children }) {
    const [openUpdatProjectModal, setOpenUpdateProjectModal] = useState(false);
    return (
        <UpdateProjectModalContext.Provider value={{ openUpdatProjectModal, setOpenUpdateProjectModal }}>
            {children}
        </UpdateProjectModalContext.Provider>
    )
}


