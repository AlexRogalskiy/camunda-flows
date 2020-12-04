import React from 'react';

import {get} from "../../../../messages/Messages";
import { useSelector } from "react-redux";
import { RootState } from '../../../../../store';

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';

const SaveRequestResult: React.FC<UITemplateProps> = (props) => {

    const task = useSelector( (state: RootState) =>  state.wfEngine.task);

    return (
        <UITemplate stepForward={props.stepForward}>
            <div>
                {
                    task !== null &&
                    <div>
                        {
                            task.requestLogId !== null && <p>Talebe istinaden CRM üzerinde {task.requestLogId} numaralı kayıt oluşturulmuştur.</p>
                        }
                        {
                            task.requestLogId === null && <p style={{color:'red'}}>{get(task.requestCreateMessage)}</p>
                        }
                        <p>Akışın tamamlanması için <b>Akışı Sonlandır</b> seçeneği ile ilerleyin.</p>
                    </div>
                }
            </div>
        </UITemplate>
    );
};

export default SaveRequestResult;