import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import favicon from './static/favicon-32x32.png';
import MenuListItem from './MenuListItem';
import './scss/DrawerMenu.scss';

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

export default function MenuList(props) {
  const [activeTab, setActiveTab] = React.useState('');
  const classes = useStyles();

  const menuItemChange = (text) => {
    setActiveTab(text);
    props.focusRegistration();
  };

  return (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
      })}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <MenuListItem
        activeTab={activeTab}
        menuItemChange={menuItemChange}
        buttonsNameArr={menuTextBloc1}
      >
        <div className="header__logo">
          <img src={favicon} alt="icon" />
          <span>
            TESTTASK
          </span>
        </div>
      </MenuListItem>
      <Divider />
      <MenuListItem
        activeTab={props.activeTab}
        menuItemChange={props.menuItemChange}
        buttonsNameArr={menuTextBloc2}
      />
      <Divider />
      <MenuListItem
        activeTab={props.activeTab}
        menuItemChange={props.menuItemChange}
        buttonsNameArr={menuTextBloc3}
      />
    </div>
  );
}

MenuList.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  activeTab: PropTypes.string,
  menuItemChange: PropTypes.func,
  focusRegistration: PropTypes.func,
};
