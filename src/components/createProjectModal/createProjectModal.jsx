import { Fragment, useContext, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Typography, Button } from "@material-tailwind/react";
import { CreateProjectModalContext } from '../../provider/actionsContext/createProjectModalContext/createProjectModalContext';
import { BookPlus } from 'lucide-react';
import { store } from '../../database/firebase';
import { auth } from '../../database/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


export default function CreateProjectModal() {
    const { openCreateProjectModal, setOpenCreateProjectModal } = useContext(CreateProjectModalContext);
    const [projectName, setProjectName] = useState('');
    const [projectNameError, setProjectNameError] = useState('');
    const [projectDescriptionError, setProjectDescriptionError] = useState('');
    const [checkDatasState, setCheckDatasState] = useState(false);
    const [projectDescription, setProjectDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const cancelButtonRef = () => {
        setProjectName('');
        setProjectDescription('');
        setOpenCreateProjectModal(false);
    }

    const ProjectNameHandler = (e) => {
        setProjectName(e.target.value);
    }

    const ProjectDescriptionHandler = (e) => {
        setProjectDescription(e.target.value);
    }

    const ProjectErrorHandler = () => {
        if (projectName === '') {
            setProjectNameError('Enter the project name');
        }
        else {
            setProjectNameError('');
        }
        if (projectDescription === '') {
            setProjectDescriptionError('Enter the project description');
        }
        else {
            setProjectDescriptionError('');
        }
    }

    useEffect(() => {
        if (projectName !== '' && projectDescription !== '') {
            setCheckDatasState(true);
        }
        else {
            setCheckDatasState(false);
        }
        if (projectName !== '') {
            setProjectNameError('');
        }
        if (projectDescription !== '') {
            setProjectDescriptionError('');
        }
    })

    const projectsRef = collection(store, "projects");
    const currentUser = auth.currentUser;

    const CreateProjectHandler = () => {
        if (checkDatasState) {
            setIsLoading(true);
            addDoc(projectsRef, {
                projectName: projectName,
                projectDescription: projectDescription,
                userId: currentUser.uid,
            }).then(() => {
                setProjectName('');
                setProjectDescription('');
                setOpenCreateProjectModal(false);
            })
        }
    }

    useEffect(() => {
        CreateProjectHandler();
    }, [store])

    return (
        <Transition.Root show={openCreateProjectModal} as={Fragment} onClick={cancelButtonRef}>
            <Dialog as="div" className="relative z-10" onClose={cancelButtonRef}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" onClick={ProjectErrorHandler}>
                                <Typography variant="h3" color="blue-gray" className="my-4 text-center">
                                    Create Project
                                </Typography>
                                <form className="mx-auto max-w-[24rem] text-left" target='_blank'>
                                    <div className="mt-3">
                                        <label>
                                            <Typography
                                                variant="small"
                                                className="my-6 block font-medium text-gray-900"
                                            >
                                                Project Name
                                            </Typography>
                                        </label>
                                        <input
                                            type="text"
                                            value={projectName}
                                            className='w-full border border-solid border-blue-gray-200 rounded-[7px] px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200'
                                            onChange={ProjectNameHandler}
                                            onClick={ProjectErrorHandler}
                                        />
                                        <p className='my-2 text-red-900 text-xs'>{projectNameError}</p>
                                    </div>
                                    <label>
                                        <Typography
                                            variant="small"
                                            className="my-4 block font-medium text-gray-900"
                                        >
                                            Project description
                                        </Typography>
                                    </label>
                                    <div className="w-96">
                                        <div className="relative w-full min-w-[200px]">
                                            <textarea
                                                value={projectDescription}
                                                onChange={ProjectDescriptionHandler}
                                                onClick={ProjectErrorHandler}
                                                className="h-full w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder="">
                                            </textarea>
                                            <p className='my-2 text-red-900 text-xs'>{projectDescriptionError}</p>
                                        </div>
                                    </div>
                                    {isLoading ?
                                        (<Button
                                            loading={true}
                                            color="gray"
                                            size="lg"
                                            className="w-full flex justify-center my-6 items-center uppercase">
                                            Creating...
                                        </Button>) :
                                        (checkDatasState ?
                                            (<Button
                                                onClick={CreateProjectHandler}
                                                color="gray"
                                                size="lg"
                                                className="flex justify-center my-6 items-center"
                                                fullWidth>
                                                <BookPlus />
                                                <p>create project</p>
                                            </Button>) : (<Button onClick={CreateProjectHandler}
                                                disabled
                                                color="gray"
                                                size="lg"
                                                className="flex justify-center my-6 items-center"
                                                fullWidth>
                                                <BookPlus />
                                                <p>create project</p>
                                            </Button>))
                                    }
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
