import './Main.scss';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import house from '../../Images/house-icon.png';
import add from '../../Images/success.svg';

export function Main({ open }) {
  const { register, isAuth, currentUser } = useSelector((state) => state.user);

  const houseAnimation = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 100,
      y: 100,
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
  };
  const addUserAnimation = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
  };

  return (
    <motion.main
      initial="hidden"
      whileInView={open ? 'visible' : 'hidden'}
      className={cn('main__container', { fon: isAuth })}>
      <motion.img
        className="main__house-img"
        variants={houseAnimation}
        src={house}
        alt="house"
        width="300"
      />
      {isAuth && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 400 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          className="main__auth">
          <h2>Page for authorized users</h2>
          <span>
            Welcome dear {currentUser.FirstName} {currentUser.LastName}
          </span>
        </motion.div>
      )}
      {register && (
        <motion.div
          className="addUser"
          initial="hidden"
          whileInView={register ? 'visible' : 'hidden'}>
          <motion.p variants={addUserAnimation}>You have successfully registered</motion.p>
          <motion.p variants={addUserAnimation}>Please login</motion.p>
          <motion.img variants={addUserAnimation} src={add} alt="register" width="100" />
        </motion.div>
      )}
    </motion.main>
  );
}
