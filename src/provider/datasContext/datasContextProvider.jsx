import React from 'react'
import ProjectDatasContext from './projectDatasContext/projectDatasContext'
import GetProjectDatasContextComponent from './projectGetDatasContext/projectGetDatasContext'
import MessageDatasContextComponent from './messageDatasContext/messageDatasContextComponent'

export default function DatasContextProvider({ children }) {
    return (
        <ProjectDatasContext>
            <GetProjectDatasContextComponent>
                <MessageDatasContextComponent>
                    {children}
                </MessageDatasContextComponent>
            </GetProjectDatasContextComponent>
        </ProjectDatasContext>
    )
}


