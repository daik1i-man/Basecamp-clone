import React, { useContext, Fragment, useState, useEffect } from 'react'
import basecampLogo from '../../images/basecamp_logo.png'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { Plus, CircleUserRound, Settings, LogOut } from 'lucide-react'
import { Menu, Transition } from '@headlessui/react'
import { ModalContext } from '../../provider/actionsContext/modalContext/modalContext'
import { CreateProjectModalContext } from '../../provider/actionsContext/createProjectModalContext/createProjectModalContext'
import userLogo from '../../images/user.jpg';

function Header() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [userStatus, setUserStatus] = useState(false);
    const { setOpen } = useContext(ModalContext);
    const { setOpenCreateProjectModal } = useContext(CreateProjectModalContext);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName);
                if (userName === undefined | null) {
                    setUserStatus(true);
                }
                else {
                    setUserStatus(false);
                }
                setUserEmail(user.email);
                setUserPhoto(user.photoURL);
            }
        })
    }, [auth])

    const OpenModalHandler = () => setOpen(true);

    const OpenCreateFolderModalHandler = () => setOpenCreateProjectModal(true);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <header>
            <div className="max-w-7xl h-[80px] mx-auto">
                <div className="w-full flex h-full items-center justify-between px-2">
                    <Link className="w-32 flex items-center space-x-2" to='/'>
                        <img className='w-12' src={basecampLogo} alt="basecampLogo" />
                        <h1 className='text-2xl'>Basecamp</h1>
                    </Link>
                    <div className="flex space-x-8 h-full items-center">
                        <button
                            onClick={OpenCreateFolderModalHandler}
                            className='border border-blue-gray-300 border-solid p-2 px-4 rounded-md flex space-x-1 hover:bg-blue-gray-900 hover:text-white transition-all'
                        >
                            <Plus />
                            <span>Create Project</span>
                        </button>
                        <Menu as="div" className="relative ml-3">
                            <div className=''>
                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <img className='w-12 h-12 rounded-full' src={`${(userPhoto !== null) ? userPhoto : userLogo}`} alt="" />
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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {userStatus ? (<div></div>) : (<div className="">
                                        <div className="w-[240px] mx-auto p-2 flex items-center justify-between">
                                            <div className="">
                                                <img className='w-10 h-10 rounded-full' src={`${(userPhoto !== null) ? userPhoto : userLogo}`} alt="" />
                                            </div>
                                            <div className="">
                                                <h1 className='text-base font-normal'>{userName}</h1>
                                                <p className='text-xs font-light'>{userEmail}</p>
                                            </div>
                                        </div>
                                    </div>)}
                                    <hr />
                                    <Menu.Item className=''>
                                        {({ active }) => (
                                            <Link
                                                to='/my-profile'
                                                className={`${classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} flex items-center space-x-4 mt-4`}
                                            >
                                                <CircleUserRound />
                                                <p>My profile</p>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item className='mt-2'>
                                        {({ active }) => (
                                            <Link
                                                onClick={OpenModalHandler}
                                                className={`${classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} flex items-center space-x-4`}
                                            >
                                                <LogOut />
                                                <p>Sign out</p>
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header;
