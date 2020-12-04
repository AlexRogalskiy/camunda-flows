import React from 'react';
import {Sidebar} from 'primereact/sidebar';

import { TabMenu } from 'primereact/tabmenu';
import {MenuItem} from "primereact/api";

import './TabMenu.scss';
import {changeTab} from "../../store/sessionStart/action";
import {useDispatch} from "react-redux";
import {useKeycloak} from "@react-keycloak/web";

const LayoutMenu: React.FC = () => {

    let dispatch = useDispatch();

    const items:MenuItem[] = [
        {label: 'Network Data', icon: 'pi pi-fw pi-home', command: () => dispatch(changeTab("networkData"))},
        {label: 'Trouble Flows', icon: 'pi pi-fw pi-cog', command: () => dispatch(changeTab("workflows"))},
        {label: 'History', icon: 'pi pi-fw pi-file', command: () => dispatch(changeTab("accountHistory"))}
    ];

    const { keycloak } = useKeycloak();

    const userAllowed = keycloak.hasRealmRole("app-admin") || keycloak.hasRealmRole("app-user");

    return (
        <Sidebar position="top" visible={true} showCloseIcon={false} dismissable={false} modal={false}
                 style={{height:'50px', marginTop:"50px", backgroundColor:'none',
                     display:"flex", justifyContent:"center", padding:"0px"}}
                 onHide={ () => console.log("do nothing")} className="tabMenuMain">
            {
                userAllowed && <TabMenu model={items} style={{width:"600px"}}/>
            }
            {
                !userAllowed && <div>You are not allowed to view.</div>
            }
        </Sidebar>
    );
}

export default LayoutMenu;