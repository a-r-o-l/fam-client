import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export const AlertDialog = ({
  open,
  handleClose,
  title,
  text,
  acceptTitle = "Ok",
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={onConfirm} autoFocus>
          {acceptTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
