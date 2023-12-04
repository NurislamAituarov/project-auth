import { TextField } from '@mui/material';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { motion } from 'framer-motion';

import ClearForm from './components/ClearForm';
import ContainedButtons from '../contained-buttons';
import { Eye } from './components/Eye';
import { loginValidation, passwordValidation } from './validation';
import { createUser } from '../../api/client';
import { registerSuccessfully } from '../../store/actions';

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
  const [showPassword, setShowPassword] = useState(false);
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
        {error.stage && (
          <motion.h3
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="error__server">
            {error.errorItem}
          </motion.h3>
        )}
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
        <div className="password__container">
          <div onClick={() => setShowPassword(!showPassword)} className="password__eye">
            <Eye visible={showPassword} />
          </div>
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
                type={!showPassword ? 'password' : 'text'}
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.Password?.message}
                helperText={errors.Password?.message}
              />
            )}
          />
        </div>

        <ClearForm reset={reset} />
        <ContainedButtons
          title="Create account"
          fullWidth={true}
          size="large"
          type="submit"
          formBTN="true"
        />
      </form>
    </>
  );
}
