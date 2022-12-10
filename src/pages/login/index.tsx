import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import './Login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import api from '../../services/api';

type FormValues = {
  email: string
  senha: string
}

function Login() {
  const { register, handleSubmit } = useForm<FormValues>();

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
        <Grid className="container" sx={{ height: "calc(100vh - 140px)" }}>
          <div className="container-login">
            <div className="wrap-login">
              <form action="" className="login-form">
                
                <h1 className='login-title'>LOGIN</h1>

                <div className="wrap-input">
                  <input className="input" type="E-MAIL" />
                  <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                  <input className="input" type="SENHA" />
                  <span className="focus-input" data-placeholder="senha"></span>
                </div>

                <div className="container-login-btn">
                  <button className="login btn">LOGIN</button>
                </div>

                <div className="text-center">
                    <span className="txt1">não possui conta?</span>
                  <Link to="/register">
                    <span className="txt2">Cadatre-se</span>
                  </Link>
                </div>

              </form>
            </div>
          </div>
        </Grid>
    );
  }

  export default Login;