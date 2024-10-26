import React, { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UpdateProjectModalContext } from '../../provider/actionsContext/updatePojectModalContext/updateProjectModalContext';
import { Button, Typography } from '@material-tailwind/react';
import { doc, updateDoc } from 'firebase/firestore';
import { store } from '../../database/firebase';

export default function UpdateProjectModal({ projectId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');
    const { openUpdatProjectModal, setOpenUpdateProjectModal } = useContext(UpdateProjectModalContext);
    const projectRef = doc(store, "projects", projectId);

    const projectNewDatas = {
        projectName: newProjectName,
        projectDescription: newProjectDescription,
    }

    const UpdateProjectHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            updateDoc(projectRef, projectNewDatas)
                .then(() => {
                    setNewProjectName('');
                    setNewProjectDescription('');
                    setIsLoading(false);
                    setOpenUpdateProjectModal(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }, 3000)
    }

    const CloseModalHandler = () => {
        if ((newProjectName || newProjectDescription) !== '') {
            setOpenUpdateProjectModal(false);
        }
        setNewProjectName('');
        setNewProjectDescription('');
    }

    return (
        <Transition.Root show={openUpdatProjectModal} as={Fragment}>
            <Dialog className="relative z-10" onClose={CloseModalHandler}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-gray-50 px-4 py-3 xl:block sm:flex sm:flex-row-reverse sm:px-6">
                                    <Typography variant="h3" color="blue-gray" className="my-4 text-center">
                                        Update Project
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
                                                value={newProjectName}
                                                onChange={(e) => setNewProjectName(e.target.value)}
                                                className='w-full border border-solid border-blue-gray-200 rounded-[7px] px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200'
                                            />
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
                                                    value={newProjectDescription}
                                                    onChange={(e) => setNewProjectDescription(e.target.value)}
                                                    className="w-full resize-none rounded-[7px] border border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 transition-all  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                                    placeholder="">
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="w-full text-right mt-5 mb-3">
                                            <Button
                                                onClick={() => setOpenUpdateProjectModal(false)}
                                                type="button"
                                                className="inline-flex w-full justify-center normal-case rounded-md px-10 py-2 text-sm font-semibold text-gray-800 bg-blue-gray-50 hover:shadow-none shadow-sm sm:ml-3 sm:w-auto"
                                            >
                                                Cancel
                                            </Button>
                                            {isLoading ? (<Button
                                                loading='true'
                                                type="button"
                                                className="inline-flex w-full justify-center normal-case rounded-md px-10 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                            >
                                                Saving...
                                            </Button>) : (<Button
                                                onClick={UpdateProjectHandler}
                                                type="button"
                                                className="inline-flex w-full justify-center normal-case rounded-md px-10 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                            >
                                                Save
                                            </Button>)}
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
