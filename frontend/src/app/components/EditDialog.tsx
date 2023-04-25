import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

// Define the props interface
interface EditDialogProps {
  open: boolean;
  type: 'deposit' | 'expense';
  title: string;
  amount: number;
  onClose: () => void;
  onSave: () => void;
}

// Define the component
const EditDialog = (props: EditDialogProps) => {
  // Destructure the props
  const { open, type, title, amount, onClose, onSave } = props;

  // State for input fields
  const [editTitle, setEditTitle] = React.useState(title);
  const [editAmount, setEditAmount] = React.useState(amount);

  // Handle input changes
  const handleEditTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleEditAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditAmount(Number(event.target.value));
  };

  // Handle dialog close
  const handleClose = () => {
    onClose();
    setEditTitle(title);
    setEditAmount(amount);
  };

  // Handle dialog save
  const handleSave = () => {
    onSave();
    setEditTitle('');
    setEditAmount(0);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit {type}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={editTitle}
          onChange={handleEditTitleChange}
          sx={{ marginY: '0.5rem' }}
        />
        <TextField
          label="Amount"
          type="number"
          value={editAmount}
          onChange={handleEditAmountChange}
          sx={{ marginY: '0.5rem' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;