import {combineReducers} from 'redux';
import theme from './theme'
import popular from './popular'
import search from './search'
const index = combineReducers({
    theme: theme,
    popular: popular,
    search: search
});

export default index;
