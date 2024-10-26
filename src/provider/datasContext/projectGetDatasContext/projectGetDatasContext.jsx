import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const GetProjectDatasContext = createContext();

export default function GetProjectDatasContextComponent({ children }) {
    const [projectData, setProjectData] = useState({});
    return (
        <GetProjectDatasContext.Provider value={{ projectData, setProjectData }}>
            {children}
        </GetProjectDatasContext.Provider>
    )
}

