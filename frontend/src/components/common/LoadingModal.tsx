import React from "react";

import {ProgressSpinner} from "primereact/progressspinner";

interface ComponentProps {
    width?:string;
    height?:string;
    top?:string;
    left?:string;
    visible:boolean;
}

const defaultValues:ComponentProps ={
    visible: false,
    width: "250px",
    height: "250px",
    top: "0px",
    left: "-9px"
}

const LoadingModal: React.FC<ComponentProps> = (props) => {

    return (
        <div>
            {
                props.visible === true &&

                <div className="p-grid p-dir-col" style={{
                    zIndex: 1002,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: props.width,
                    height: props.height,
                    top: props.top,
                    left: props.left
                }} >
                        <ProgressSpinner strokeWidth="4" style={{width:"27px", height:"27px"}}/>
                </div>
            }
        </div>
    );
};

LoadingModal.defaultProps = defaultValues;

export default LoadingModal;