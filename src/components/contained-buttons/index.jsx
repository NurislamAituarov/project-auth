import * as React from 'react';
import Button from '@mui/material/Button';

export default function ContainedButtons({
  title,
  click,
  fullWidth,
  type,
  formBTN,
  color,
  disabled,
}) {
  return (
    <Button
      disabled={disabled}
      sx={formBTN && { marginTop: '10px', height: '60px', letterSpacing: '2px' }}
      type={type}
      color={color}
      fullWidth={fullWidth}
      onClick={click}
      variant="contained">
      {title}
    </Button>
  );
}
