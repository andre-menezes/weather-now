import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { WeatherContext as Context } from '../context/weather';
import loader from '../assets/loader.svg';

const WeatherCard = (props) => {
	const { city, country } = props;

	const { isLoading, setIsLoading } = useContext(Context);

	const [data, setData] = useState(null);
	const [timeNow, setTimeNow] = useState(null);
	const [color, setColor] = useState(null);

	const COLD = 5;
	const HOT = 25;
	const TIME_RELOAD = 10000;

	const getCityWeather = async (city, country) => {
		const API_KEY = '8e986152e3242ab108cee423aed95ea3';
		const BASE_URL = 'https://api.openweathermap.org/data/2.5'
		try {
			const response = await fetch(
				`${BASE_URL}/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
			)
			const result = await response.json()
			return result;
		} catch (error) {
			return { msg: 'Something went wrong' };
		}
	}

	const formatDate = (date) => {
		const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
		const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
		const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
		const sufix = hour < 12 ? 'AM' : 'PM';
		return `${hour}:${minute}:${second} ${sufix}`;
	}

	const verifyTemperature = (temp) => {
		if (Math.round(temp) <= COLD) return setColor('low');
		if (Math.round(temp) > HOT) return setColor('high');
		
		return setColor('medium');
	}

	const getWeather = async () => {
		setIsLoading(true);
		const response = await getCityWeather(city, country);
		setData(response);
		setTimeNow(formatDate(new Date()))
		verifyTemperature(response.main.temp)
		setIsLoading(false);
	}

	useEffect(()=>{
		getWeather();

		const interval = setInterval(() => {
			getWeather()
    }, TIME_RELOAD)

		return () => clearInterval(interval)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	if (data?.msg) {
		return (
			<div className='card' data-cy='weather-card'>
				<div className='card-header'>
					{`${city}, ${country}`}
				</div>
				<div className="card-content">
					<p className='error'>{data.msg}</p>
					<button
						type='button'
						onClick={getWeather}
						className='btn-try'
					>
						Try again
					</button>
				</div>
			</div>
		)
	}

	return data && (
		<div className='card'>
			<div className='card-header' data-cy={`${city.toLowerCase()}-card`}>
				{`${city}, ${country}`}
			</div>
			{!isLoading ? (
				<div>
					<div className='card-weather'>
						<p className={color} data-cy={color}>
							{data.main.temp.toFixed(0)}
							<span className='degree'>º</span>
						</p>
					</div>
					<div className='card-footer'>
						<div className='footer-content'>
							<div data-cy="humidity">
								<p>Humidity</p>
								<span>{data.main.humidity}</span>
								<span>%</span>
							</div>
							<div data-cy="pressure">
								<p>Pressure</p>
								<span>{data.main.pressure}</span>
								<span>hPa</span>
							</div>
						</div>
						<p data-cy='updated-time'>{`Updated at ${timeNow}`}</p>
					</div>
				</div>
			) : <img className='loading' src={loader} alt='loader' />
			}
		</div>
	)
}

WeatherCard.propTypes = {
	city: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
}

export default WeatherCard;