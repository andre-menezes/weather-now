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
						<WeatherCard city={'Nuuk'} country={'GL'} />
						<WeatherCard city={'Urubici'} country={'BR'} />
						<WeatherCard city={'Nairobi'} country={'KE'} />
					</section>
				</main>
			)} />
		</Switch>
	)
}

export default App;
