import {combineReducers} from 'redux';
import theme from './theme'
import popular from './popular'
import search from './search'
import favorite from './favorite'
const index = combineReducers({
    theme: theme,
    popular: popular,
    search: search,
    favorite: favorite
});

export default index;
