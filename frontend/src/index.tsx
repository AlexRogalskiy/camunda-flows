import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from "react-redux";
import { store } from './store/';

import {ReactKeycloakProvider} from '@react-keycloak/web';
import keycloak from './keycloak';
import {setAuthToken} from "./store/sessionStart/action";
import AppLoading from "./AppLoading";

const eventLogger = (event: unknown, error: unknown) => {
    if(event === "onAuthSuccess"){
        console.log("Login successful");
    } else {
        //console.log("keycloak event", event, error);
    }
}

const tokenLogger = (tokens: any) => {
    if(tokens && tokens.token){
        setAuthToken(tokens.token);
    }
}

// guvenc - checkLoingIframe disable ettim cunku keycloak.authenticated false olarak donuyordu App.tsx icerisinde
// farkli bir cozum getirilirse belki bu tekrardan enable edilebilir
// SingleSignOn ile ilgili bir parametre imiz, RemindMe vs calisiyor mu bu sekilde test edilmeli !!!
ReactDOM.render(
    <React.StrictMode>
        <ReactKeycloakProvider authClient={keycloak} onEvent={eventLogger} initOptions={{checkLoginIframe: false}}
                               onTokens={tokenLogger} LoadingComponent={<AppLoading/>}  >
            <Provider store={store}>
                <App />
            </Provider>
        </ReactKeycloakProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();