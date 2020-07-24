import Types from '../../action/types'
const defaultState={

};
/*
   popular: {
        java: {
            items: [],
            isLoading: false
        },
        ios: {
        }
    }
 */

export default function onAction(state=defaultState, action) {
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return{
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    items:action.items,
                    isLoading:false,
                }
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading:true,
                }
            };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading:false,
                }
            };
        default:
            return state;
    }
}
