import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import favicon from './static/favicon-32x32.png';
import ListItemForMenu from './ListItemForMenu';
import './scss/SimpleMenu.scss';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const menuTextBloc1 = ['About me', 'Relationships', 'Users', 'Sign up', 'Terms and Conditions'];
const menuTextBloc2 = ['How it works', 'Partnership', 'Help', 'Leave testimonisl', 'Contact us'];
const menuTextBloc3 = ['Articles', 'Our news', 'Testimonials', 'Licenses', 'Privacy Policy'];

export default function ListForMenu(props) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
      })}
      role="presentation"
      onClick={props.toggleDrawer('left', false)}
      onKeyDown={props.toggleDrawer('left', false)}
    >
      <MenuText1 tabs={props.tabs} menuItemChenge={props.menuItemChenge}>
        <div className="header__logo">
          <img src={favicon} alt="icon" />
          <span>
            TESTTASK
          </span>
        </div>
      </MenuText1>
      <Divider />
      <MenuText2 tabs={props.tabs} menuItemChenge={props.menuItemChenge} />
      <Divider />
      <MenuText3 tabs={props.tabs} menuItemChenge={props.menuItemChenge} />
    </div>
  );
}

function MenuText1(props) {
  return (
    <List>
      {props.children}
      {menuTextBloc1.map((text) => (
        <ListItemForMenu
          text={text}
          tabs={props.tabs}
          menuItemChenge={props.menuItemChenge}
          key={text}
        />
      ))}
    </List>
  );
}

function MenuText2(props) {
  return (
    <List>
      {menuTextBloc2.map((text) => (
        <ListItemForMenu
          text={text}
          tabs={props.tabs}
          menuItemChenge={props.menuItemChenge}
          key={text}
        />
      ))}
    </List>
  );
}

function MenuText3(props) {
  return (
    <List>
      {menuTextBloc3.map((text) => (
        <ListItemForMenu
          text={text}
          tabs={props.tabs}
          menuItemChenge={props.menuItemChenge}
          key={text}
        />
      ))}
    </List>
  );
}

ListForMenu.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  tabs: PropTypes.string.isRequired,
  menuItemChenge: PropTypes.func.isRequired,
};

MenuText1.propTypes = {
  children: PropTypes.object.isRequired,
  tabs: PropTypes.string.isRequired,
  menuItemChenge: PropTypes.func.isRequired,
};

MenuText2.propTypes = {
  tabs: PropTypes.string.isRequired,
  menuItemChenge: PropTypes.func.isRequired,
};

MenuText3.propTypes = {
  tabs: PropTypes.string.isRequired,
  menuItemChenge: PropTypes.func.isRequired,
};
