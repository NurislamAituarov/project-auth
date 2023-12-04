import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxContainer({ agree, setAgree }) {
  const handleChange = (event) => {
    setAgree((agree) => (agree = event.target.checked));
  };

  return (
    <>
      <FormControlLabel
        sx={{ color: 'black' }}
        control={<Checkbox checked={agree} onChange={handleChange} name="agree" />}
        label="Remember me"
      />
    </>
  );
}
