import { LIKE_PROPERTY, UNLIKE_PROPERTY, SET_LIKED_PROPERTIES } from './types';

export const likeProperty = (propertyId) => {
    console.log('Dispatching LIKE_PROPERTY action');
    return { type: LIKE_PROPERTY, payload: propertyId };
};

export const unlikeProperty = (propertyId) => {
    console.log('Dispatching UNLIKE_PROPERTY action');
    return { type: UNLIKE_PROPERTY, payload: propertyId };
};

export const setLikedProperties = (properties) => {
    console.log('Dispatching SET_LIKED_PROPERTIES action');
    return { type: SET_LIKED_PROPERTIES, payload: properties };
};
