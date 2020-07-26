import Types from '../types'
import DataStore from '../../expand/dao/DataStore'

export function onSearch(storeName, url) {
    return dispatch => {
        dispatch({type: Types.SEARCH_REFRESH, storeName: storeName});
        let dataStore=new DataStore();
        dataStore.fetchData(url)
            .then(data=>{
                handleData(dispatch,storeName,data)
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    types: Types.SEARCH_FAIL,
                    storeName,
                    error
                });
            })
    }
}

function handleData(dispatch, storeName, data) {
    dispatch({
        type: Types.SEARCH_SUCCESS,
        data: data && data.data && data.data.data,
        storeName
    })
}
