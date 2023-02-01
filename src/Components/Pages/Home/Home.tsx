import React from 'react';
import { useAppDispatch, useAppSelector } from './../../../store/hooks';

const Home:React.FC = () => {
    
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.userSlice.user);
    return (
        <div>
            HOME
        </div>
    );
};

export default Home;