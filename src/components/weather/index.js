import React, {useEffect, useState} from 'react';
import styled, {useTheme} from 'styled-components';
import {Route, Switch} from "react-router-dom";
import {routes} from './routes';
import {connect} from 'react-redux';
import {requestAPIAction} from "../../context/actions";
import {Button, TextField} from '@material-ui/core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;

const Weather = ({odRequestAPIAction}) => {
    const theme = useTheme();
    const [city, setCity] = useState('Miami');
    let temporalCity = '';

    useEffect(() => {
        odRequestAPIAction(city);
    }, [city]);

    const onCityChange = (e) => {
        e.preventDefault();
        temporalCity.length > 0 && setCity(temporalCity);
    };

    const handleChange = (e) => temporalCity = e.target.value;

    return <Container>
        <p style={{textAlign: 'initial', margin: '0 0 2rem 0', fontSize: '3rem', color: theme.primary}}> Weather
            forecast </p>
        <div style={{width: '350px', height: '40px', marginBottom: '3rem'}}>
            <TextField
                label={"Enter a city"}
                id="outlined-margin-dense city-field"
                defaultValue="Miami"
                placeholder={"Miami"}
                margin="dense"
                variant="outlined"
                onChange={(e) => handleChange(e)}
            />
            <Button variant="contained"
                    color="primary"
                    onClick={(e) => onCityChange(e)}
                    style={{margin: '0.6rem', backgroundColor: theme.primary}}>Search</Button>
        </div>
        <Switch>
            {
                routes.map((item, index) => (
                    <Route key={index}
                           exact={item.exact}
                           path={item.path}
                           children={item.component}
                    />
                ))
            }
        </Switch>
    </Container>
};

const mapDispatchToProps = (dispatch) => ({
    odRequestAPIAction: (city) => requestAPIAction(dispatch, city),
});

export default connect(undefined, mapDispatchToProps)(Weather)