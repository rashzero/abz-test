import React, { useState } from 'react';
import PropTypes from 'prop-types';

const tabNames = ['About me', 'Relationships', 'Requirements', 'Users', 'Sign Up'];

export default function HeaderMenu(props) {
  const [activeTab, setActiveTab] = useState('');

  const selectTab = (newValue) => {
    setActiveTab(newValue);
    props.focusRegistration();
  };

  return (
    <div className="header__tabs-panel">
      {tabNames.map((name) => (
        <button
          type="button"
          key={name}
          onClick={() => selectTab(name)}
          value={name}
          style={{ color: (activeTab === name) ? '#007bff' : '' }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

HeaderMenu.propTypes = {
  focusRegistration: PropTypes.func.isRequired,
};
