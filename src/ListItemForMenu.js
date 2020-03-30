import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function ListItemFormenu(props) {
  return (
    <ListItem button key={props.text} style={{ color: (props.tabs === props.text) ? '#007bff' : '' }} onClick={() => props.menuItemChenge(props.text)}>
      <ListItemText primary={props.text} />
    </ListItem>
  );
}


ListItemFormenu.propTypes = {
  text: PropTypes.string.isRequired,
  tabs: PropTypes.string.isRequired,
  menuItemChenge: PropTypes.func.isRequired,
};
