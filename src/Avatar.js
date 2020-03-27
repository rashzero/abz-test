import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    position: 'static',
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function ImageAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src={props.userImg} className={classes.large} />
    </div>
  );
}