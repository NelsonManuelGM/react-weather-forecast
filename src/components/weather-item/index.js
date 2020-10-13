import React, {memo, useMemo} from 'react';
import styled from 'styled-components'
import Cloudy from '../../asserts/weather/cloudy.png'
import Sunny from '../../asserts/weather/sunny.png'
import Rainy from '../../asserts/weather/rainy.png'
import Snowy from '../../asserts/weather/snowy.png'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Container = styled.div`
    width: 150px;
    height: 200px;
    border: 1px solid ${({theme})=>theme.shadow};
    position: relative;
    border-radius: 1rem;
    margin: 0.2rem;
    &:hover{
      box-shadow: 0 0 6px black;
    }
`;

const Title = styled(Link)`
  position: relative;
  text-decoration: none;
  color: ${({theme})=>theme.primary};
  cursor:pointer;
`;

const Degree = styled.p`
    margin: 0 0.5rem; 
    color: ${({theme, temperature})=> temperature > 26 ? theme.error : temperature > 10 ? theme.primary : theme.secondary}; 
    font-size: 0.8rem;
`;

const TemperatureBox = styled.div`
    width: inherit;
    height: 30px;
    bottom: 10px;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const WeatherItem = ({ weatherType, maxTemperature, minTemperature, day, date }) => {
    const sourceImage = () => {
        switch (weatherType) {
            case "Rain":
                return Rainy;
            case "Snow":
                return Snowy;
            case "Clouds":
                return Cloudy;
            case "Clear":
                return Sunny;
            default:
                return Sunny
        }
    };

    return useMemo(()=><Title to={`/${day}`}>
        <Container>
            <div style={{position: 'inherit', zIndex: '1'}}>
                <h6 style={{margin: '0.6rem 0 0 0'}}>{date}</h6>
                <h4 style={{margin: 0}}>{day}</h4>
            </div>
            <img src={sourceImage()} alt={"alt"} style={{borderRadius: '1rem', position: 'absolute',
                left: '0', top: '0'}}/>
            <TemperatureBox>
                <Degree temperature={maxTemperature}> {maxTemperature} °C</Degree>
                <Degree temperature={minTemperature}> {minTemperature} °C</Degree>
            </TemperatureBox>
        </Container>
    </Title>,[day, maxTemperature, minTemperature])
};

WeatherItem.propTypes = {
    weatherType: PropTypes.string,
    maxTemperature: PropTypes.string,
    minTemperature: PropTypes.string,
    day: PropTypes.string,
    date: PropTypes.string,
};

WeatherItem.defaultProps = {
    weatherType: "sunny",
    maxTemperature: "30",
    minTemperature: "11",
    day: "Monday",
    date: "2010-2-21",
};

export default memo(WeatherItem);