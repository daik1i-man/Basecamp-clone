import React, { useContext, useEffect, useState } from 'react'
import { Button, Input } from '@material-tailwind/react'
import { Link } from 'react-router-dom';
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Image2 from '../../images/image2.png';
import basecampLogo from '../../images/basecamp_logo.png';
import { auth, store } from '../../database/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import RegisterActionModalComponent from '../../components/registerActionModalComponent/registerActionModalComponent';
import { RegisterStateModalContext } from '../../provider/actionsContext/registerStateModalContext/registerStateModalContext';

export default function RegisterPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [firebaseErrors, setFirebaseErrors] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [datasChecked, setDatasChecked] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { setOpenRegisterStateModal } = useContext(RegisterStateModalContext);
  const [isLoading, setIsLoading] = useState(false);
  const addUsersRef = collection(store, "users");

  useEffect(() => {
    if (userName !== '' &&
      userEmail.endsWith('@gmail.com') &&
      userPassword.length > 8 &&
      userConfirmPassword.length > 8 &&
      userPassword === userConfirmPassword &&
      isChecked) {
      setDatasChecked(true);
    }
    else {
      setDatasChecked(false);
    }
  })

  const SubmitDatas = (e) => {
    e.preventDefault();
    if (datasChecked) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then(() => {
          addDoc(addUsersRef, {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword
          })
          setIsLoading(false);
          setOpenRegisterStateModal(true);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setUserPassword('');
            setUserConfirmPassword('');
            setFirebaseErrors("This email already taken!");
          }
        })
    }
  }

  const DropHandler = (e) => {
    e.preventDefault();
  }

  return (
    <div className="">
      <header className="w-full bg-[#ffffff7d] h-[80px] border border-solid fixed z-[2]" style={{ backdropFilter: "blur(10px)" }}>
        <div className="xl:max-w-7xl mx-auto flex h-full items-center justify-between px-2">
          <Link to='/' className="w-32 flex items-center space-x-2">
            <img className='w-12' src={basecampLogo} alt="basecampLogo" />
            <h2 className='text-xl font-bold font-sans text-blue-gray-900'>BaseCamp</h2>
          </Link>
          <div className="flex sl:w-64 space-x-4 h-full items-center">
            <Link to='/register'>
              <button
                className='block select-none rounded-lg bg-gray-900 xl:py-3 xl:px-6 sm:py-2 sm:px-3 align-middle font-sans text-xs font-bold xl:uppercase sm:touch-pan-up text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              >
                Sign-up
              </button>
            </Link>
            <Link to='/login'>
              <button
                className='block select-none rounded-lg bg-gray-900 xl:py-3 xl:px-6 sm:py-2 sm:px-3 text-center align-middle font-sans text-xs font-bold xl:uppercase sm:touch-pan-up text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              >
                Sign-in
              </button>
            </Link>
          </div>
        </div>
      </header>
      <div className='xl:max-w-screen-lg py-8 sm:max-w-full mb-2 w-96 sm: mx-auto'>
        <div className="max-w-screen-lg mt-32 mb-2 w-[440px] xl:mx-auto sm:mx-0 sm:border sm:border-solid rounded-md xl:border xl:border-solid xl:border-blue-gray-100 p-6">
          <div className="relative mx-auto flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <div className="flex items-center">
              <div className="">
                <h4 className="block font-sans xl:w-[280px] text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 max-w-screen-lg mt-8 mb-2 sm:w-96">
                  Try Basecamp for free
                </h4>
                <p className="block mt-1 w-[250px] font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  No credit card required • Cancel anytime
                </p>
              </div>
              <div className="xl:w-56 xl:block sm:hidden">
                <img className='' src={Image2} alt="" />
              </div>
            </div>
            <p className='text-base text-red-700 mt-4'>{firebaseErrors}</p>
            <form
              className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
            >
              <div className="flex flex-col gap-6 mb-1">
                <h6
                  className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Your Name
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder="John Smith"
                    type='text'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                </div>
                <h6
                  className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Your Email
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder="example@mail.com"
                    type='email'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0" />
                </div>
                <h6
                  className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Your Password
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <Input
                    size="lg"
                    placeholder='******'
                    value={userPassword}
                    onCopy={DropHandler}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-500 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0"
                    type={passwordShown ? "text" : "password"}
                    icon={
                      <i onClick={togglePasswordVisiblity}>
                        {passwordShown ? (
                          <EyeIcon className="h-5 w-5 cursor-pointer" />
                        ) : (
                          <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                        )}
                      </i>
                    }
                  />
                </div>
                <h6
                  className="block mt-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Password Confirmation
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  <Input
                    size="lg"
                    placeholder="********"
                    value={userConfirmPassword}
                    onPaste={DropHandler}
                    onChange={(e) => setUserConfirmPassword(e.target.value)}
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-500 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
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
              </div>
              <div className="inline-flex items-center mt-3">
                <label className="relative  flex cursor-pointer items-center rounded-full p-3" htmlFor="remember">
                  <input
                    type="checkbox"
                    onClick={() => setIsChecked(true)}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                  />
                  <span
                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                      stroke="currentColor" strokeWidth="1">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
                  <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                    I agree the
                    <Link className="font-medium transition-colors hover:text-gray-900">
                      &nbsp;Terms and Conditions
                    </Link>
                  </p>
                </label>
              </div>
              {
                datasChecked ?
                  (isLoading ? (
                    <Button loading='true' onClick={() => setOpenRegisterStateModal(true)} className="w-full justify-center" type="button">...Sending</Button>
                  ) : (
                    <Button onClick={SubmitDatas} className="w-full justify-center" type="button">Sign up</Button>
                  ))
                  : (
                    <Button disabled className="w-full justify-center" type="button">Sign up</Button>
                  )
              }
              <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                Already have an account?
                <Link to='/login' className="font-medium text-gray-900 mx-2">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <RegisterActionModalComponent />
    </div >
  )
}
