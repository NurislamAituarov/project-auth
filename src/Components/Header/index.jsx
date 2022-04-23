import './Header.scss';
import { Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import ContainedButtons from '../ContainedButtons';
import { NestedModal } from '../Modal-form';
import { useEffect, useState } from 'react';

import { auth, logOut } from '../../Actions';
import { AvatarUser } from './components/Avatar';
import { HomeIcon } from './components/HomeIcon';
import { Skeleton } from '../Skeleton';

export function Header({ open, setOpen }) {
  const isAuth = useSelector((state) => state.user.isAuth);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(auth());
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="header__container flex">
        <motion.div
          initial={{ y: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          className="header__logo">
          <HomeIcon color={isAuth ? 'error' : 'primary'} sx={{ fontSize: 40 }} />
        </motion.div>

        {isAuth && (
          <div className="header__btns-login flex">
            <AvatarUser />
            <ContainedButtons title="log off" color="error" click={() => dispatch(logOut())} />
          </div>
        )}
        {!localStorage.getItem('token') && (
          <Stack direction="row" spacing={2}>
            <ContainedButtons
              title="sign up"
              click={() => {
                setModal('sign up');
                handleOpen();
              }}
            />
            <ContainedButtons
              title="log in"
              click={() => {
                setModal('log in');
                handleOpen();
              }}
            />
          </Stack>
        )}
        {!isAuth && localStorage.getItem('token') && <Skeleton />}
      </header>
      <NestedModal
        modal={modal}
        setModal={setModal}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </>
  );
}
