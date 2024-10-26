import { Fragment, useRef, useContext, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ModalContext } from '../../provider/actionsContext/modalContext/modalContext';
import { auth } from '../../database/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@material-tailwind/react';

export default function ModalComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const { open, setOpen } = useContext(ModalContext);
    const cancelButtonRef = useRef(null);
    let navigate = useNavigate();

    const LogoutHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            signOut(auth)
                .then(() => {
                    setIsLoading(false);
                    setOpen(false);
                    navigate("/login");
                })
        }, 2000)
    }

    return (
        <Transition.Root show={open}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
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
                                            <LogOut className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Are you sure you want to log out?
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Logout to continue?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {isLoading ? (<Button
                                        loading='true'
                                        type="button"
                                        onClick={LogoutHandler}
                                        className="inline-flex w-full justify-center normal-case rounded-md bg-blue-gray-900 px-10 py-2.5 text-sm font-semibold text-white hover:bg-blue-gray-800 sm:ml-3 sm:w-auto"
                                    >
                                        Signing...
                                    </Button>) : (<Button
                                        type="button"
                                        onClick={LogoutHandler}
                                        className="inline-flex w-full justify-center normal-case rounded-md bg-blue-gray-900 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-gray-800 sm:ml-3 sm:w-auto"
                                    >
                                        Sign-out
                                    </Button>)}
                                    <Button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center shadow-none hover:shadow-none normal-case rounded-md bg-gray-200 px-10 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
