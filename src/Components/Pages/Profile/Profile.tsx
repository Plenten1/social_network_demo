import { Box, Button, Container } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { useAppDispatch } from '../../../store/hooks';
import { logOut } from '../../../store/actionCreators/user';
import ProfileInfo from '../../ProfileInfo';
import PostForm from './../../Posts/PostForm';
import { getUserPost } from '../../../store/actionCreators/post';
import MyPosts from '../../Posts/MyPosts';

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  const {userPosts} = useAppSelector(state => state.postsSlice);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log('render profile')
    if(!userPosts){
      dispatch(getUserPost({ uid: user?.uid! }));
      console.log('render posts')
    }
  }, []);

  return (
    <Container sx={{ maxWidth: '1440px !important', width: '100%' }}>
      <Box
        marginTop={{ xs: '30px', sm: '70px' }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <ProfileInfo />
        <Button
          onClick={() => dispatch(logOut())}
          sx={{ height: '37px', width: 'auto' }}
          variant="contained">
          Log Out
        </Button>
      </Box>
      <PostForm />
      <MyPosts/>
    </Container>
  );
};

export default Profile;
