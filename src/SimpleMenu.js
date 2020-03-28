import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import menuIcon from './static/menu icon.svg';
import favicon from './static/favicon-32x32.png';
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

const list = (classes, toggleDrawer, menuItemChenge, tabs) => (
  <div
    className={clsx(classes.list, {
      [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
    })}
    role="presentation"
    onClick={toggleDrawer('left', false)}
    onKeyDown={toggleDrawer('left', false)}
  >
    <List>
      <div className='header__logo'>
        <img src={favicon} alt="icon" />
        <span>
            TESTTASK
        </span> 
    </div>
    <Divider />
      {menuTextBloc1.map((text) => (
        <ListItem button key={text} style={{ color: (tabs === text)?'#007bff':''}} onClick={() => menuItemChenge(text)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {menuTextBloc2.map((text) => (
        <ListItem button key={text} style={{ color: (tabs === text)?'#007bff':''}} onClick={() => menuItemChenge(text)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {menuTextBloc3.map((text) => (
        <ListItem button key={text} style={{ color: (tabs === text)?'#007bff':''}} onClick={() => menuItemChenge(text)}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
);

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const [tabs, setTabs] = React.useState('');

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const menuItemChenge = (text) => {
    setTabs(text);
    props.focusRegistration();
  }

  return (
    <div className='header__tabs-panel_mobail'>
      <React.Fragment >
        <Button onClick={toggleDrawer('left', true)}>
          <img src={menuIcon} alt='menu'/>
        </Button>
        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
          {list(classes, toggleDrawer, menuItemChenge, tabs)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

