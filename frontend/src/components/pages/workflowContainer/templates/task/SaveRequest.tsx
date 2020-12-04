import React, {useState} from 'react';

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../../../../store";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {getRequestList} from "../../../../../store/subscriberTask/action";
import {WorkflowAction} from "../../../../../store/subscriberTask/types";
import { Dropdown } from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';

const SaveRequest: React.FC<UITemplateProps> = (props) => {

    const [selectedAction, setSelectedAction] = useState<WorkflowAction|null>(null);
    const [actionsRetrieved, setActionsRetrieved] = useState<boolean>(false);
    const [actionList, setActionList] = useState<WorkflowAction[]>([]);

    let dispatch:ThunkDispatch<RootState, null, AnyAction> = useDispatch();

    if(actionsRetrieved === false){
        setActionsRetrieved(true);
        dispatch(getRequestList()).then(
            (response:WorkflowAction[]|null) => {
                if(response !== null ){
                    if(response.length === 1){
                        setSelectedAction(response[0]);
                    }
                    setActionList(response);
                }
            }
        );
    }

    const stepForward = (signalName:string|null, parameters:Map<string,any>|null) => {
        let submitParameters:Map<string,any> = new Map();
        submitParameters.set("actionId", selectedAction?.id);
        props.stepForward(signalName, submitParameters);
    }

    return (
        <UITemplate stepForward={stepForward}>
            {
                selectedAction !== null &&

                <div className="p-grid">
                    <div className="p-col-3">
                        <span>Teşhis Adı</span>
                    </div>
                    <div className="p-col-9">
                        <Dropdown value={selectedAction} options={actionList} optionLabel="crmRequestData.requestName"
                                  onChange={(e) => {setSelectedAction(e.value)}} placeholder="Teşhis seçiniz."/>
                    </div>
                    <div className="p-col-3">
                        <span>Teşhis Açıklama</span>
                    </div>
                    <div className="p-col-9">
                        <InputTextarea rows={4} cols={40} defaultValue={selectedAction.workflowRequest.description} readOnly={true} />
                    </div>
                </div>
            }
        </UITemplate>
    );
};

export default SaveRequest;