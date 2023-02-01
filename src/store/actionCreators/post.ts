import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadBytes, getDownloadURL, ref, deleteObject } from 'firebase/storage';
import { storage, db } from './../../firebase-config';
import {
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
  getDoc,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  getCountFromServer,
} from 'firebase/firestore';
import { PostI } from '../types/post';
import { updateNumberOfPosts } from './user';

export const createPost = createAsyncThunk<
  null,
  {
    title: string;
    desc: string;
    uid: string;
    postImg?: any;
    userName: string;
    userAvatarUrl: string;
  }
>('post/create', async (data, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    const postResponce = await addDoc(collection(db, 'posts'), {
      title: data.title,
      desc: data.desc,
      uid: data.uid,
      user: {
        avatarUrl: data.userAvatarUrl,
        name: data.userName,
      },
      createdAt: serverTimestamp(),
    });

    if (data.postImg) {
      await uploadBytes(ref(storage, `users/${data.uid}/posts/${postResponce.id}`), data.postImg);

      const postImgUrl = await getDownloadURL(
        ref(storage, `users/${data.uid}/posts/${postResponce.id}`),
      );

      await updateDoc(doc(db, 'posts', postResponce.id), { postImgUrl: postImgUrl });
    }

    await dispatch(updateNumberOfPosts({uid: data.uid}))
    dispatch(getUserPost({ uid: data.uid }));

    return fulfillWithValue(null);
  } catch (error) {
    console.log('error in create post', error);
    return rejectWithValue('some error');
  }
});

export const getUserPost = createAsyncThunk<
  PostI[] | null,
  { uid: string },
  { rejectValue: string }
>('posts/getUserPost', async (data, { fulfillWithValue, dispatch, rejectWithValue }) => {
  try {
    const posts: PostI[] = [];
    const getPosts = await getDocs(
      query(collection(db, 'posts'), where('uid', '==', data.uid), orderBy('createdAt', 'desc')),
    );


    getPosts.forEach((doc) => {
      const { uid, title, desc, createdAt, user, postImgUrl } = doc.data();

      posts.push({ uid, title, desc, user, createdAt: createdAt.to, postImgUrl, id: doc.id });
    });

    return fulfillWithValue(posts);
  } catch (error) {
    console.log('error in getUserPost', error);
    return rejectWithValue('some error');
  }
});

export const deletePost = createAsyncThunk<
  null,
  { uid: string; postId: string; withImg: boolean },
  { rejectValue: string }
>('posts/deletePost', async (data, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    await deleteDoc(doc(db, 'posts', data.postId));

    if (data.withImg) {
      await deleteObject(ref(storage, `users/${data.uid}/posts/${data.postId}`));
    }

    await dispatch(updateNumberOfPosts({uid: data.uid}))
    dispatch(getUserPost({ uid: data.uid }));

    return fulfillWithValue(null);
  } catch (error) {
    console.log('error in delete post', error);
    return rejectWithValue('some error');
  }
});

export const editPost = createAsyncThunk<
  null,
  { uid: string; postId: string; title: string; desc: string; photo: any },
  { rejectValue: string }
>('posts/editPost', async (data, { dispatch, rejectWithValue, fulfillWithValue }) => {
  try {
    if (typeof data.photo !== 'string') {
      await uploadBytes(ref(storage, `users/${data.uid}/posts/${data.postId}`), data.photo);
      const postUrl = await getDownloadURL(ref(storage, `users/${data.uid}/posts/${data.postId}`));

      await updateDoc(doc(db, 'posts', data.postId), { postImgUrl: postUrl });
    }

    await updateDoc(doc(db, 'posts', data.postId), { title: data.title, desc: data.desc });
    dispatch(getUserPost({ uid: data.uid }));

    return fulfillWithValue(null);
  } catch (error) {
    console.log('error in editPost', error);
    return rejectWithValue('some error');
  }
});
