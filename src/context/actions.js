import {REQUEST_API_ERROR, REQUEST_API_PENDING, REQUEST_API_SUCCESS, TRACKING_DAY} from './constants'
import {API_KEY, BASE_URL} from "../apikey";


export const requestAPIAction = (dispatch, city) => {
    const URL = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
    dispatch({type: REQUEST_API_PENDING, pending: true});
    fetch(URL)
        .then(response => response.json())
        .then(data => dispatch({
            type: REQUEST_API_SUCCESS,
            data: data.list || [],
            pending: false
        }))
        .catch(error => dispatch(
            {
                type: REQUEST_API_ERROR,
                error: error
            }))
};


export const trackingDay = (dispatch, day) => {
    dispatch({
        type: TRACKING_DAY,
        day: day
    })
};