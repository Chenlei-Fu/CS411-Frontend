import React from 'react';

import Providers from './navigation';
import store from './store'
import {Provider} from 'react-redux'

export default function App() {
  return (
      <Provider store={store}>
        <Providers/>
      </Provider>
  )
}
