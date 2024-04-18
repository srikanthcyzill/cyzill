import { LIKE_PROPERTY, UNLIKE_PROPERTY, SET_LIKED_PROPERTIES } from './types';

const initialState = {
    likedProperties: [],
};

const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE_PROPERTY:
            if (!state.likedProperties.includes(action.payload)) {
                return {
                    ...state,
                    likedProperties: [...state.likedProperties, action.payload],
                };
            }
            return state;
        case UNLIKE_PROPERTY:
            return {
                ...state,
                likedProperties: state.likedProperties.filter(propertyId => propertyId !== action.payload),
            };
        case SET_LIKED_PROPERTIES:
            return {
                ...state,
                likedProperties: action.payload,
            };
        default:
            return state;
    }
};

export default propertyReducer;
