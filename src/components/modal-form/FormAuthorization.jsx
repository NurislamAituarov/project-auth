import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, TextField } from '@mui/material';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { motion } from 'framer-motion';

import CheckboxContainer from './components/Checkbox';
import ContainedButtons from '../contained-buttons';
import ClearForm from './components/ClearForm';
import { Eye } from './components/Eye';
import { setUser } from '../../store/actions';
import { logInUser } from '../../api/client';
import { loginValidation } from './validation';

export function FormAuthorization({ setOpen }) {
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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (agree) {
      setLoading(true);
      logInUser(data)
        .then((res) => {
          reset();
          setOpen(false);
          localStorage.setItem('token', res.data.token);
          dispatch(setUser(res.data.user));
          setShowPassword(false);
        })
        .catch((err) => {
          setLoading(false);
          setError({ stage: true, errorItem: err.response.data.massage });
        });
    } else {
      setError({ stage: true, errorItem: 'You must consent' });
    }
  };
  const { errors } = useFormState({ control });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
      {error.stage && (
        <motion.h3
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          className="error__server">
          {error.errorItem}
        </motion.h3>
      )}
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
      {!loading ? (
        <ContainedButtons
          title="Log in"
          fullWidth={true}
          size="large"
          formBTN={true}
          type="submit"
        />
      ) : (
        <div style={{ textAlign: 'center', height: '45px', marginBottom: '5px' }}>
          <CircularProgress />
        </div>
      )}
    </form>
  );
}
