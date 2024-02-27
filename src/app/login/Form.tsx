'use client'

// @packages
import * as React from 'react';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// @hooks
import useLoginData from '@/hooks/useLoginData';

export default function Form() {
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState(false);

  const { setLoginData } = useLoginData();

  const router = useRouter();

  const validationSchema = yup.object({
    username: yup.string().required('El usuario es requerido'),
    password: yup.string().required('La contraseña es requerida')
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await axios.post('http://localhost:8080/api/login', formData);

        if (response.status === 200) {
          await setLoginData({ token: response.data.token, username: username });
          await router.push('/clients');
        }
      } catch (error) {
        setError(true);
      }
    }
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      mutation.mutate(values as any);
      setUsername(values.username);
    },
  });

  return (
    <Box
      component="form"
      sx={{ py: 3, px: 4 }}
      onSubmit={formik.handleSubmit}
    >
      <Typography
        component="h1" 
        fontWeight={600}
        sx={{ mb: 0 }}
        variant="h4"
      >
        Ingreso
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Entre a su cuenta usando sus credenciales
      </Typography>
      <Box sx={{ py: 2 }}>
        <Typography fontWeight={600}>
          Email
        </Typography>
          <TextField
            error={formik.touched.username && Boolean(formik.errors.username)}
            fullWidth
            helperText={formik.touched.username && formik.errors.username}
            id="username"
            onChange={formik.handleChange}
            placeholder="Inserte su usuario"
            size='small'
            value={formik.values.username}
            variant="outlined"
          />
      </Box>
      <Box>
        <Typography fontWeight={600}>
          Contraseña
        </Typography>
        <TextField
          autoComplete="on"
          error={formik.touched.password && Boolean(formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          id="password" 
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder="Inserte su contraseña" 
          size='small'
          type="password"
          value={formik.values.password}
          variant="outlined"
        />
      </Box>
      {error && (
        <Typography color='error'>
          Usuario o contraseña incorrectos
          </Typography>
      )}
      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: grey[900],
          color: 'white',
          mt: 3
        }}
      >
        Ingresar
      </Button>
    </Box>
  );
}
