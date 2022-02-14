import React from 'react';
import logo from '../assets/logo.svg';

const Header = () => {
	return (
		<header className='header' data-cy="weather-header">
			<img src={logo} alt="logo" />
		</header>
	)
}

export default Header;