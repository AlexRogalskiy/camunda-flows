import React from 'react';
import NetworkData from '../pages/networkData/NetworkData';
import Workflows from '../pages/Workflows';
import LayoutTabPanel from "./LayoutTabPanel";
import SubscriberHistory from "../pages/subscriberHistory/SubscriberHistory";

const LayoutMain: React.FC = () => {

    console.log("LayoutMain is rendered.");

    return (
        <div style={{marginTop:"101px", width:"100%", display: "flex", justifyContent: "center", backgroundColor: '#104e8c'}}>
            <div style={{width:"1300px", display: "flex", justifyContent: "center", backgroundColor:'#ffffff'}}>
                <LayoutTabPanel tabName="networkData">
                    <NetworkData />
                </LayoutTabPanel>
                <LayoutTabPanel tabName="workflows">
                    <Workflows />
                </LayoutTabPanel>
                <LayoutTabPanel tabName="accountHistory">
                    <SubscriberHistory />
                </LayoutTabPanel>
            </div>
        </div>
    );

}

export default LayoutMain;