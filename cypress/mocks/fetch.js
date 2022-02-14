const API_KEY = '8e986152e3242ab108cee423aed95ea3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetch = (url) => Promise.resolve({
	status: 200,
	ok: true,
	json: () => {
		if (url === `${BASE_URL}/weather?q=Nuuk,GL&appid=${API_KEY}&units=metric`) {
			return Promise.resolve({
				main: {
					temp: 5,
					humidity: 85,
					pressure: 994,
				}
			})
		}

		if (url === `${BASE_URL}/weather?q=Urubici,BR&appid=${API_KEY}&units=metric`) {
			return Promise.resolve({
				main: {
					temp: 25,
					humidity: 98,
					pressure: 1011,
				}
			})
		}

		if (url === `${BASE_URL}/weather?q=Nairobi,KE&appid=${API_KEY}&units=metric`) {
			return Promise.resolve({
				main: {
					temp: 26,
					humidity: 61,
					pressure: 1019,
				}
			})
		}
	}
})

module.exports = fetch;
