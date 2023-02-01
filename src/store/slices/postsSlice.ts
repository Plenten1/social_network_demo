
import { createSlice } from '@reduxjs/toolkit';
import { deletePost, editPost, getUserPost } from '../actionCreators/post';
import { PostI } from './../types/post';
import { createPost } from './../actionCreators/post';

interface PostsStateI{
    userPosts: PostI[] | null
    error: string | null
    loading: boolean
    limit: number,
    lastPost: any 
}

const initialState: PostsStateI = {
    userPosts: null,
    error: null,
    loading: false,
    limit: 3,
    lastPost: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLastPost(state, action) {
            state.lastPost = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUserPost.pending, (state) => {
                state.loading = true;
            })

            .addCase(getUserPost.fulfilled, (state, action) => {
                state.userPosts = action.payload;
                state.loading = false;
            })

            .addCase(getUserPost.rejected, (state, action) => {
                state.error = action.payload!;
                state.loading = false;
            })
            
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })

            .addCase(editPost.pending, (state) => {
                state.loading = true;
            })
    },
})

export const {setLastPost} = postsSlice.actions;
export default postsSlice.reducer;