import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/usersSlice';
import postsSlice from './slices/postsSlice';

export const store = configureStore({
    reducer: {
        userSlice,
        postsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch