import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, getCountFromServer, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, auth, storage } from '../../firebase-config';
import { setLoading } from '../slices/usersSlice';
import { UserI } from './../types/user';

export const getUser = createAsyncThunk<UserI | null, { uid: string | null }>(
  'user/getUser',
  async (data, { rejectWithValue, fulfillWithValue }) => {

    if (data.uid === null) {
      return null;
    }

    try {
      const getUserData = await getDoc(doc(db, 'users', data.uid!));

      const { email, avatarUrl, userName, avatarName, numberOfPosts } = getUserData.data()!;

      return fulfillWithValue({ email, avatarUrl, userName, uid: getUserData.id, avatarName, numberOfPosts });
    } catch (error) {

      console.log('error in getUser', error);
      return rejectWithValue(null);
    }

  },
);

export const signIn = createAsyncThunk<
  null | string,
  { email: string; password: string },
  { rejectValue: string }
>('user/signIn', async (data, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const userCrede = await signInWithEmailAndPassword(auth, data.email, data.password);

    dispatch(getUser({ uid: userCrede.user.uid }));

    return fulfillWithValue(null);
  } catch (error) {

    console.log('error in sign In', error);
    return rejectWithValue('Email or password incorrect');
  }
});

export const signUp = createAsyncThunk<
  null | string,
  { email: string; userName: string; password: string },
  { rejectValue: string }
>('user/signUp', async (data, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {

    let checkName: null | string;
    const defaultAvatarUrl = await getDownloadURL(ref(storage, 'global/defaultUserAvatar.png'));

    const docs = await getDocs(
      query(collection(db, 'users'), where('userName', '==', data.userName)),
    );

    docs.forEach((doc) => {
      checkName = doc.data().userName;
    });

    if (checkName!) {
      return rejectWithValue(`userName ${data.userName} already use`);
    } 
    else {
      const userCrede = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await setDoc(doc(db, 'users', userCrede.user.uid), {
        email: data.email,
        userName: data.userName,
        avatarUrl: defaultAvatarUrl,
        avatarName: 'defaultUserAvatar.png',
        numberOfPosts: 0
      });

      dispatch(getUser({ uid: userCrede.user.uid }));
      return fulfillWithValue(null);
    }
  } catch (error) {

    console.log('error in signUp', error);
    return rejectWithValue('This email already use');
  }
});

export const checkAuth = createAsyncThunk('user/auth', async (data, { dispatch }) => {
  onAuthStateChanged(auth, async (user) => {
    
    try {
      if (user) {
        dispatch(getUser({ uid: user.uid }));
      } 
      else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      
      console.log('error in checkAuth', error);
      return { error };
    }
  });
});

export const logOut = createAsyncThunk('user/logOut', async (data, { dispatch }) => {
  await signOut(auth);
  dispatch(getUser({ uid: null }));
});

export const updateAvatar = createAsyncThunk<null, {photo: any, uid: string, avatarName: string}>('user/updateAvatar', async (data, {dispatch, rejectWithValue, fulfillWithValue}) => {
  try {
    await uploadBytes(ref(storage, `users/${data.uid}/avatar/${data.photo.name}`), data.photo);
    const avatarUrl = await getDownloadURL(ref(storage, `users/${data.uid}/avatar/${data.photo.name}`));

    if(data.avatarName !== 'defaultUserAvatar.png'){
      await deleteObject(ref(storage, `users/${data.uid}/avatar/${data.avatarName}`));
    }

    await updateDoc(doc(db, 'users', data.uid), {avatarUrl, avatarName: data.photo.name});

    const posts = await getDocs(query(collection(db, 'posts'), where('uid', '==', data.uid)));
    posts.forEach(async (post) => {
      await updateDoc(doc(db, 'posts', post.id), {user: {avatarUrl}});
    })
    dispatch(getUser({uid: data.uid}));

    return fulfillWithValue(null);
  } catch (error) {
    console.log('error in updateAvatar', error);
    return rejectWithValue('something wrong');
  }
})

export const updateNumberOfPosts = createAsyncThunk<null, {uid: string}>('user/updateNumberOfPosts', async (data, {rejectWithValue, dispatch, fulfillWithValue}) => {
  try {
    const count = await getCountFromServer(query(collection(db, 'posts'), where('uid', '==', data.uid)));
    await updateDoc(doc(db, 'users', data.uid), {numberOfPosts: count.data().count});

    dispatch(getUser({uid: data.uid}));
    return fulfillWithValue(null);
  } catch (error) {
    console.log('error in update numbers of posts ', error)
    return rejectWithValue(error);

  }
})