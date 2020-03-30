import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SimpleMenu from './SimpleMenu';
import favicon from './static/favicon-32x32.png';
import HeaderMenu from './HeaderMenu';
import './scss/Header.scss';

const nameTabs = ['About me', 'Relationships', 'Requirements', 'Users', 'Sign Up'];

export default function Header(props) {
  const [tabs, setTabs] = useState('');

  const handleClick = (newValue) => {
    setTabs(newValue);
    props.focusRegistration();
  };

  return (
    <div className="header">
      <div className="header__logo">
        <img src={favicon} alt="icon" />
        <span>
          TESTTASK
        </span>
      </div>
      <HeaderMenu nameTabs={nameTabs} tabs={tabs} handleClick={handleClick} />
      <SimpleMenu focusRegistration={props.focusRegistration} />
    </div>
  );
}

Header.propTypes = {
  focusRegistration: PropTypes.func.isRequired,
};
