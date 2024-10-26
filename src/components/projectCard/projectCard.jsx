import React, { Fragment, useContext, useState } from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Rocket, MoveRight, Settings, Trash2, EllipsisVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from "@headlessui/react";
import { UpdateProjectModalContext } from "../../provider/actionsContext/updatePojectModalContext/updateProjectModalContext";
import { DeleteProjectModalContext } from '../../provider/actionsContext/deleteProjectModalContext/deleteProjectModalContext'
import { GetProjectDatasContext } from "../../provider/datasContext/projectGetDatasContext/projectGetDatasContext";
import UpdateProjectModal from '../updateProjectModal/updateProjectModal';
import DeleteProjectModal from "../deleteProjectModal/deleteProjectModal";

export default function ProjectCard({ projectId, projectName, projectDescription }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const { setOpenUpdateProjectModal } = useContext(UpdateProjectModalContext);
    const { setOpenDeleteProjectModal } = useContext(DeleteProjectModalContext);
    const { setProjectData } = useContext(GetProjectDatasContext);

    const datas = {
        id: projectId,
        name: projectName,
        description: projectDescription,
    }

    const GetDatasToProjectPageHandler = () => {
        setProjectData((prev) => ({...prev, ...datas}));
    }

    return (
        <Card className="shadow-none border border-solid border-blue-gray-100 mt-10 xl:w-[390px] md:w-[450px] sm:w-full mx-auto">
            <CardBody>
                <div className="flex justify-between">
                    <Rocket
                        className="mb-4 h-12 w-12 text-gray-900"
                    />
                    <Menu as="div" className="relative ml-3">
                        <div className=''>
                            <Menu.Button className="relative flex rounded-full text-sm focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <EllipsisVertical />
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
                            <Menu.Items className="absolute right-0 py-1 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div>
                                    <Menu.Item className=''>
                                        {({ active }) => (
                                            <div
                                                onClick={() => setOpenUpdateProjectModal(true)}
                                                className={`${classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} flex items-center space-x-4 cursor-pointer`}
                                            >
                                                <Settings />
                                                <p>Edit project</p>
                                            </div>
                                        )}
                                    </Menu.Item>
                                </div>
                                <Menu.Item className=''>
                                    {({ active }) => (
                                        <div
                                            onClick={() => setOpenDeleteProjectModal(true)}
                                            className={`${classNames(active ? 'bg-blue-gray-50' : '', 'block px-4 py-2 text-sm text-red-600')} cursor-pointer flex items-center space-x-4`}
                                        >

                                            <Trash2 />
                                            <p>Delete project</p>
                                        </div>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {projectName}
                </Typography>
                <Typography variant="h6">
                    {projectDescription}
                </Typography>
            </CardBody>
            <CardFooter className="flex pt-0 h-16">
                <div className="">
                    <Link to={`/project/${projectId}`}>
                        <Button
                            onClick={GetDatasToProjectPageHandler}
                            size="sm"
                            variant="text"
                            className="flex items-center gap-2 py-3 bg-blue-gray-50 hover:bg-blue-gray-100">
                            Overview Project
                            <MoveRight className='h-4 w-4' />
                        </Button>
                    </Link>
                </div>
            </CardFooter>
            <UpdateProjectModal projectId={projectId} /><DeleteProjectModal projectId={projectId} />
        </Card>
    );
}