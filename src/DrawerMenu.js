import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import menuIcon from './static/menu icon.svg';
import MenuList from './MenuList';
import './scss/DrawerMenu.scss';

export default function DrawerMenu(props) {
  const [activeTab, setActiveTab] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItemChange = (text) => {
    setActiveTab(text);
    props.focusRegistration();
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div className="header__tabs-panel_mobail">
      <Button onClick={toggleDrawer(true)}>
        <img src={menuIcon} alt="menu" />
      </Button>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <MenuList
          activeTab={activeTab}
          menuItemChange={menuItemChange}
          toggleDrawer={toggleDrawer}
          focusRegistration={props.focusRegistration}
        />
      </Drawer>
    </div>
  );
}

DrawerMenu.propTypes = {
  focusRegistration: PropTypes.func,
};
