import React, { FormEvent } from 'react';
import { Typography, TextField, Box, Button } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import { useAppDispatch, useAppSelector } from './../../store/hooks';
import { createPost } from './../../store/actionCreators/post';
import PhotoSelect from '../PhotoSelect';

interface formDataI{
  title: string | null;
  desc: string | null;
  photo: any;
}

const PostForm: React.FC = () => {
  const [formData, setFormData] = React.useState<formDataI>({title: null, desc: null, photo: null});
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      createPost({
        title: formData?.title!,
        desc: formData?.desc!,
        postImg: formData?.photo!,
        uid: user?.uid!,
        userName: user?.userName!,
        userAvatarUrl: user?.avatarUrl!,
      }),
    )

    setFormData({desc: null, photo: null, title: null})
  }

  const handleChangePhoto = (photo: any) => {
    setFormData({...formData, photo: photo})
  }

  return (
    <Box component={'form'} onSubmit={(e) => handleCreatePost(e)} marginTop={'30px'} marginBottom={'80px'}>
      <Typography>New Post</Typography>
      <TextField
        sx={{ marginTop: '30px', marginBottom: '15px' }}
        fullWidth
        variant="outlined"
        value={formData?.title || ''}
        onChange={(e) => setFormData({ ...formData!, title: e.target.value })}
        label={'Title'}
        required
      />

      <TextField
        rows={3}
        multiline
        fullWidth
        variant="outlined"
        value={formData?.desc || ''}
        onChange={(e) => setFormData({ ...formData!, desc: e.target.value })}
        label={'Description'}
        required
      />

      <Box display={'flex'} alignItems={'start'}>
        <PhotoSelect change={handleChangePhoto} inputRef='postImg' />

        <Button
          type='submit'
          sx={{ float: 'right', mt: '20px', ml: '20px' }}
          variant="contained">
          Add Post
        </Button>
      </Box>
    </Box>
  );
};

export default PostForm;
