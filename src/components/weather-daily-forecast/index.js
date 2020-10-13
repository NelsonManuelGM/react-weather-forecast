import React, {useEffect, useMemo} from "react";
import WeatherItem from "../weather-item";
import styled from "styled-components";
import {connect} from 'react-redux';
import {Link, useRouteMatch} from "react-router-dom";
import {requestAPIAction, trackingDay} from "../../context/actions";
import moment from 'moment';
import WeatherMeasurement from "../weather-measurement";

const WeatherForecast = styled.div`
  width: 92rem;
  height: 15rem;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
`;

const Title = styled(Link)`
  text-align: initial;
  margin-left: 0.5rem;
  width: inherit;
  color: ${({theme}) => theme.primary};
  cursor:pointer;
`;

const WeatherDailyForecastComponent = ({dailyWeather, odRequestAPIAction, onTrackingDay}) => {
    let {path, url} = useRouteMatch();
    // const fromKelvinToCelsius = (kelvinTemp) => (kelvinTemp - 273.15).toFixed(2);
    const fromKelvinToCelsius = (kelvinTemp) => +(Math.round((kelvinTemp - 273.15) + "e+2")  + "e-2");

    useEffect(() => {
        onTrackingDay(path.slice(1))
    }, [path]);

    const splitDays = () => {
        const day = path.slice(1);
        let i = 0;
        let temporaryArray = [];
        if (dailyWeather.length > 0) {
            while (i < dailyWeather.length) {
                let auxiliaryDay = moment(dailyWeather[i].dt_txt).format('dddd');
                let date = moment(dailyWeather[i].dt_txt).format('lll');
                if (auxiliaryDay === day) {
                    temporaryArray.push(
                        {
                            minTemperature: fromKelvinToCelsius(dailyWeather[i].main.temp_min),
                            maxTemperature: fromKelvinToCelsius(dailyWeather[i].main.temp_max),
                            weather: dailyWeather[i].weather[0].main,
                            day: auxiliaryDay,
                            date: date,
                        }
                    );
                }
                i++;
            }
        }
        return temporaryArray
    };
    return useMemo(()=><div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Title to={'/'}>
                <h4>Home</h4>
            </Title>

            <h4 style={{textAlign: 'initial', marginLeft: '0.5rem'}}>/ Daily weather forecast every three hours</h4>
        </div>
        <WeatherForecast>
            <WeatherMeasurement/>
            {
                dailyWeather && splitDays().map((item, index) => (
                    <WeatherItem key={index}
                                 maxTemperature={item.maxTemperature}
                                 minTemperature={item.minTemperature}
                                 weatherType={item.weather}
                                 day={item.day}
                                 date={item.date}
                    />
                ))
            }
        </WeatherForecast>
    </div>,[dailyWeather])
};

const mapStateToProps = ({requestAPIReducer}) => ({
    dailyWeather: requestAPIReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
    odRequestAPIAction: (city) => requestAPIAction(dispatch, city),
    onTrackingDay: (day) => trackingDay(dispatch, day),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDailyForecastComponent);