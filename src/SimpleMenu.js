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

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className='header__logo'>
          <img src={favicon} alt="icon" />
          <span>
              TESTTASK
          </span> 
      </div>
      <Divider />
        {['About me', 'Relationships', 'Users', 'Sign up', 'Terms and Conditions'].map((text, index) => (
          <ListItem button key={text} style={{ color: (tabs === text)?'#007bff':''}} onClick={() => menuItemChenge(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['How it works', 'Partnership', 'Help', 'Leave testimonisl', 'Contact us'].map((text, index) => (
          <ListItem button key={text} style={{ color: (tabs === text)?'#007bff':''}} onClick={() => menuItemChenge(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Articles', 'Our news', 'Testimonials', 'Licenses', 'Privacy Policy'].map((text, index) => (
          <ListItem button key={text} style={{ color: (tabs === text)?'#007bff':''}} onClick={() => menuItemChenge(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>

        <React.Fragment >
          <Button onClick={toggleDrawer('left', true)}>
            <img src={menuIcon} alt='menu'/>
          </Button>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>

    </div>
  );
}