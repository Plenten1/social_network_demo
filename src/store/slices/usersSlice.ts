import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { checkAuth, getUser, signIn, updateAvatar } from '../actionCreators/user';
import { UserI } from './../types/user';
import { signUp } from './../actionCreators/user';

interface UsersStateI {
  user: UserI | null
  loading: boolean
  error: string | null
  isAuth: boolean
}

const initialState: UsersStateI = {
  user: null,
  loading: true,
  error: null,
  isAuth: false,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setLoading(state, action:PayloadAction<boolean>){
        state.loading = action.payload;
      },

      setError(state, action:PayloadAction<string | null>){
        state.error = action.payload;
      },

    },
    extraReducers(builder) {
      builder
        .addCase(signIn.pending, (state) => {
          state.loading = true;
        })

        .addCase(signIn.rejected, (state, action) => {
          state.error = action.payload!;
          state.loading = false;
          state.isAuth = false;
        })

        .addCase(signIn.fulfilled, (state, action) => {
          state.error = action.payload;
          state.isAuth = true;
        })

        .addCase(signUp.pending, (state) => {
          state.loading = true;
        })

        .addCase(signUp.rejected, (state, action) => {
          state.error = action.payload!;
          state.loading = false;
          state.isAuth = false;
        })

        .addCase(signUp.fulfilled, (state, action) => {
          state.error = action.payload;
          state.isAuth = true
        })

        .addCase(checkAuth.pending, (state) => {
          state.loading = true;
        })

        .addCase(getUser.pending, (state) => {
          state.loading = true;

        })

        .addCase(getUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.loading = false;
          state.isAuth = true;
        })

        .addCase(updateAvatar.pending, (state) => {
          state.loading = true;
        })
    },
});

export const {setLoading, setError} = userSlice.actions;
export default userSlice.reducer;
