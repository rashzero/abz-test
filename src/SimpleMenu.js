import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import menuIcon from './static/menu icon.svg';
import ListForMenu from './ListForMenu';
import './scss/SimpleMenu.scss';

export default function SimpleMenu(props) {
  const [state, setState] = React.useState({
    left: false,
  });
  const [tabs, setTabs] = React.useState('');

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const menuItemChenge = (text) => {
    setTabs(text);
    props.focusRegistration();
  };

  return (
    <div className="header__tabs-panel_mobail">
      <>
        <Button onClick={toggleDrawer('left', true)}>
          <img src={menuIcon} alt="menu" />
        </Button>
        <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
          <ListForMenu toggleDrawer={toggleDrawer} menuItemChenge={menuItemChenge} tabs={tabs} />
        </Drawer>
      </>
    </div>
  );
}

SimpleMenu.propTypes = {
  focusRegistration: PropTypes.func.isRequired,
};
