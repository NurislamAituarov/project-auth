import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Header } from '../components/header';
import { Main } from '../components/main';
import { auth } from '../store/actions';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(auth());
    }
  }, []);

  return (
    <>
      <Header open={open} setOpen={setOpen} />
      <Main open={open} setOpen={setOpen} />
    </>
  );
}

export default App;
