import React from 'react';
import { Typography, TextField, Box, Button } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import { useAppDispatch, useAppSelector } from './../../store/hooks';
import { createPost, editPost } from './../../store/actionCreators/post';
import { PostI } from '../../store/types/post';
import PhotoSelect from './../PhotoSelect';

interface PropsI{
  postData: PostI;
  handleEditMode: any;
}

interface FormDataI{
  title: string | null;
  desc: string | null;
  photo: any | null;
}

const EditPostForm: React.FC<PropsI> = ({postData, handleEditMode}) => {
  const [formData, setFormData] = React.useState<FormDataI>({title: postData.title, desc: postData.desc, photo: postData.postImgUrl});
  const dispatch = useAppDispatch();

  const handleEditPost = () => {
    console.log('edit post');
    dispatch(editPost({postId: postData.id, uid: postData.uid, desc: formData.desc!, title: formData.title!, photo: formData.photo}));
    handleEditMode();
  }

  const handlePhotoChange = (photo: any) => {
    setFormData({...formData, photo: photo})
  }

  return (
    <Box component={'form'} marginTop={'30px'} marginBottom={'80px'}>
      <Typography>Edit Post</Typography>
      <TextField
        sx={{ marginTop: '30px', marginBottom: '15px' }}
        fullWidth
        variant="outlined"
        value={formData?.title || ''}
        onChange={(e) => setFormData({ ...formData!, title: e.target.value })}
        label={'Title'}
      />

      <TextField
        rows={3}
        multiline
        fullWidth
        variant="outlined"
        value={formData?.desc || ''}
        onChange={(e) => setFormData({ ...formData!, desc: e.target.value })}
        label={'Description'}
      />

      <Box display={'flex'} alignItems={'start'}>
        <PhotoSelect inputRef='editImg' change={handlePhotoChange} src={postData.postImgUrl}/>

        <Button
          sx={{ float: 'right', mt: '20px', ml: '20px' }}
          variant="contained"
          onClick={handleEditPost}>
            Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditPostForm;
