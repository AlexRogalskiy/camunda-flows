import React, {useState} from 'react';

import {Button} from "primereact/button";
import EditWifiSettings from "./EditWifiSettings";
import {SsidSettings} from "../../../../../store/wifiSettings/types";
import {Panel} from "primereact/panel";
import LoadingModal from "../../../../common/LoadingModal";
import {Messages} from "primereact/messages";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../../../../store";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {setAutoChannel, setSsidSettings} from "../../../../../store/wifiSettings/action";

interface ComponentProps{
    title:string;
    ssidSettings:SsidSettings;
}

const ShowWifiSettings: React.FC<ComponentProps> = (props) => {

    const [editWifi, setEditWifi] = useState<any>(false);
    const [loadingEnabled, setLoadingEnabled] = useState<any>(false);
    const [messages, setMessages] = useState<any>(null);

    let dispatch:ThunkDispatch<RootState, null, AnyAction> = useDispatch();

    const optimizeChannel = (index:string) => {
        setLoadingEnabled(true);
        dispatch(setAutoChannel(props.ssidSettings.index)).then(
            (response:any|null) => {
                if(response !== null && response.result === true){
                    let ssidSettings:SsidSettings = {...props.ssidSettings};
                    ssidSettings.autoChannelEnabled = true;
                    dispatch(setSsidSettings(ssidSettings));
                    messages?.show({ life: 6000, severity: 'success', summary: 'İşlem başarılı. ', detail: 'Kablosuz ağ ayarları iyileştirildi.' });
                } else {
                    messages?.show({ life: 6000, severity: 'error', summary: 'Hata ! ', detail: 'Kablosuz ağ ayarları iyileştirilemedi.' });
                }
                setLoadingEnabled(false);
            }
        );
    }

    return (
        <div style={{width:'700px', height: '350px', marginTop: '3px'}}>
            <Panel header={props.title} >
                <div style={{position: "relative", height: '215px'}}>
                    <LoadingModal visible={loadingEnabled} width="700px" height="240px" />
                    {
                        ! props.ssidSettings &&
                            <p>Ağ ayarları çekilemedi. Tekrar deneyin. (! tekrar deneme butonu eklenecek !)</p>
                    }
                    {
                        editWifi === true && <EditWifiSettings ssidSettings={props.ssidSettings} cancelEdit={() => setEditWifi(false)} setLoading={setLoadingEnabled} messages={messages} />
                    }
                    {
                        editWifi === false && props.ssidSettings &&
                        <div className="p-grid">
                            <div className="p-col-8">
                                <div className="p-field p-grid">
                                    <label className="p-col-fixed headerdiv">Ağ Adı</label>
                                    <div className="p-col">{props.ssidSettings.ssid}</div>
                                </div>
                                <div className="p-field p-grid">
                                    <label className="p-col-fixed headerdiv">Ağ Şifresi</label>
                                    <div className="p-col">{props.ssidSettings.password}</div>
                                </div>
                                <div className="p-field p-grid">
                                    <label className="p-col-fixed headerdiv">Ağ Durumu</label>
                                    <div className="p-col">{props.ssidSettings.enabled === true ? "Açık" : "Kapalı"}</div>
                                </div>
                                <div className="p-field p-grid">
                                    <label className="p-col-fixed headerdiv">Ağ Yayını Gösterimi</label>
                                    <div className="p-col">{props.ssidSettings.ssidAdvertisementEnabled === true ? "Açık" : "Kapalı"}</div>
                                </div>
                                <div className="p-field p-grid">
                                    <label className="p-col-fixed headerdiv">Otomatik Kanal</label>
                                    <div className="p-col">{props.ssidSettings.autoChannelEnabled === true ? "Aktif" : "Pasif"}</div>
                                </div>
                            </div>
                            <div className="p-col-4">
                                <div className="p-grid p-dir-col" style={{backgroundColor: '#eef4ff'}}>
                                    <div className="p-col">
                                        <Button label="Ayarları Değiştir" style={{width: "100%"}}
                                                onClick={() => setEditWifi(true)}/>
                                    </div>
                                    <div className="p-col">
                                        <Button label="Kanal İyileştirme" style={{width: "100%"}}
                                                onClick={(e) => optimizeChannel(props.ssidSettings.index)}/>
                                    </div>
                                    <div className="p-col">
                                        <Button label="SMS Şifre Gönderimi" style={{width: "100%"}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Panel>
            <Messages ref={(el) => setMessages(el)}></Messages>
        </div>
    );
};

export default ShowWifiSettings;