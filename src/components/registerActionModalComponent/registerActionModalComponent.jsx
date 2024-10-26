import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RegisterStateModalContext } from '../../provider/actionsContext/registerStateModalContext/registerStateModalContext'
import { useNavigate } from 'react-router-dom';
import { CircleCheckBig, MoveRight } from 'lucide-react';
import { Button } from '@material-tailwind/react';


export default function RegisterActionModalComponent() {
    const { openRegisterStateModal, setOpenRegisterStateModal } = useContext(RegisterStateModalContext);
    let navigate = useNavigate();

    const CloseModalHandler = () => {
        navigate('/');
        setOpenRegisterStateModal(false);
    }

    return (
        <Transition.Root show={openRegisterStateModal} as={Fragment}>
            <Dialog className="relative z-10" onClose={setOpenRegisterStateModal}>
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
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-4">
                                    <div className="flex justify-center space-x-4 items-center">
                                        <div className="">
                                            <CircleCheckBig />
                                        </div>
                                        <div className="">
                                            <h1 className='text-2xl'>Successfully</h1>
                                        </div>
                                    </div>
                                    <div className="text-center w-80 mx-auto">
                                        <p className='text-[14px]'>You have successfully registered on the site. Now you can go to your profile.</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <Button
                                        type="button"
                                        className="w-full flex items-center space-x-4 normal-case rounded-md px-10 py-2.5 xl:mx-auto text-sm font-semibold text-white hover:shadow-none sm:ml-3 sm:w-auto"
                                        onClick={() => CloseModalHandler()}
                                    >
                                        <p>Go to profile</p>
                                        <MoveRight />
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
