import React, {useEffect} from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';

import {BrowserRouter as Router} from 'react-router-dom';

import LayoutTop from './components/layout/LayoutTop';
import LayoutMain from './components/layout/LayoutMain';
import LayoutMenu from "./components/layout/LayoutMenu";
import {useKeycloak} from "@react-keycloak/web";
import AppLoading from "./AppLoading";
import {useDispatch} from "react-redux";
import {setUserInfo} from "./store/sessionStart/action";

const App: React.FC = () => {

    const { keycloak } = useKeycloak();

    let dispatch = useDispatch();

    useEffect(() => {
        if (keycloak && !keycloak.authenticated) {
            console.log("redirect to keycloak login, authenticated");
            keycloak.login();
        } else if (keycloak && keycloak.authenticated) {
            console.log("loading user info");
            keycloak.loadUserInfo().then( (userInfo) => {
                console.log("userinfo" , userInfo);
                dispatch(setUserInfo(userInfo));
            });
        }
    }, [keycloak]);

    if(keycloak && keycloak.authenticated){
        return (
            <Router>
                <div className="App">
                    <LayoutTop/>
                    <LayoutMenu/>
                    <LayoutMain/>
                </div>
            </Router>
        );
    } else {
        return <AppLoading/>;
    }
}

export default App;