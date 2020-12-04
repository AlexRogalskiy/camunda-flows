import React from "react";


import './NetworkData.scss';

interface ComponentProps{
    stripped:boolean,
    name:string,
    value:string
}

const NetworkDataCardItem: React.FC<ComponentProps> = (props) => {

    let divClass = "p-grid";
    if(props.stripped === true){
        divClass = divClass + " strippedLine";
    }

    return (
        <div className={divClass} style={{width:'100%', fontSize:'13px'}}>
            <div className="p-col-fixed" style={{width: '150px', fontWeight:600}}>
                {props.name}
            </div>
            <div className="p-col">
                {props.value}
            </div>
        </div>
    )
};

export default NetworkDataCardItem;