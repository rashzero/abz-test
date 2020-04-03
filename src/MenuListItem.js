import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function MenuListItem(props) {
  return (
    <List>
      {props.children}
      {props.buttonsNameArr.map((text) => (
        <ListItem button key={text} style={{ color: (props.activeTab === text) ? '#007bff' : '' }} onClick={() => props.menuItemChange(text)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
}

MenuListItem.propTypes = {
  children: PropTypes.object,
  activeTab: PropTypes.string.isRequired,
  menuItemChange: PropTypes.func.isRequired,
  buttonsNameArr: PropTypes.array.isRequired,
};
