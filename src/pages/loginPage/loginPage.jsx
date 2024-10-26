import React, { useEffect, useState } from "react";
import Image2 from '../../images/image2.png';
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import basecampLogo from '../../images/basecamp_logo.png';
import { auth, SignInWithGooglePopup, store } from '../../database/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

function LoginPage() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [datasCheck, setDatasCheck] = useState(false);
    const [firebaseErrors, setFirebaseErrors] = useState('');
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    let navigate = useNavigate();

    useEffect(() => {
        if (userEmail.endsWith('@gmail.com') && userPassword.length > 8) {
            setDatasCheck(true);
        }
        else {
            setDatasCheck(false);
        }
    })

    const SubmitDatas = (e) => {
        e.preventDefault();
        if (datasCheck) {
            signInWithEmailAndPassword(auth, userEmail, userPassword)
                .then(() => {
                    navigate("/");
                })
                .catch((error) => {
                    if (error.code === "auth/invalid-credential") {
                        setFirebaseErrors("User not found!");
                        setUserPassword('');
                    }
                })
        }
    }

    const logGoogleUser = async () => {
        const response = await SignInWithGooglePopup()
            .then((result) => {
                const user = result.user;

                const userData = {
                    userAvatar: user.photoURL,
                    userName: user.displayName,
                    userEmail: user.email,
                }

                setDoc(doc(store, "users", user.uid), userData);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <header className="w-full bg-[#ffffff7d] border border-solid h-[80px] fixed top-0 z-[2]" style={{ backdropFilter: "blur(10px)" }}>
                <div className="max-w-7xl mx-auto flex h-full items-center justify-between px-2">
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
                </div>
            </header>
            <div className="max-w-screen-lg mx-auto">
                <div className="border border-solid rounded-md w-[450px] mx-auto p-8 my-40">
                    <div className="flex mt-4 -mb-2">
                        <div className="">
                            <Typography variant="h3" color="blue-gray" className="mb-2">
                                Log in to Basecamp
                            </Typography>
                            <Typography className="mb-8 text-gray-600 font-normal text-[18px]">
                                deal for freelancers,startups, or smaller teams.
                            </Typography>
                        </div>
                        <div className="">
                            <img className="w-36" src={Image2} alt="" />
                        </div>
                    </div>
                    <p className="text-lg my-2 text-center text-red-900">{firebaseErrors}</p>
                    <form className="mx-auto max-w-[24rem] text-left">
                        <Button
                            variant="outlined"
                            size="lg"
                            onClick={logGoogleUser}
                            className="mt-6 flex h-12 items-center justify-center gap-2 max-w-screen-lg mb-2 w-80 sm:w-96"
                            fullWidth
                        >
                            <img
                                src={`https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png`}
                                alt="google"
                                className="h-6 w-6"
                            />{" "}
                            sign in with google
                        </Button>
                        <span className='block -mb-5 my-2 font-sans text-base antialiased font-normal opacity-35 text-center leading-relaxed tracking-normal text-blue-gray-900'>Or, use my email address</span>
                        <div className="mt-8 mb-8">
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
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="example@mail.com"
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password">
                                <Typography
                                    variant="small"
                                    className="mb-2 block font-medium text-gray-900"
                                >
                                    Password
                                </Typography>
                            </label>
                            <Input
                                size="lg"
                                placeholder="********"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                type={passwordShown ? "text" : "password"}
                                icon={
                                    <i onClick={togglePasswordVisiblity}>
                                        {passwordShown ? (
                                            <EyeIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        )}
                                    </i>
                                }
                            />
                        </div>
                        {
                            datasCheck ?
                                (<Button
                                    color="gray"
                                    size="lg"
                                    className="mt-6"
                                    fullWidth
                                    onClick={SubmitDatas}
                                >
                                    sign in
                                </Button>)
                                : (<Button
                                    disabled
                                    color="gray"
                                    size="lg"
                                    className="mt-6"
                                    fullWidth
                                    onClick={SubmitDatas}
                                >
                                    sign in
                                </Button>)
                        }
                        <div className="mt-4 flex justify-end">
                            <Link
                                to='/reset-password'
                                color="blue-gray"
                                variant="small"
                                className="font-medium"
                            >
                                Forgot password
                            </Link>
                        </div>
                        <Typography
                            variant="small"
                            color="gray"
                            className="mt-4 text-center font-normal"
                        >
                            Not registered?{" "}
                            <Link to='/register' className="font-medium text-gray-900">
                                Create account
                            </Link>
                        </Typography>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;