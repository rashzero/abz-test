import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './scss/TabsPanel.scss';

export default function TabsPanel() {
	const [value, setValue] = React.useState(2);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Tabs
			value={value}
			onChange={handleChange}
			className='tabs'
		>
			<Tab label="About me" />
			<Tab label="Relationships" />
			<Tab label="Requirements" />
			<Tab label="Users" />
			<Tab label="Sign up"/>
		</Tabs>
	);
}