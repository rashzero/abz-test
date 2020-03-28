import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import './scss/buttonAndDialog.scss';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ButtonAndDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    const registrationStatus = props.hendleRegistration();
    if (registrationStatus) {
      setOpen(registrationStatus)
    }
  };
  const handleClose = () => {
    setOpen(false);
    props.getUsersRequest();
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <span className='button__span'>Sing up now</span>
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Congratulations
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You have successfully passed the registration
          </Typography>
        </DialogContent>
        <DialogActions>
          <button className='form__button' onClick={handleClose} >
            Great
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}