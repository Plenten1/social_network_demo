import React from 'react';
import { Avatar, Box, Container, CssBaseline, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signUp } from './../../../store/actionCreators/user';
import { setError } from '../../../store/slices/usersSlice';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.userSlice);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      signUp({
        email: String(data.get('email')),
        userName: String(data.get('userName')),
        password: String(data.get('password')),
      }),
    );
  };

  React.useEffect(() => {
    if (error !== null && loading === false) {
      setTimeout(() => alert(error), 300);
      dispatch(setError(null));
    }
  }, [error]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            id="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="userName"
            label="Username"
            type="text"
            id="userName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button type='submit' fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Button variant="contained" sx={{ float: 'right' }}>
            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/signin'}>
              Sign In
            </Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
