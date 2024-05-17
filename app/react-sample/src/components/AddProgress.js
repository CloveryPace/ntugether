import React, { useState } from 'react';
import { Typography, IconButton, Checkbox, FormControlLabel, TextField, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon
import Stack from '@mui/material/Stack';

const AddProgress = () => {
  // Adjusted to match the data model
  const [items, setItems] = useState([{ name: '', time_to_finished: '', need_activity: false }]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddClick = () => {
    setItems([...items, { name: '', time_to_finished: '', need_activity: false }]);
  };

  const handleDeleteClick = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleNumberInput = (event) => {
    return event.target.value.replace(/\D/g, '');
  };

  const handleNeedActivityChange = (index) => {
    const newItems = [...items];
    newItems[index].need_activity = !newItems[index].need_activity;
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2
          }}
        >
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="h6" sx={{ minWidth: '30px' }}>{index + 1}.</Typography>
            {items.length > 1 && (
                <IconButton onClick={() => handleDeleteClick(index)}>
                <DeleteIcon />
                </IconButton>
            )}
        </Stack>
          <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}
          >
            <TextField
                sx={{ flex: 4 }}
                label="進度名稱"
                variant="outlined"
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
            />
            <TextField
                sx={{ flex: 1 }}
                label="次數"
                variant="outlined"
                value={item.time_to_finished}
                onChange={(e) => handleChange(index, 'time_to_finished', handleNumberInput(e))}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={item.need_activity}
                    onChange={() => handleNeedActivityChange(index)}
                    name="need_activity"
                />
                }
                label="需要揪團"
            />
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          新增進度項目
        </Button>
      </Box>
    </div>
  );
};

export default AddProgress; 
