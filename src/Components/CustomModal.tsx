import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  transition: 'all 0.3s linear'
};

interface PropsI{
    open: boolean
    handleOpen: () => void
    children: React.ReactNode
}

const CustomModal: React.FC<PropsI> = ({handleOpen, open, children}) => {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {children}
            <Box sx={{position: 'relative', height: '37px', marginTop: '10px'}}>   
                <Button variant='contained' sx={{position: 'absolute', right: '0px', bottom: '0px'}} onClick={handleOpen}>Close</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CustomModal;