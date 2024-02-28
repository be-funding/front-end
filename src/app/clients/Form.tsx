// @packages
import * as React from 'react';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// @interfaces
interface FormProps {
  closeForm: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('El email no es válido').required('El email es obligatorio'),
  country: yup.string(),
  last_name: yup.string().required('El apellido es obligatorio'),
  phone_number: yup.string(),
});

export default function Form({ closeForm }: FormProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (formData) =>
      await axios.post('https://back-end-orpin-psi.vercel.app/api/clients', formData),
    onSuccess: () => {
      queryClient.invalidateQueries('clients' as any);
    }
  });
  
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      name: '',
      email: '',
      country: '',
      last_name: '',
      phone_number: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values as any);
      closeForm();
    },
  });

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Creación de nuevo usuario
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography gutterBottom>
              Nombre*
            </Typography>
            <TextField
              fullWidth
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              placeholder="Ingresa el nombre"
              size="small"
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <Typography gutterBottom>
              Email*
            </Typography>
            <TextField
              fullWidth
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              placeholder="Ingresa el email"
              size="small"
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <Typography gutterBottom>
              País
            </Typography>
            <TextField
              fullWidth
              id="country"
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              placeholder="Ingresa el país"
              size="small"
              sx={{ mb: 5 }}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ mr: 2 }}
            >
              Crear
            </Button>
            <Button
              color="info"
              onClick={closeForm}
              variant="contained"
            >
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>
              Apellido*
            </Typography>
            <TextField
              fullWidth
              id="last_name"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              error={formik.touched.last_name && Boolean(formik.errors.last_name)}
              helperText={formik.touched.last_name && formik.errors.last_name}
              placeholder="Ingresa el apellido"
              size="small"
              sx={{ mb: 2 }}
              variant="outlined"
            />
            <Typography gutterBottom>
              Número de teléfono
            </Typography>
            <TextField
              fullWidth
              id="phone_number"
              name="phone_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              placeholder="Ingrese el número"
              size="small"
              sx={{ mb: 2 }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
