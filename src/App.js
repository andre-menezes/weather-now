import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';

const App = () => {
	return (
		<Switch>
			<Route path='/' component={() => (
				<main>
					<Header />
					<section className='content'>
						<WeatherCard city={'Paris'} country={'FR'} />
						<WeatherCard city={'Toronto'} country={'CA'} />
						<WeatherCard city={'São Paulo'} country={'BR'} />
					</section>
				</main>
			)} />
		</Switch>
	)
}

export default App;
