import React from 'react';
import { Typography, Box, CircularProgress, Grid } from '@mui/material';
import Post from './Post';
import { useAppSelector } from '../../store/hooks';

const MyPosts: React.FC = () => {
    const {loading, userPosts} = useAppSelector(state => state.postsSlice);

  return (
    <Box sx={{position: 'relative'}}>
      <Typography textAlign={'center'} fontSize={'30px'} fontWeight={'600'} marginBottom={'40px'}>
        My Posts
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', position: 'absolute', left: '50%', top: '10%', transform: 'translate(-50%, -50%)'}}>
          <CircularProgress />
        </Box>
      )}

      <Grid container justifySelf={'center'} justifyContent={'start'} columns={12}>
        {userPosts?.map((post) => (
          <Post item={post} key={post.id} />
        ))}
      </Grid>
    </Box>
  );
};

export default MyPosts;
