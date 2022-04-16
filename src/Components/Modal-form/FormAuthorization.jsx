import { TextField } from '@mui/material';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { logInUser } from '../../Api/client';
import { setUser } from '../../Actions';
import ContainedButtons from '../ContainedButtons';
import { loginValidation } from './validation';
import ClearForm from './form-components/ClearForm';
import { Eye } from './form-components/Eye';
import CheckboxContainer from './form-components/Checkbox';

export function FormAuthorization({ setOpen, showPassword, setShowPassword }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      Email: '',
      Password: '',
    },
  });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState({
    stage: false,
    errorItem: '',
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (agree) {
      logInUser(data)
        .then((res) => {
          reset();
          setOpen(false);
          localStorage.setItem('token', res.data.token);
          dispatch(setUser(res.data.user));
          setShowPassword(false);
        })
        .catch((err) => {
          setError({ stage: true, errorItem: err.response.data.massage });
          console.error(err.response);
        });
    } else {
      setError({ stage: true, errorItem: 'You must consent' });
    }
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
      <div className="password__container">
        <div onClick={() => setShowPassword(!showPassword)} className="password__eye">
          <Eye visible={showPassword} />
        </div>
        <Controller
          control={control}
          name="Password"
          rules={{ required: 'Required to fill' }}
          render={({ field }) => (
            <TextField
              fullWidth
              type={!showPassword ? 'password' : 'text'}
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
      </div>
      <ClearForm reset={reset} />
      <CheckboxContainer agree={agree} setAgree={setAgree} />
      <ContainedButtons title="Log in" fullWidth={true} size="large" formBTN={true} type="submit" />
    </form>
  );
}
