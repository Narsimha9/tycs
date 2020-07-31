// import axios from 'axios'
import { PATH_LOCATION } from '../constants/index';

export const setActiveMenu = buttonName => async dispatch => {
    dispatch({
        type: PATH_LOCATION,
        payload: buttonName
    })
}
