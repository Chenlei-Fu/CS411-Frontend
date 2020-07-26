import Types from '../../action/types'
const defaultState={
};
export default function onAction(state=defaultState, action) {
    switch (action.type) {
        case Types.SEARCH_SUCCESS:
            return{
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    data:action.data,
                    isLoading:false,
                }
            };
        case Types.SEARCH_REFRESH:
            return {
                ...state,
                [action.storeName]:{
                    ...[action.storeName],
                    isLoading:true,
                }
            };
        case Types.SEARCH_FAIL:
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
