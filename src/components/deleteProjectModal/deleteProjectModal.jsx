import { Fragment, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { DeleteProjectModalContext } from '../../provider/actionsContext/deleteProjectModalContext/deleteProjectModalContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { store } from '../../database/firebase';
import { Button } from '@material-tailwind/react';

export default function DeleteProjectModal({ projectId }) {
    const [isLoading, setIsloading] = useState(false);
    const { openDeleteProjectModal, setOpenDeleteProjectModal } = useContext(DeleteProjectModalContext);

    const DeleteHandler = async () => {
        setIsloading(true);
        const projectRef = doc(store, "projects", projectId);
        setTimeout(() => {
            deleteDoc(projectRef)
                .then(() => {
                    setIsloading(false);
                    setOpenDeleteProjectModal(false);
                })
                .catch((error) => {
                    console.log(error);
                })
        }, 1000)
    }

    return (
        <Transition.Root show={openDeleteProjectModal} as={Fragment}>
            <Dialog className="relative z-10" onClose={setOpenDeleteProjectModal}>
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
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Delete project
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete your project? All of your data will be permanently
                                                    removed. This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {isLoading ? (<Button
                                        loading='true'
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md normal-case px-10 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                    >Deleting...</Button>
                                    ) : (<Button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md normal-case px-10 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        onClick={() => DeleteHandler()}
                                    >
                                        Delete Project
                                    </Button>)}
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-10 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpenDeleteProjectModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
