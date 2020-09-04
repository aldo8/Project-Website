import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import storeConfig from './config/store.config';
import {Provider} from 'react-redux';
import {Container} from './components';


const store = storeConfig()
ReactDOM.render(
    <Provider store={store}>
        <Container>            
        </Container>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
