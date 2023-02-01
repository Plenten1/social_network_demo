import React from 'react';
import { Box, Typography } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import { Opacity } from '@mui/icons-material';

interface PropsI {
  change: (file: any) => any;
  src?: string;
  inputRef: string;
}

const PhotoSelect: React.FC<PropsI> = ({ src, change, inputRef }) => {
  const [file, setFile] = React.useState<any>(null);
  const [hoverImg, setHoverImg] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (file) {
      change(file);
    }
  }, [file]);

  return (
    <Box>
      <input
        style={{ display: 'none' }}
        type={'file'}
        id={inputRef}
        accept={'image/png, image/jpeg'}
        onChange={(e) => setFile(e.currentTarget.files?.[0])}
      />

      <Box
        onMouseEnter={() => setHoverImg(true)}
        onMouseLeave={() => setHoverImg(false)}
        sx={{
          width: '230px',
          height: 'auto',
          minHeight: (file || src) ? '' : '170px',
          background: (file || src) ? '' : 'black',
          maxHeight: '500px',
          position: 'relative',
          mt: '20px',
          borderRadius: '10px'
        }}>
  
          {(hoverImg || !file) && (
            <Box component={'label'} sx={{position: 'absolute', left:'0', right: '0', width: '100%', height: '100%', zIndex: '100', background: 'black', opacity: '0.7', borderRadius: '10px' }} htmlFor={inputRef}>
              <PhotoIcon
                sx={{
                  zIndex: '1000',
                  fill: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: hoverImg ? '1' : '0.7',
                }}
              />
            </Box>
          )}   

        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt={'post'}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '10px'
            }}
          />
        ) : typeof src === 'string' ? (
          <img src={src} alt={'post'} style={{ width: '100%', height: 'auto', display: 'block',  borderRadius: '10px' }} />
        ) : null}
      </Box>
    </Box>
  );
};

export default PhotoSelect;
