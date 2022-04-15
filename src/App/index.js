import { useState } from 'react';
import { Header } from '../Components/Header';
import { Main } from '../Components/Main';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header open={open} setOpen={setOpen} />
      <Main open={open} setOpen={setOpen} />
    </>
  );
}

export default App;
