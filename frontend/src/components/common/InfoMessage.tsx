import React from "react";

import {Message} from "primereact/message";

interface ComponentProps {
    message:string;
    width?:string;
}

const defaultValues:ComponentProps ={
    message:"",
    width: "700px"
}
const InfoMessage: React.FC<ComponentProps> = (props) => {

    return (
        <Message severity="info" text={props.message} style={{width:props.width}} />
    );
};

InfoMessage.defaultProps = defaultValues;

export default InfoMessage;