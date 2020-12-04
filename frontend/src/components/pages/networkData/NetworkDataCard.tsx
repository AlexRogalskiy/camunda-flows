import React, {ReactNode, useState} from "react";

import {Panel} from "primereact/panel";

import './NetworkData.scss';
import {Dialog} from "primereact/dialog";

interface ComponentProps{
    theme:string,
    header:string,
    iconObject:any,
    imageObject:any,
    children:ReactNode
}

const NetworkDataCard: React.FC<ComponentProps> = (props) => {

    const [displayImage, setDisplayImage] = useState<boolean>(false);

    let iconObject:JSX.Element= <span></span>;
    let panelClass="defaultPanel";

    if(props.theme === "success"){
        panelClass = panelClass + " successPanel";
        iconObject = <i className="pi pi-check-circle" style={{marginLeft:"10px", fontSize:"18px"}}></i>;
    } else if (props.theme === "error"){
        panelClass = panelClass + " errorPanel";
        iconObject = <i className="pi pi-times-circle" style={{marginLeft:"10px", fontSize:"18px"}}></i>;
    }

    const header =
        <div className="p-grid">
            <div className="p-col-6">
                <a onClick={ () => setDisplayImage(true)}>
                    <div className="p-d-flex clickable-div">
                        <div><img src={props.iconObject} style={{height: '20px', marginLeft:"10px"}}></img></div>
                        <div style={{marginLeft: "15px"}}>{props.header}</div>
                    </div>
                </a>
            </div>
            <div className="p-col-6" style={{display: 'grid', justifyItems: 'end'}}>
                {iconObject}
            </div>
        </div>


    return (
        <Panel header={header} className={panelClass}>
            <div className="p-d-flex p-flex-column" style={{width:'100%'}}>
                {props.children}
            </div>
            <Dialog visible={displayImage} style={{ width: '550px' }} header={props.header} onHide={() => setDisplayImage(false)}>
                <img src={props.imageObject} style={{width: '450px'}} />
            </Dialog>
        </Panel>
    )
};

export default NetworkDataCard;