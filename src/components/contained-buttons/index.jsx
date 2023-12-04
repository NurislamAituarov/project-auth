import * as React from 'react';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

export default function ContainedButtons({
  title,
  click,
  fullWidth,
  type,
  formBTN,
  color,
  disabled,
  loading,
}) {
  return (
    <Button
      disabled={disabled}
      sx={
        formBTN && {
          marginTop: '10px',
          height: '60px',
          letterSpacing: '2px',
          display: 'flex',
          alignItems: 'center',
        }
      }
      type={type}
      color={color}
      fullWidth={fullWidth}
      onClick={click}
      variant="contained">
      {!loading ? title : <CircularProgress size={30} color="info" />}
    </Button>
  );
}
