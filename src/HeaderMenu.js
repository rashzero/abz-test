import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderMenu(props) {
  return (
    <div className="header__tabs-panel">
      {props.nameTabs.map((name) => (
        <button
          type="button"
          key={name}
          onClick={() => props.handleClick(name)}
          value={name}
          style={{ color: (props.tabs === name) ? '#007bff' : '' }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

HeaderMenu.propTypes = {
  nameTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabs: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
