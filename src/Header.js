import React from 'react';
import PropTypes from 'prop-types';
import DrawerMenu from './DrawerMenu';
import favicon from './static/favicon-32x32.png';
import HeaderMenu from './HeaderMenu';
import './scss/Header.scss';

export default function Header(props) {
  return (
    <div className="header">
      <div className="header__logo">
        <img src={favicon} alt="icon" />
        <span>
          TESTTASK
        </span>
      </div>
      <HeaderMenu focusRegistration={props.focusRegistration} />
      <DrawerMenu focusRegistration={props.focusRegistration} />
    </div>
  );
}

Header.propTypes = {
  focusRegistration: PropTypes.func.isRequired,
};
