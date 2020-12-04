import React from 'react';

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import FoxTaskDetails from "../../../networkData/FoxTaskDetails";

const OpenTaskDisplay: React.FC<UITemplateProps> = (props) => {

    // TODO - yeniden getir open task listesini
    // running task cikarildiktan sonra liste degismis olabilir !!
    //
    const openTaskList = useSelector( (state: RootState) =>  state.session.openTaskList);

    const openTask = openTaskList[0];

    return (
        <UITemplate stepForward={props.stepForward}>
            {
                openTask &&
                <div className="p-grid p-dir-col">
                    <div className="p-col">
                        <div className="p-grid">
                            <div className="p-col-fixed" style={{width: '50px'}}>
                                <i className="pi pi-info-circle" style={{'fontSize': '1.7em'}}></i>
                            </div>
                            <div className="p-col">
                                <span>Müşterinin "{openTask.taskStatus}" durumunda bekleyen bir açık arıza kaydı bulunuyor. Açıklama alanında belirtilen bilgileri müşteri ile paylaşıp akışı sonlandırın.</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-col">
                        <FoxTaskDetails foxTask={openTask} showHeader={true}/>
                    </div>
                </div>
            }
        </UITemplate>
    );
};

export default OpenTaskDisplay;