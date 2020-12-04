import React from "react";

import {FoxTask} from "../../../store/sessionStart/types";
import {Card} from "primereact/card";

interface ComponentProps{
    foxTask:FoxTask,
	showHeader:boolean | true
}

const FoxTaskDetails: React.FC<ComponentProps> = (props) => {

    const headerStyle = {
        fontWeight: 500
    }

    const foxTask:FoxTask = props.foxTask;
	const showHeader:boolean = props.showHeader;

    const header =  <div className="p-d-flex" style={{alignItems: "center", color:'#ffffff', backgroundColor:'#77736e', height:'40px'}}>
        <div><i className="pi pi-cog" style={{marginLeft:"10px", fontSize:"17px"}}></i></div>
        <div style={{marginLeft: "14px"}}>Açık Arıza Kaydı</div>
    </div>;

	let foxData =   <div className="p-grid">
			            <div className="p-col-2" style={headerStyle}>Kayıt Numarası</div>
                        <div className="p-col-4">{foxTask.taskId}</div>
                        <div className="p-col-2" style={headerStyle}>Arıza Kodu</div>
                        <div className="p-col-4">{foxTask.taskIdCode}</div>
                        <div className="p-col-2" style={headerStyle}>Kayıt Durumu</div>
                        <div className="p-col-4">{foxTask.taskStatus}</div>
                        <div className="p-col-2" style={headerStyle}>Arıza Tipi</div>
                        <div className="p-col-4">{foxTask.emptorSubRequestId}</div>
                        <div className="p-col-2" style={headerStyle}>Kayıt Tarihi</div>
                        <div className="p-col-4">{foxTask.taskTarihi}</div>
                        <div className="p-col-2" style={headerStyle}>Kaydı Açan</div>
                        <div className="p-col-4">{foxTask.taskBildirenAdi}</div>
                        <div className="p-col-2" style={headerStyle}>Açıklamalar</div>
                        <div className="p-col-10">{foxTask.descriptionDetail}</div>
                    </div>;

	if(showHeader) {
		foxData =  <Card header={header}> {foxData}</Card>;
	}
	
    return (
        <div>
            {
                foxTask !== null &&
				<div>{foxData}</div>
           }
        </div>
    );
};

export default FoxTaskDetails;