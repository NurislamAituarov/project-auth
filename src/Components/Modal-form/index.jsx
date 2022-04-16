import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './Modal.scss';

import ContainedButtons from '../ContainedButtons';
import { FormRegistration } from './FormRegistration';
import { FormAuthorization } from './FormAuthorization';

export function NestedModal({ open, setOpen, handleClose, handleOpen, modal, setModal }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isAuth = useSelector((state) => state.isAuth);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box className="form__container">
          <div className="auth__container flex">
            <ContainedButtons
              title="Sign up"
              color="success"
              disabled={modal === 'sign up' && true}
              click={() => setModal('sign up')}
            />
            <ContainedButtons
              title="Log in"
              color="success"
              disabled={modal === 'log in' && true}
              click={() => setModal('log in')}
            />
          </div>

          {modal === 'sign up' ? (
            <FormRegistration
              setOpen={setOpen}
              setModal={setModal}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : (
            <FormAuthorization
              setOpen={setOpen}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
          <div className="close">
            <ContainedButtons
              title="Close"
              color="error"
              click={() => setOpen(false)}
              fullWidth={true}
              size="large"
              formBTN="true"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
