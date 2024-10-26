import React, { createContext, useState } from 'react'

export const ProjectDataContext = createContext();

export default function ProjectDatasContext({ children }) {
    const [projectsData, setProjectsData] = useState([]);
    return (
        <ProjectDataContext.Provider value={{ projectsData, setProjectsData }}>
            {children}
        </ProjectDataContext.Provider>
    )
}

