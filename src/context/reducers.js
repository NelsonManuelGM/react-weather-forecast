import {REQUEST_API_ERROR, REQUEST_API_PENDING, REQUEST_API_SUCCESS, TRACKING_DAY} from './constants'

const initialState = {
    pending: false,
    error: '',
    data: [],
};


export const requestAPIReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_API_SUCCESS:
            return Object.assign({}, state, {
                pending: action.pending,
                data: action.data,
            });
        case REQUEST_API_ERROR:
            return Object.assign({}, initialState, {error: action.error});
        case REQUEST_API_PENDING:
            return Object.assign({}, state, {pending: true});
        default:
            return state
    }
};

const trackingDay = {
  day: ''
};

export const trackingDayReducer = (state=trackingDay, action={}) => {
    if(action.type === TRACKING_DAY){
        console.log(Object.assign({}, state, {day: action.day}));
        return Object.assign({}, state, {day: action.day})
    }
    return state
};