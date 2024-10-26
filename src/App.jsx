import React, { lazy, Suspense, useEffect, useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import IsLoader from './isLoader/isLoader';
import { auth } from './database/firebase';
import { onAuthStateChanged } from 'firebase/auth';


function App() {
  const UserProfilePage = lazy(() => import("./pages/userProfilePage/userProfilePage"));
  const MainPage = lazy(() => import("./pages/mainPage/mainPage"));
  const RegisterPage = lazy(() => import("./pages/registerPage/registerPage"));
  const LoginPage = lazy(() => import("./pages/loginPage/loginPage"));
  const ResetPasswordPage = lazy(() => import("./pages/resetPasswordPage/resetPasswordPage"));
  const MyProfilePage = lazy(() => import("./pages/myProfilePage/myProfilePage"));
  const ErrorPage = lazy(() => import("./pages/errorPage/errorPage"));
  const ProjectPage = lazy(() => import("./pages/projectPage/projectPage"));
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserStatus(true);
      }
      else {
        setUserStatus(false);
      }
    })
  }, [auth])

  return (
    <div>
      <Suspense fallback={<IsLoader />}>
        <Routes>
          <Route path='/' element={userStatus ? <UserProfilePage /> : <MainPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/my-profile' element={<MyProfilePage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/project/:id' element={<ProjectPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
