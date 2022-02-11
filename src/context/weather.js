import React, { createContext, useState } from "react";
import PropTypes from 'prop-types';

const WeatherContext = createContext();

const WeatherProvider = ({children}) => {
	const [isLoading, setIsLoading] = useState(true);
	
	const context = { isLoading, setIsLoading };

	return (
		<WeatherContext.Provider value={context}>
			{children}
		</WeatherContext.Provider>
	)
}

WeatherProvider.propTypes = { children: PropTypes.node.isRequired };

export { WeatherContext, WeatherProvider }
