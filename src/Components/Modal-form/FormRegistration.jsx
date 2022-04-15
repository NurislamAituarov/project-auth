import { TextField } from '@mui/material';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import ContainedButtons from '../ContainedButtons';
import { loginValidation, passwordValidation } from './validation';
import { registerSuccessfully } from '../../Actions';
import { createUser } from '../../Api/client';
import { useState } from 'react';
import ClearForm from './ClearForm';

export function FormRegistration({ setOpen, setModal }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
    },
  });
  const [error, setError] = useState({
    stage: false,
    errorItem: '',
  });
  const { errors } = useFormState({ control });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    createUser(data)
      .then((res) => {
        dispatch(registerSuccessfully(true));
        setOpen(false);
        reset();
        setTimeout(() => {
          setModal('log in');
          setOpen(true);
          dispatch(registerSuccessfully(false));
        }, 2000);
      })
      .catch((err) => {
        console.error(err.response);
        setError({ stage: true, errorItem: err.response.data.massage });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <div className="modal__input-names flex">
          <Controller
            control={control}
            name="FirstName"
            rules={{ required: 'Required to fill' }}
            render={({ field }) => (
              <TextField
                fullWidth={true}
                label="First Name"
                variant="outlined"
                color="success"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.FirstName?.message}
                helperText={errors.FirstName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="LastName"
            rules={{ required: 'Required to fill' }}
            render={({ field }) => (
              <TextField
                fullWidth={true}
                label="Last Name"
                variant="outlined"
                color="success"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.LastName?.message}
                helperText={errors.LastName?.message}
              />
            )}
          />
        </div>
        {error.stage && (
          <h3 style={{ color: 'red', marginBottom: '20px', fontSize: '14px' }}>
            {error.errorItem}
          </h3>
        )}
        <Controller
          control={control}
          name="Email"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
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
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              margin="normal"
              fullWidth={true}
              label="Set a Password"
              variant="outlined"
              type="password"
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.Password?.message}
              helperText={errors.Password?.message}
            />
          )}
        />
        <ClearForm reset={reset} />
        <ContainedButtons
          title="Sign up"
          fullWidth={true}
          size="large"
          type="submit"
          formBTN="true"
        />
      </form>
    </>
  );
}
