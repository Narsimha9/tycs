import { PATH_LOCATION } from '../constants/index';

const initialState = {
    pathLocation: {},
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case PATH_LOCATION:
            return { ...state, pathlocation: action.payload }
        default:
            return state
    
    }
}
