import React from 'react';
import NetworkData from '../pages/networkData/NetworkData';
import Workflows from '../pages/Workflows';
import LayoutTabPanel from "./LayoutTabPanel";
import SubscriberHistory from "../pages/subscriberHistory/SubscriberHistory";

const LayoutMain: React.FC = () => {

    console.log("LayoutMain is rendered.");

    //const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight + "px");

    const updateWidthAndHeight = () => {
        //setWidth(window.innerWidth);
        if(window.innerHeight > 600)
            setHeight(window.innerHeight + "px");
    };

    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });

    //console.log("height ", height);

    return (
        <div style={{marginTop:"101px", width:"100%", display: "flex", justifyContent: "center", backgroundColor: '#104e8c'}}>
            <div style={{width:"1300px", height: height, display: "flex", justifyContent: "center", backgroundColor:'#ffffff'}}>
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