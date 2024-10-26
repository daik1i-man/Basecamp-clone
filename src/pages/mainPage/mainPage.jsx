import React from 'react'
import { Link } from 'react-router-dom'
import basecampLogo from '../../images/basecamp_logo.png';
import Image from '../../images/image.png';

function MainPage() {
    return (
        <main className='relative'>
            <div className="">
                <header className="max-w-7xl h-[80px] mx-auto">
                    <div className="w-full flex h-full items-center justify-between px-2">
                        <Link to='/' className="w-32 flex items-center space-x-2">
                            <img className='w-12' src={basecampLogo} alt="basecampLogo" />
                            <h2 className='text-xl font-bold font-sans text-blue-gray-900'>BaseCamp</h2>
                        </Link>
                        <div className="flex w-72 space-x-4 h-full items-center">
                            <Link to='/register'>
                                <button
                                    className='block select-none rounded-lg bg-gray-900 py-3 px-10 align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                                >
                                    Sign-up
                                </button>
                            </Link>
                            <Link to='/login'>
                                <button
                                    className='block select-none rounded-lg bg-gray-900 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                                >
                                    Sign-in
                                </button>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="xl:max-w-7xl sm:max-w-4xl mx-auto xl:flex sm:block md:block items-center justify-between xl:px-3 sm:px-5">
                    <div className="space-y-5 space-x-3">
                        <h1 className='text-6xl text-blue-gray-900 font-bold sm:mt-20'>Where it all comes together.</h1>
                        <p className='px-2 text-base xl:w-[500px] sm:w-[400px] font-semibold'>Basecamp’s the project management platform that helps small teams move faster and make more progress than they ever thought possible.</p>
                        <Link
                            className='w-44'
                            to='/register'
                        >
                            <button
                                className='mt-6 block mx-select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                            >
                                Get-Started
                            </button>
                        </Link>
                    </div>
                    <div className="">
                        <img className='xl:w-[500px] xl:block sm:hidden' src={Image} alt="" />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainPage
