import React from "react";

import {ProgressSpinner} from "primereact/progressspinner";

interface ComponentProps {
    message?:string;
    width?:string;
}

const defaultValues:ComponentProps ={
    message:"In progress, please wait.",
    width: "700px"
}
const LoadingComponent: React.FC<ComponentProps> = (props) => {

    return (
        <div className="p-grid p-dir-col" style={{width: props.width, marginTop: "20px", height: "100px"}}>
            <div style={{textAlign:"center"}}>
                <span style={{fontWeight:500}}>{props.message}</span>
            </div>
            <div style={{textAlign:"center"}}>
                <ProgressSpinner strokeWidth="4" style={{width:"27px", height:"27px"}}/>
            </div>
        </div>
    );
};

LoadingComponent.defaultProps = defaultValues;

export default LoadingComponent;