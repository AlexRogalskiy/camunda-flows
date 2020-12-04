import React from 'react';

import {get} from "../../../../messages/Messages";
import { useSelector } from "react-redux";
import { RootState } from '../../../../../store';

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';

const FlowInfoMessage: React.FC<UITemplateProps> = (props) => {

    const task = useSelector( (state: RootState) =>  state.wfEngine.task);

    return (
        <UITemplate stepForward={props.stepForward}>
            <div>
                {
                    task !== null &&
                    <div className="p-d-flex">
                        <div className="p-grid">
                            <div className="p-col-fixed" style={{ width: '50px' }}>
                                <i className="pi pi-info-circle" style={{'fontSize': '1.7em'}}></i>
                            </div>
                            <div className="p-col">
                                {get(task.messageContent)}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </UITemplate>
    );
};

export default FlowInfoMessage;