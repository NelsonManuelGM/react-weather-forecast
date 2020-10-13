import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    Chart,
    Legend,
    LineSeries,
    SplineSeries,
    Title,
    ValueAxis,
    Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import {connect} from 'react-redux';
import nothing from '../../asserts/nothing.png'
import moment from 'moment';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {EventTracker} from "@devexpress/dx-react-chart";

// const fromKelvinToCelsius = (kelvinTemp) => (kelvinTemp - 273.15)  ;
const fromKelvinToCelsius = (kelvinTemp) => +(Math.round((kelvinTemp - 273.15) + "e+3")  + "e-3");


const TrackingChart = ({dailyWeather, pending, globalDay}) => {
    const [data, setData] = useState([]);
    const [date, setDate] = useState({startDate: '', endDate: ''});

    useEffect(() => {
        let temporalData = [];
        if (!globalDay) {
            if (dailyWeather && dailyWeather.length > 0) {
                let end = dailyWeather.length - 1;
                setDate({
                    startDate: moment(dailyWeather[0].dt_txt).format('dddd'),
                    endDate: moment(dailyWeather[end].dt_txt).format('dddd')
                });

                let pivot = moment(dailyWeather[0].dt_txt).format('dddd'); // Wednesday
                let item = {};
                let i = 0;

                while (i < dailyWeather.length) {
                    const day = moment(dailyWeather[i].dt_txt).format('dddd');
                    let temp_min = dailyWeather[i].main.temp_min;
                    let temp_max = dailyWeather[i].main.temp_max;

                    if (day === pivot) {
                        item.splineMinimumTemperature = item.splineMinimumTemperature <= temp_min ? item.splineMinimumTemperature : temp_min;
                        item.splineMaximumTemperature = item.splineMaximumTemperature >= temp_max ? item.splineMaximumTemperature : temp_max;
                    }
                    if (dailyWeather[i + 1] !== undefined && moment(dailyWeather[i + 1].dt_txt).format('dddd') !== day) {
                        item.splineMinimumTemperature = fromKelvinToCelsius(item.splineMinimumTemperature);
                        item.splineMaximumTemperature = fromKelvinToCelsius(item.splineMaximumTemperature);
                        item.argument = pivot;

                        temporalData.push(item);
                        pivot = moment(dailyWeather[i + 1].dt_txt).format('dddd');
                        item = {}
                    }
                    i++;
                }
            }
        } else {
            let momentaryData = dailyWeather.filter(item => moment(item.dt_txt).format('dddd') === globalDay);
            if (momentaryData.length > 0) {
                momentaryData.forEach(item => {
                    temporalData.push({
                        argument: moment(item.dt_txt).format('LT'),
                        splineMinimumTemperature: fromKelvinToCelsius(item.main.temp_min),
                        splineMaximumTemperature: fromKelvinToCelsius(item.main.temp_max),
                    });
                });
                let end = momentaryData.length - 1;
                setDate({
                    startDate: moment(momentaryData[0].dt_txt).format('LT'),
                    endDate: moment(momentaryData[end].dt_txt).format('LT'),
                });
            }
        }

        setData(temporalData);

    }, [dailyWeather, globalDay]);

    return <div style={{marginTop: "2rem"}}>
        {
            !pending ?
                data.length > 0 ?
                    <Paper>
                        <Chart data={data}>

                            <ArgumentAxis/>
                            <ValueAxis/>

                            <SplineSeries name="Min temperature" valueField="splineMinimumTemperature"
                                          argumentField="argument"/>
                            <SplineSeries name="Max temperature" valueField="splineMaximumTemperature"
                                          argumentField="argument"/>
                            <Legend/>
                            <Title text={`${globalDay ? 'Hourly' : 'Daily'} weather track from ${date.startDate} to ${date.endDate} in Celsius (°C)`}/>
                            <EventTracker />
                            <Tooltip/>
                        </Chart>
                    </Paper>
                    : <img src={nothing} alt={"nothing to show"}/>
                : <CircularProgress/>
        }

    </div>
};
const mapStateToProps = ({requestAPIReducer, trackingDayReducer}) => ({
    dailyWeather: requestAPIReducer.data,
    pending: requestAPIReducer.pending,
    globalDay: trackingDayReducer.day
});

export default connect(mapStateToProps, undefined)(TrackingChart);