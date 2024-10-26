import React, { useEffect, useState } from 'react'
import Image2 from '../../images/image2.png';
import basecampLogo from '../../images/basecamp_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Input, Button } from "@material-tailwind/react";
import { auth } from '../../database/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

function ResetPasswordPage() {
    const [userEmail, setUseremail] = useState('');
    const [checkDatas, setCheckDatas] = useState(false);
    const [firebaseErrors, setFirebaseErrors] = useState('');
    let navigate = useNavigate();
    let timer;

    useEffect(() => {
        if (userEmail.endsWith('@gmail.com')) {
            setCheckDatas(true);
        }
        else {
            setCheckDatas(false);
        }
    })

    const ResetPassword = () => {
        if (checkDatas) {
            sendPasswordResetEmail(auth, userEmail)
                .then(() => {
                    setFirebaseErrors('We have sent you a link to reset your password.');
                    timer = setTimeout(() => {
                        navigate("/");
                    }, 3000)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        return () => clearTimeout(timer);
    }

    return (
        <div className="">
            <header className="max-w-7xl h-[80px] mx-auto">
                <div className="w-full flex h-full items-center justify-between px-2">
                    <Link to='/' className="w-32 flex items-center space-x-2">
                        <img className='w-12' src={basecampLogo} alt="basecampLogo" />
                        <h2 className='text-xl font-bold font-sans text-blue-gray-900'>BaseCamp</h2>
                    </Link>
                    <div className="flex w-64 space-x-4 h-full items-center">
                        <Link to='/register'>
                            <button
                                className='block select-none rounded-lg bg-gray-900 py-3 px-6 align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                            >
                                Sign-up
                            </button>
                        </Link>
                        <Link to='/login'>
                            <button
                                className='block select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                            >
                                Sign-in
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="max-w-screen-lg mx-auto">
                <div className="border border-solid rounded-md w-[450px] mx-auto p-8 mt-28">
                    <div className="flex mt-4 -mb-2">
                        <div className="">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Forgot your password?
                            </Typography>
                            <Typography className="mb-8 text-gray-600 font-normal text-[14px]">
                                We will send you a link to reset your password.
                            </Typography>
                        </div>
                        <div className="">
                            <img className="w-36" src={Image2} alt="" />
                        </div>
                    </div>
                    <p className="text-lg font-bold my-4 text-green-800">{firebaseErrors}</p>
                    <form action="#" className="mx-auto max-w-[24rem] text-left">
                        <div className="mb-8">
                            <label htmlFor="email">
                                <Typography
                                    variant="small"
                                    className="mb-5 block font-medium text-gray-900"
                                >
                                    Your Email
                                </Typography>
                            </label>
                            <Input
                                id="email"
                                color="gray"
                                size="lg"
                                type="email"
                                name="email"
                                value={userEmail}
                                onChange={(e) => setUseremail(e.target.value)}
                                placeholder="example@mail.com"
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                        {
                            checkDatas ?
                                (<Button
                                    color="gray"
                                    size="lg"
                                    className="mt-6"
                                    fullWidth
                                    onClick={ResetPassword}
                                >
                                    reset password
                                </Button>)
                                : (<Button
                                    disabled
                                    color="gray"
                                    size="lg"
                                    className="mt-6"
                                    fullWidth
                                >
                                    reset password
                                </Button>)
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage
