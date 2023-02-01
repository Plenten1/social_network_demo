import React from 'react';
import SignIn from './Components/Pages/SignIn/SignIn';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Pages/Home/Home';
import SignUp from './Components/Pages/SignUp/SignUp';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { checkAuth } from './store/actionCreators/user';
import Profile from './Components/Pages/Profile/Profile';
import Header from './Components/Header';
import { Box, CircularProgress } from '@mui/material';


const App: React.FC = () => {
  const {isAuth, loading} = useAppSelector(state => state.userSlice);
  const dispatch = useAppDispatch();


  React.useEffect(() => {
    dispatch(checkAuth());

  }, [])
 

  if(loading){
    return (
      <Box sx={{ display: 'flex', position: 'absolute', left: '50%', top: '10%', transform: 'translate(-50%, -50%)'}}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <div className="App">
      <Header/>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path="*" element={<Navigate to={'/'} />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to={'/signin'} />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
