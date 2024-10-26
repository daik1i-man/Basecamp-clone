import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/header/header';
import userImg from '../../images/user.jpg'
import { Book, Rocket } from 'lucide-react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { store } from '../../database/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetProjectDatasContext } from '../../provider/datasContext/projectGetDatasContext/projectGetDatasContext';
import ModalComponent from '../../components/modalComponent/modalComponent';

function UserProfileProjectsCardComponent({ projectId, projectName, projectDescription }) {
    const { setProjectData } = useContext(GetProjectDatasContext);
    const projectDatas = {
        id: projectId,
        name: projectName,
        description: projectDescription,
    }

    const GetDatasToProjectPageHandler = () => {
        setProjectData((prev) => ({ ...prev, ...projectDatas }));
    }
    return (
        <>
            <Link to={`/project/${projectId}`} onClick={GetDatasToProjectPageHandler} className='mt-3'>
                <div className="w-80 rounded-md h-36 border border-solid border-gray-400 p-3">
                    <div className="">
                        <Rocket />
                    </div>
                    <div className="my-5">
                        <h1 className='text-xl font-medium'>{projectName}</h1>
                        <p className='text-[12px]'>{projectDescription}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

function MyProfilePage() {
    const [isProject, setIsproject] = useState(false);
    const [userDatas, setUserDatas] = useState([]);
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserDatas(user);
                const queryProjects = query(collection(store, "projects"), where("userId", "==", user.uid));
                const unsubscribe = onSnapshot(queryProjects, (querySnap) => {
                    const temp = [];
                    querySnap.forEach((doc) => {
                        if (doc.data()) {
                            setIsproject(true);
                            const data = doc.data();
                            data.id = doc.id;
                            temp.push(data);
                        } else {
                            setIsproject(false);
                        }
                    })
                    setDatas(temp);
                })
                return () => unsubscribe();
            }
        })
    }, [])

    return (
        <>
            <Header />
            <div className="w-full justify-center items-center">
                <div className="max-w-[1080px] mx-auto my-5">
                    <div className="flex items-center space-x-4 my-5">
                        <div className="">
                            <img className='w-32 h-32 rounded-full' src={`${userDatas ? userDatas.photoURL : userImg}`} alt="" />
                        </div>
                        <div className="">
                            <h1 className='text-2xl font-medium'>{userDatas.displayName}</h1>
                            <p className='text-xs font-normal'>{userDatas.email}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="flex items-center space-x-4 my-10">
                        <Book />
                        <h1 className='text-xl font-medium'>My projects</h1>
                    </div>
                    {isProject ?
                        (<div className="max-w-[1080px] mx-auto grid grid-cols-3">
                            {datas.map((project) => (
                                <UserProfileProjectsCardComponent
                                    key={project.id}
                                    projectId={project.id}
                                    projectName={project.projectName}
                                    projectDescription={project.projectDescription}
                                />))}
                        </div>) :
                        (<div className="text-center -mt-10 w-full justify-center">
                            <img className='w-72 h-72 mx-auto' src="https://i.pinimg.com/564x/83/57/bc/8357bc55ec3339bd0103f0c57087fcaf.jpg" alt="" />
                            <h1 className='text-3xl font-medium'>You don't have any projects yet.</h1>
                            <p>You can create projects only on Main Page.</p>
                            <Link to='/'><Button className='my-2 rounded-md normal-case'>Go to Main-page</Button></Link>
                        </div>)
                    }
                </div>
                <ModalComponent />
            </div>
        </>
    )
}


export default MyProfilePage;
