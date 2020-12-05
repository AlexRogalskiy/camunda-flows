import React, {useEffect}  from 'react';
import {Sidebar} from 'primereact/sidebar';

import { RootState } from '../../store';
import { useDispatch, useSelector } from "react-redux";
import { initSession } from "../../store/sessionStart/action";
import { Button } from 'primereact/button';
import {useKeycloak} from "@react-keycloak/web";

interface Properties{
    name:string,
    value:string
}
const CustomerProperty: React.FC<Properties> = (props) => {
    return (
        <span style={{fontWeight: 400, fontSize: 15}}>
            | {props.name} : <span style={{color: '#ffe000'}}>{props.value}</span>&nbsp;
        </span>
    );
}

const LayoutTop: React.FC = () => {

    const sessionId = useSelector( (state: RootState) =>  state.session.sessionId);
    const customerNo = useSelector( (state: RootState) =>  state.session.customerNo);
    const subscriberId = useSelector( (state: RootState) =>  state.session.subscriberId);

    const userInfo = useSelector( (state: RootState) =>  state.session.userInfo);
    const userName:any = userInfo ? userInfo.preferred_username : "";
    console.log("LayoutTop is rendered.");

    const { keycloak } = useKeycloak();

    let dispatch = useDispatch();

    useEffect(()=> {
        if(sessionId === ""){
            dispatch(initSession(customerNo, subscriberId));
        }
    }, [userInfo]);

    return (
        <Sidebar position="top" visible={true} showCloseIcon={false} dismissable={false} modal={false}
                style={{height:'50px', backgroundColor:'#104e8c', color:'#fff', padding:"5px"}} onHide={ () => console.log("do nothing")}>
            <div className="p-grid">
                <div className="p-col-8" style={{display: "flex", alignItems: "center"}}>
                    <CustomerProperty name="Customer Name" value="Jack Sparrow" />
                    <CustomerProperty name="Customer No" value={customerNo} />
                    <CustomerProperty name="Subscriber No" value={subscriberId} />
                </div>
                <div className="p-col-4" style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                    <span style={{fontWeight: 600, fontSize: '18px'}}>{userName}</span>
                    <Button icon="pi pi-sign-out" iconPos="right" className="p-button-link p-button-sm" label="Logout" style={{color:"white"}} onClick={() => keycloak?.logout()} />
                </div>
            </div>
        </Sidebar>
    );

}

export default LayoutTop;