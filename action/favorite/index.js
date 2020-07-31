import Types from '../types';


export const addFavorite = newItem => ({
    type : Types.FAVORITE_ADD,
    payload : newItem
})


export const removeFavorite = item => ({
    type : Types.FAVORITE_REMOVE,
    payload : item
})

