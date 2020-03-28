import React from 'react';

export default function HeaderMenu(props) {
    return (
        <div className='header__tabs-panel'> 
            {props.nameTabs.map((name) => (
                <button
                    key={name}
                    onClick={() => props.handleClick(name)}
                    value={name}
                    style={{ color: (props.tabs === name)?'#007bff':''}}
                >
                    {name}
                </button>
            ))}
        </div>
    )
}