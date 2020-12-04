import React from "react";

import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

interface ComponentProps {
    message:string;
    isVisible:boolean;
    yesHandler:any;
    noHandler:any;
}

const ConfirmationDialog: React.FC<ComponentProps> = (props) => {

    const dialogFooter =
        <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Evet" icon="pi pi-check p-button-sm" className="contentsMarginRight"
                    onClick={props.yesHandler} />
            <Button label="Hayır" icon="pi pi-times p-button-sm" className="contentsMarginRight"
                    onClick={props.noHandler} />
        </div>;

    return (
        <Dialog visible={props.isVisible} header="Onay" modal={true}
                footer={dialogFooter} onHide={props.noHandler}>
            <p>{props.message}</p>
        </Dialog>
    );
};

export default ConfirmationDialog;