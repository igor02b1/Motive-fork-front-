import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import api from '../../services/api';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import Navbar from '../../components/static/navbar';

type FormValues = {
  email: string
  senha: string
}

function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  async function handleLogin(data: FormValues) {
    try {
      const response = await api.post('auth/login', data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);

      navigate('/');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const res = error.response;
        if (res) {
          alert(res.data.message);
        }
      }
      console.log(error);
    }
  }

    return (
      <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ height: "100vh" }} className="imagem">

      <Navbar />

      <Grid xs={6}>

      </Grid>
      <Grid alignItems='center' xs={6}>
        <Box paddingX={20}>
          <form onSubmit={handleSubmit(handleLogin)} className="box-login">
            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="entrar-texto">LOGIN</Typography>
            <TextField {...register('email')} id='email' label='email' variant='outlined' name='email' margin='normal' fullWidth />
            <TextField {...register('senha')} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
            <Box marginTop={2} textAlign='center'>
              <Button type='submit' variant='contained' color='primary' className='botão-login'>
                Login
              </Button>
              <Box display='flex' justifyContent='center' marginTop={2}>
                <Box marginRight={1} className='boxteste'>
                  <Typography variant='subtitle1' gutterBottom align='center' className='txt3'>Não tem uma conta?</Typography>
                </Box>
                <Link to="/register">
                  <Typography variant='subtitle1' gutterBottom align='center' className='textos2'>Cadastre-se</Typography>
                </Link>
              </Box>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
    );
  }

  export default Login;