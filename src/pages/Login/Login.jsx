import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getLogin } from '../../api_calls/login';

const theme = createTheme();

export const Login = () => {

  const navigate = useNavigate();
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    getLogin( name, password ).then(data=>{ 
      if(!data.Error){
        localStorage.setItem('user-lab', JSON.stringify(data));
        navigate('/');
      }else{
        setError(data.Error);
      }
     });
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(text) => setName(text.target.value) }
              id="email"
              label="Usuario"
              name="Usuario"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(text) => setPassword(text.target.value) }
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
          {
            error && (<Alert severity="error">{error}</Alert>) }
        </Box>
      </Container>
    </ThemeProvider>
  );
}