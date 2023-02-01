import React from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  CardContent,
  CardMedia,
  TextField,
  Avatar,
  Modal,
} from '@mui/material';
import { PostI } from '../../store/types/post';
import CustomDotMenu from '../CustomDotMenu';
import CustomModal from '../CustomModal';
import { useAppDispatch } from '../../store/hooks';
import { deletePost } from '../../store/actionCreators/post';
import PostForm from './PostForm';
import PhotoIcon from '@mui/icons-material/Photo';
import EditPostForm from './EditPostForm';

interface PropsI {
  item: PostI;
}

const Post: React.FC<PropsI> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [readMode, setReadMode] = React.useState<boolean>(false);
  const [editMode, setEditMode] = React.useState<boolean>(false);

  console.log();

  const handleReadMode = () => {
    setReadMode(!readMode);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleOptions = (option: any) => {
    if (option === 'Delete') {
      dispatch(deletePost({ postId: item.id, uid: item.uid, withImg: Boolean(item.postImgUrl)}));
    } else if (option === 'Edit') {
      setEditMode(!editMode);
    }
  };

  return (
    <Grid
      xs={12}
      md={6}
      lg={4}
      xl={4}
      item
      display={'flex'}
      justifyContent="center"
      justifySelf={'center'}
      alignItems="flex-start">
      <Card sx={{ width: 345, mb: '50px' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar srcSet={item.user.avatarUrl} variant="circular" />
          <Typography ml={'10px'} fontWeight={600}>
            {item.user.name}
          </Typography>
        </CardContent>
        {item.postImgUrl && <CardMedia component="img" height="240" image={item.postImgUrl} />}
        <CardContent sx={{ pt: 0, pb: 0 }}>
          <Box mt={'10px'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography
              mb={'8px'}
              fontSize={'24px'}
              fontWeight={'600'}
              sx={{ color: '#101828', wordBreak: 'break-all' }}
              gutterBottom
              variant="h3"
              component="div">
              {item.title}
            </Typography>

            <CustomDotMenu handleBack={handleOptions} />
          </Box>
          <Typography
            sx={{ color: '#475467' }}
            fontSize={'16px'}
            variant="body2"
            color="text.secondary">
            {item.desc}
          </Typography>
        </CardContent>
        <Button size="small" color="primary" onClick={() => handleReadMode()}>
          Read
        </Button>

        {readMode && (
          <CustomModal handleOpen={handleReadMode} open={readMode}>
            {item.postImgUrl && (
              <CardMedia
                sx={{ borderRadius: '5px' }}
                component="img"
                height="240"
                image={item.postImgUrl}
              />
            )}
            <Typography
              mb={'8px'}
              mt={'8px'}
              fontSize={'24px'}
              fontWeight={'600'}
              sx={{ color: '#101828', wordBreak: 'break-all' }}
              gutterBottom
              variant="h3"
              component="div">
              {item.title}
            </Typography>

            <Typography
              sx={{ color: '#475467' }}
              fontSize={'16px'}
              variant="body2"
              color="text.secondary">
              {item.desc}
            </Typography>
          </CustomModal>
        )}

        {editMode && (
          <CustomModal handleOpen={handleEditMode} open={editMode}>
            <EditPostForm handleEditMode={handleEditMode} postData={item} />
          </CustomModal>
        )}
      </Card>
    </Grid>
  );
};

export default Post;
