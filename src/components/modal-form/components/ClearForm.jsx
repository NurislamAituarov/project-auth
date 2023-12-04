import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClearForm({ reset }) {
  const handleClick = () => {
    reset();
  };

  const handleDelete = () => {
    reset();
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        sx={{ borderRadius: '5px' }}
        label="Clear form"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
    </Stack>
  );
}
