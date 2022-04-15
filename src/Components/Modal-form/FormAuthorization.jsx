import { TextField } from '@mui/material';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { logInUser } from '../../Api/client';
import { setUser } from '../../Actions';
import ContainedButtons from '../ContainedButtons';
import { loginValidation } from './validation';
import { useState } from 'react';
import ClearForm from './ClearForm';

export function FormAuthorization({ setOpen }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      Email: '',
      Password: '',
    },
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({
    stage: false,
    errorItem: '',
  });

  const onSubmit = (data) => {
    logInUser(data)
      .then((res) => {
        reset();
        setOpen(false);
        localStorage.setItem('token', res.data.token);
        dispatch(setUser(res.data.user));
      })
      .catch((err) => {
        setError({ stage: true, errorItem: err.response.data.massage });
        console.error(err.response);
      });
  };
  const { errors } = useFormState({ control });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
      {error.stage && <h3 style={{ color: 'red', marginBottom: '20px' }}>{error.errorItem}</h3>}
      <Controller
        control={control}
        name="Email"
        rules={loginValidation}
        render={({ field }) => (
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            onChange={(e) => field.onChange(e)}
            value={field.value}
            error={!!errors.Email?.message}
            helperText={errors.Email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="Password"
        rules={{ required: 'Required to fill' }}
        render={({ field }) => (
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            onChange={(e) => field.onChange(e)}
            value={field.value}
            error={!!errors.Password?.message}
            helperText={errors.Password?.message}
          />
        )}
      />
      <ClearForm reset={reset} />
      <ContainedButtons title="Log in" fullWidth={true} size="large" formBTN={true} type="submit" />
    </form>
  );
}
