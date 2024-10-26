import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Pen, Rocket, Smile, Image, Ellipsis, Trash2 } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { store } from '../../database/firebase';
import IsLoader from '../../isLoader/isLoader';
import Header from '../../components/header/header';
import { GetProjectDatasContext } from '../../provider/datasContext/projectGetDatasContext/projectGetDatasContext';
import { UpdateProjectModalContext } from '../../provider/actionsContext/updatePojectModalContext/updateProjectModalContext';
import UpdateProjectModal from '../../components/updateProjectModal/updateProjectModal';
import ModalComponent from '../../components/modalComponent/modalComponent';
import { Button, IconButton } from "@material-tailwind/react";
import { Menu, Transition } from '@headlessui/react'
import { MessageDatasContext } from '../../provider/datasContext/messageDatasContext/messageDatasContextComponent';


function ProjectPage() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const { messages, setMessages } = useContext(MessageDatasContext);
    const { projectData } = useContext(GetProjectDatasContext);
    const { setOpenUpdateProjectModal } = useContext(UpdateProjectModalContext);
    const [isLoading, setIsLoading] = useState(false);
    const projectsRef = doc(store, "projects", projectData.id);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onSnapshot(projectsRef, (docSnap) => {
            if (docSnap.exists()) {
                setData([docSnap.data()]);
            }
        });
        setIsLoading(false);
        return () => unsubscribe();
    }, [])

    const SumbitMessage = (e) => {
        e.preventDefault();
        setMessages([...messages, message]);
        setMessage('');
    }

    const MessageComponent = ({ text }) => {
        function classNames(...classes) {
            return classes.filter(Boolean).join(' ')
        }

        const DeleteMessageHandler = (text) => {
            const newMessages = messages.filter((msg) => {
                return msg !== text;
            })

            setMessages(newMessages);
        }
        return (
            <>
                <div className="flex items-center w-auto ml-auto">
                    <div className="p-2 bg-gray-800 text-white text-center rounded-2xl text-xs m-1 w-auto">
                        <p>{text}</p>
                    </div>
                    <Menu as="div" className="relative ml-3">
                        <div className=''>
                            <Menu.Button className="">
                                <Ellipsis className='opacity-10 w-4 h-4 hover:opacity-50 cursor-pointer' />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 origin-top-right rounded-md bg-white shadow-md ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item className=''>
                                    {({ active }) => (
                                        <div
                                            onClick={() => DeleteMessageHandler(text)}
                                            className={`${classNames(active ? 'text-red-600' : '', 'block px-4 py-2 text-sm text-gray-700')} flex cursor-pointer items-center space-x-2`}
                                        >
                                            <Trash2 className='w-4 h-4' />
                                            <p className='text-xs'>Delete</p>
                                        </div>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />
            {data.map((project, index) => (
                <div key={index} className="border border-solid w-full mx-auto max-w-[980px] my-12 space-y-4 py-2 px-2">
                    <div className="flex mx-auto w-[80%] justify-between items-center my-12">
                        <h1 className='font-semibold text-4xl'>Project Overview</h1>
                        <Rocket className='w-16 h-16' />
                        <Button className="text-center flex items-center space-x-2 py-3" onClick={() => setOpenUpdateProjectModal(true)}>
                            <Pen className='w-4 h-4' />
                            <p>Edit project</p>
                        </Button>
                    </div>
                    <hr />
                    <div className="flex w-[80%] mx-auto my-auto items-center justify-between space-y-5">
                        <div className="space-y-5 flex space-x-10">
                            <div className="">
                                <p>Project Name :</p>
                                <h1 className='text-3xl p-2'>{project.projectName}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%] mx-auto my-10 h-28">
                        <div className="space-y-5 flex space-x-10">
                            <div className="space-y-2">
                                <p>Project Description :</p>
                                <h1 className='text-3xl p-2'>{project.projectDescription}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%]  mx-auto h-full">
                        <div className="">
                            <h1>Write a review :</h1>
                        </div>
                        <div className="mx-auto h-full mt-3 rounded-md border-gray-400">
                            <div className={`w-full mx-auto my-2 h-20 ${messages.length > 0 ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
                                {messages.map((msg, index) => (
                                    <MessageComponent key={index} text={msg} />
                                ))}
                            </div>
                            <form onSubmit={(e) => SumbitMessage(e)} className="flex items-center border w-full border-solid rounded-full h-11 border-gray-400">
                                <div className="flex">
                                    <IconButton variant="text" className="rounded-full">
                                        <Image />
                                    </IconButton>
                                    <IconButton variant="text" className="rounded-full">
                                        <Smile />
                                    </IconButton>
                                </div>
                                <input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    type='text'
                                    className='w-full p-2 outline-none bg-none'
                                    placeholder='Message...'
                                />
                                <div>
                                    <IconButton variant="text" className="rounded-full" onClick={(e) => SumbitMessage(e)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                            />
                                        </svg>
                                    </IconButton>
                                </div>
                            </form>
                        </div>
                    </div>
                    {isLoading ? (<IsLoader />) : ''}
                    <UpdateProjectModal projectId={projectData.id} />
                </div>
            ))}
            <ModalComponent />
        </>
    )
}

export default ProjectPage;
