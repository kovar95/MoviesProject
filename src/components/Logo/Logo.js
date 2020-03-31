import React from 'react';
import './Logo.scss';
import logo from '../../images/logo.png';

const Logo = () => {
	return (
		<a className="logo" href="/">
			<img src={logo} alt="logo"/>
		</a>
	);
}

export {Logo};