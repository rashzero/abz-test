import React, { useState } from 'react';
import SimpleMenu from './SimpleMenu';
//import TabsPanel from './TabsPanel'
import favicon from './static/favicon-32x32.png';
import './scss/Header.scss'
export default function Header(props) {
    const [tabs, setTabs] = useState('');

	const handleClick = (newValue) => {
        console.log(newValue);
        setTabs(newValue);
        props.focusRegistration();
    };
    
    const nameTabs = [ 'About me', 'Relationships', 'Requirements', 'Users', 'Sign Up' ]; 

    const renderTabs = nameTabs.map((name) => (
        <button
            key={name}
            onClick={() => handleClick(name)}
            value={name}
            style={{ color: (tabs === name)?'#007bff':''}}
        >
            {name}
        </button>
    ));
    return (
        <div className="header">
            <div className='header__logo'>
                <img src={favicon} alt="icon" />
                <span>
                    TESTTASK
                </span> 
            </div>
            <div 
                className='header__tabs-panel'
            >
                {renderTabs}
            </div>
            <div className='header__tabs-panel_mobail'>
                <SimpleMenu focusRegistration={props.focusRegistration}/>
            </div>
        </div>
    );
}