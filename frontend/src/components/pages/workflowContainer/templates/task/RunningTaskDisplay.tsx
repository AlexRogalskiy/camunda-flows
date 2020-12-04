import React from 'react';

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import {Card} from "primereact/card";

const RunningTaskDisplay: React.FC<UITemplateProps> = (props) => {

    const openTaskList = useSelector( (state: RootState) =>  state.session.openTaskList);

    const runningTaskList = openTaskList.filter(task => task.isRunning === true);

    // sadece ilkini getir- birden fazla olmasi beklenmedik bir durum
    const runningTask = runningTaskList[0];

    const headerStyle = {
        fontWeight: 500
    }

    return (
        <UITemplate stepForward={props.stepForward}>
            {
                runningTask &&
                <div className="p-grid p-dir-col">
                    <div className="p-col">
                        <div className="p-grid">
                            <div className="p-col-fixed" style={{width: '50px'}}>
                                <i className="pi pi-info-circle" style={{'fontSize': '1.7em'}}></i>
                            </div>
                            <div className="p-col">
                                <span>Müşterinin "Çalışıyor" durumunda bekleyen bir açık arıza kaydı bulunuyor. Bu arıza kaydının geçerli olduğunu Fox uygulaması üzerinden teyit ederek devam edin.</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-col">
                        <Card>
                            <div className="p-grid">
                                <div className="p-col-2" style={headerStyle} >Kayıt Numarası</div>
                                <div className="p-col-4">{runningTask.taskId}</div>
                                <div className="p-col-2" style={headerStyle} >Arıza Kodu</div>
                                <div className="p-col-4">{runningTask.taskIdCode}</div>
                                <div className="p-col-2" style={headerStyle} >Kayıt Durumu</div>
                                <div className="p-col-4">{runningTask.taskStatus}</div>
                                <div className="p-col-2" style={headerStyle} >Arıza Tipi</div>
                                <div className="p-col-4">{runningTask.emptorSubRequestId}</div>
                                <div className="p-col-2" style={headerStyle} >Kayıt Tarihi</div>
                                <div className="p-col-4">{runningTask.taskTarihi}</div>
                                <div className="p-col-2" style={headerStyle} >Kaydı Açan</div>
                                <div className="p-col-4">{runningTask.taskBildirenAdi}</div>
                                <div className="p-col-2" style={headerStyle} >Açıklamalar</div>
                                <div className="p-col-10">{runningTask.descriptionDetail}</div>
                            </div>
                        </Card>
                    </div>
                </div>
            }
        </UITemplate>
    );
};

export default RunningTaskDisplay;