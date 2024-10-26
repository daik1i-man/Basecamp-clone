import React, { useState, useEffect, useContext } from 'react'
import Header from '../../components/header/header';
import ModalComponent from '../../components/modalComponent/modalComponent';
import CreateProjectModal from '../../components/createProjectModal/createProjectModal';
import ProjectCard from '../../components/projectCard/projectCard';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { store, auth } from '../../database/firebase';
import SkeletonComponent from '../../components/skeletonComponent/skeletonComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { CreateProjectModalContext } from '../../provider/actionsContext/createProjectModalContext/createProjectModalContext';
import { ProjectDataContext } from '../../provider/datasContext/projectDatasContext/projectDatasContext';
import { Button } from '@material-tailwind/react';
import { Plus } from 'lucide-react';

function UserProfilePage() {
    const { projectsData, setProjectsData } = useContext(ProjectDataContext);
    const { setOpenCreateProjectModal } = useContext(CreateProjectModalContext);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoading(true);
                const queryPojects = query(collection(store, "projects"), where("userId", "==", user.uid));
                const uncrible = onSnapshot(queryPojects, (querySnap) => {
                    const tempdatas = [];
                    querySnap.forEach((doc) => {
                        const data = doc.data();
                        data.id = doc.id;
                        tempdatas.push(data);
                    })
                    setProjectsData(tempdatas);
                    setIsLoading(false);
                })
                return () => uncrible();
            }
        })
    }, [])

    const CreateProjectHandler = () => {
        setOpenCreateProjectModal(true);
    }


    return (
        <>
            <Header />
            <div className="xl:max-w-7xl my-10 mx-auto relative sm:max-w-full px-8 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center space-y-10">
                {projectsData.length > 0 ?
                    isLoading ?
                        "items".split('').map((index) => <SkeletonComponent key={index} />) :
                        projectsData.map((project, index) => (<ProjectCard key={index} projectId={project.id} projectName={project.projectName} projectDescription={project.projectDescription} />))

                    : (<div className='w-full items-center justify-center absolute'>
                        <div className="max-w-7xl text-center mx-auto justify-center space-y-2">
                            <img className='mx-auto w-96' src="https://i.pinimg.com/564x/83/57/bc/8357bc55ec3339bd0103f0c57087fcaf.jpg" alt="empty-img" />
                            <h1 className='text-2xl font-medium'>You don't have any projects yet.</h1>
                            <p className='text-base'>You can create projects here.</p>
                            <Button
                                onClick={() => CreateProjectHandler()}
                                className='flex mx-auto justify-between items-center px-3 bg-blue-gray-800 text-center'
                            >
                                <Plus className='mx-1 w-4 h-4' />
                                Create Project
                            </Button>
                        </div>
                    </div>)
                }
                <ModalComponent />
                <CreateProjectModal />
            </div>
        </>
    )
}

export default UserProfilePage;
