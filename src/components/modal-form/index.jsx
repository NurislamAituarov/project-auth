import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ContainedButtons from '../contained-buttons';
import { FormRegistration } from './FormRegistration';
import { FormAuthorization } from './FormAuthorization';
import './Modal.scss';

export function NestedModal({ open, setOpen, handleClose, handleOpen, modal, setModal }) {
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
              disabled={modal === 'sign up'}
              click={() => setModal('sign up')}
            />
            <ContainedButtons
              title="Log in"
              color="success"
              disabled={modal === 'log in'}
              click={() => setModal('log in')}
            />
          </div>
          {modal === 'sign up' ? (
            <FormRegistration setOpen={setOpen} setModal={setModal} />
          ) : (
            <FormAuthorization setOpen={setOpen} />
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
