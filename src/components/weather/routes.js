import React from 'react';
import WeatherForecastComponent from '../weather-forecast'
import WeatherDailyForecastComponent from '../weather-daily-forecast'

const routes = [
    {
        exact: true,
        path: ['/'],
        component: ()=> <WeatherForecastComponent/>
    },
    {
        exact: false,
        path: ['/Sunday', '/Monday', '/Tuesday', '/Wednesday', '/Thursday', '/Friday', '/Saturday'],
        component: ()=> (<WeatherDailyForecastComponent/>)
    },

];

export {
    routes
}