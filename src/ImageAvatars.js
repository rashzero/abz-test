import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import avatarCover from './static/photo-cover.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    position: 'static',
    width: theme.spacing(8.75),
    height: theme.spacing(8.75),
  },
}));

export default function ImageAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar src={props.userImg ? props.userImg : avatarCover} className={classes.large} />
    </div>
  );
}

ImageAvatars.propTypes = {
  userImg: PropTypes.string.isRequired,
};
