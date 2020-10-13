import React, {useMemo} from 'react';
import styled, {useTheme} from 'styled-components'
import LensIcon from '@material-ui/icons/Lens';

const Container = styled.div`
    width: 205px;
    height: 200px;
    padding-left: 0.5rem;
    position: inherit;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

`;


const WeatherMeasurement = () => {
    const theme = useTheme();
    return useMemo(() => <Container>
        <p style={{margin: 0}}><LensIcon style={{color: theme.error, fontSize: '10px'}}/> Over 26°C</p>
        <p style={{margin: 0}}><LensIcon style={{color: theme.primary, fontSize: '10px'}}/> Between 10°C & 26°C</p>
        <p style={{margin: 0}}><LensIcon style={{color: theme.secondary, fontSize: '10px'}}/> Under 10°C</p>
    </Container>, [])
};

WeatherMeasurement.propTypes = {};

WeatherMeasurement.defaultProps = {};

export default WeatherMeasurement;