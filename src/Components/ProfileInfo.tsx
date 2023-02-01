import React from 'react';
import { Grid, Box, Avatar, Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import { AddPhotoAlternate } from '@mui/icons-material';
import { updateAvatar } from '../store/actionCreators/user';
import { useAppDispatch } from './../store/hooks';
import { isTemplateExpression } from 'typescript';

const ProfileInfo: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const [iconPhotoVisible, setIconPhotoVisible] = React.useState(false);

  return (
    <Box display={'flex'} position={'relative'}>
      <div
        onMouseEnter={() => setIconPhotoVisible(true)}
        onMouseLeave={() => setIconPhotoVisible(false)}>
        <Avatar
          sx={{ width: '70px', height: '70px' }}
          src={user?.avatarUrl}
          variant="rounded"></Avatar>
      </div>

      {iconPhotoVisible && (
        <div
          style={{ position: 'absolute', left: '0px', top: '0px' }}
          onMouseEnter={() => setIconPhotoVisible(true)}
          onMouseLeave={() => setIconPhotoVisible(false)}>
          <Box sx={{ background: 'black', opacity: '0.7' }}>
            <label htmlFor="selectFile">
              <AddPhotoAlternate sx={{ fill: 'white' }} />
            </label>
            <input
              onChange={(e) =>
                dispatch(
                  updateAvatar({
                    photo: e.currentTarget.files![0],
                    uid: user?.uid!,
                    avatarName: user?.avatarName!,
                  }),
                )
              }
              type="file"
              id="selectFile"
              style={{ display: 'none' }}
            />
          </Box>
        </div>
      )}

      <Box sx={{ paddingLeft: '20px' }}>
        <Typography fontSize={'30px'} variant="h2">
          {user?.userName}
        </Typography>
        <Typography variant="body1">likes</Typography>
        <Typography variant="body1">Posts - {user?.numberOfPosts}</Typography>
      </Box>
      
    </Box>
  );
};

export default ProfileInfo;
