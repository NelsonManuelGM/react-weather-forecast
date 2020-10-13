import React, {useEffect, useMemo, useState} from "react";
import WeatherItem from "../weather-item";
import styled, {useTheme} from "styled-components";
import {connect} from 'react-redux';
import moment from 'moment';
import WeatherMeasurement from "../weather-measurement";
import CircularProgress from "@material-ui/core/CircularProgress";
import {trackingDay} from "../../context/actions";

const WeatherForecast = styled.div`
  width: 62rem;
  height: 15rem;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  justify-content: center;
`;

const WeatherForecastComponent = ({dailyWeather, pending, onTrackingDay}) => {
    const theme = useTheme();
    const [localDailyWeather, setLocalDailyWeather] = useState([]);

    // const fromKelvinToCelsius = (kelvinTemp) => (kelvinTemp - 273.15).toFixed(2);
    const fromKelvinToCelsius = (kelvinTemp) => +(Math.round((kelvinTemp - 273.15) + "e+2")  + "e-2");

    useEffect(() => onTrackingDay(''));

    useEffect(() => {
        let i = 0;
        let temporaryArray = [];
        if (dailyWeather && dailyWeather.length > 0) {
            let pivot = moment(dailyWeather[0].dt_txt).format('dddd'); // Wednesday
            let item = {};

            while (i < dailyWeather.length) {
                const day = moment(dailyWeather[i].dt_txt).format('dddd');
                let temp_min = dailyWeather[i].main.temp_min;
                let temp_max = dailyWeather[i].main.temp_max;

                if (day === pivot) {
                    item.minTemperature = item.minTemperature <= temp_min ? item.minTemperature : temp_min;
                    item.maxTemperature = item.maxTemperature >= temp_max ? item.maxTemperature : temp_max;
                }
                if (dailyWeather[i + 1] !== undefined && moment(dailyWeather[i + 1].dt_txt).format('dddd') !== day) {
                    item.minTemperature = fromKelvinToCelsius(item.minTemperature);
                    item.maxTemperature = fromKelvinToCelsius(item.maxTemperature);
                    item.day = pivot;
                    item.date = moment(dailyWeather[i].dt_txt).format("MMM Do YY");
                    item.weather = dailyWeather[i].weather[0].main;

                    temporaryArray.push(item);
                    pivot = moment(dailyWeather[i + 1].dt_txt).format('dddd');
                    item = {}
                }
                i++;
            }
        }
        setLocalDailyWeather(temporaryArray);
    }, [dailyWeather]);

    return useMemo(()=><>
        <h4 style={{textAlign: 'initial', marginLeft: '0.5rem'}}> Weekly weather forecast </h4>

        <WeatherForecast>
            {
                !pending ?
                    <>
                        <WeatherMeasurement/>
                        {
                            localDailyWeather.length > 0 ? localDailyWeather.map((item, index) => (
                                <WeatherItem key={index}
                                             maxTemperature={item.maxTemperature}
                                             minTemperature={item.minTemperature}
                                             weatherType={item.weather}
                                             day={item.day}
                                             date={item.date}
                                />
                            )) : <div style={{display: "flex", width: '100%', flexDirection: 'column'}}>
                                <p style={{
                                    color: theme.error,
                                    textTransform: 'uppercase',
                                    fontsize: 'xx-large',
                                    textAlign: "initial",
                                    paddingLeft:'2rem',
                                }}>
                                    There is not items for this city, probably it doesn't exist</p>
                            </div>
                        }
                    </>
                    : <CircularProgress/>
            }
        </WeatherForecast>
    </>,[pending,localDailyWeather])
};

const mapStateToProps = ({requestAPIReducer}) => ({
    dailyWeather: requestAPIReducer.data,
    pending: requestAPIReducer.pending,
});

const mapDispatchToProps = (dispatch) => ({
    onTrackingDay: (day) => trackingDay(dispatch, day)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecastComponent);