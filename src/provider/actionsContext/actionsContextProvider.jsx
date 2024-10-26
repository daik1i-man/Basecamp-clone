import React from 'react'
import CreateProjectModalContextComponent from './createProjectModalContext/createProjectModalContext'
import DeleteProjectModalContextComponent from './deleteProjectModalContext/deleteProjectModalContext'
import UpdateProjectModalContextComponent from './updatePojectModalContext/updateProjectModalContext'
import DefaultModalContext from './modalContext/modalContext'
import RegisterStateModalContextComponent from './registerStateModalContext/registerStateModalContext'

export default function ActionsContextProvider({ children }) {
    return (
        <CreateProjectModalContextComponent>
            <DeleteProjectModalContextComponent>
                <UpdateProjectModalContextComponent>
                    <RegisterStateModalContextComponent>
                        <DefaultModalContext>
                            {children}
                        </DefaultModalContext>
                    </RegisterStateModalContextComponent>
                </UpdateProjectModalContextComponent>
            </DeleteProjectModalContextComponent>
        </CreateProjectModalContextComponent>
    )
}

