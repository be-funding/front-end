// @packages
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// @interfaces 
interface UploadFileProps {
  service: string
}

export default function UploadFile({ service }: UploadFileProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (formData) =>
      await axios.post(`https://back-end-nine-rho.vercel.app/api/${service}/excel`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries('clients' as any);
    }
  });

  const onDrop = React.useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    mutation.mutate(formData as any);
  }, []);
  
  const { getRootProps, getInputProps } = useDropzone({onDrop});

  return (
    <Box component="div" {...getRootProps()}>
      <Button
        color='error'
        sx={{ mr: 1 }}
        variant="contained"
    >
      <CloudUploadIcon />
      <input {...getInputProps()} />
    </Button>
    </Box>
  );
};
