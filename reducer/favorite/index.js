import Types from '../../action/types';

/**
 * favorite:{
 *     popular:{
 *         projectModels:[],
 *         isLoading:false
 *     },
 *     trending:{
 *         projectModels:[],
 *         isLoading:false
 *     }
 * }
 * 0.state树，横向扩展
 * 1.如何动态的设置store，和动态获取store(难点：store key不固定)；
 * @param state
 * @param action
 * @returns {{theme: (onAction|*|string)}}
 */
export default function onAction(state = [], action) {
    switch (action.type) {
        case Types.FAVORITE_ADD:
            action.payload.favId = false
            return [...state, action.payload]
        case Types.FAVORITE_REMOVE:
            action.payload.favId = true
            return state.filter(item => item.CRN !== action.payload.CRN)
        default:
            return state;
    }

}
