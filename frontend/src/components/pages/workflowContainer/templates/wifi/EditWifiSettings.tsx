import React, {useEffect, useState} from 'react';
import {SsidSettings} from "../../../../../store/wifiSettings/types";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {useDispatch} from "react-redux";
import {saveSsidSettings, setSsidSettings} from "../../../../../store/wifiSettings/action";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../../../../store";
import {AnyAction} from "redux";
import {Messages} from "primereact/messages";

interface ComponentProps{
    ssidSettings:SsidSettings;
    setLoading:(loadingEnabled:boolean) => void;
    cancelEdit:() => void;
    messages:Messages|null;
}
const EditWifiSettings: React.FC<ComponentProps> = (props) => {

    const [ssid, setSsid] = useState<any>(props.ssidSettings.ssid);
    const [password, setPassword] = useState<any>(props.ssidSettings.password);
    const [enabled, setEnabled] = useState<boolean>(props.ssidSettings.enabled);
    const [advertisementEnabled, setAdvertisementEnabled] = useState<boolean>(props.ssidSettings.ssidAdvertisementEnabled);
    const [autoChannelEnabled] = useState<boolean>(props.ssidSettings.autoChannelEnabled);

    let dispatch:ThunkDispatch<RootState, null, AnyAction> = useDispatch();

    const saveSettings = () => {
        let requestBody = {
            bandSteeringEnabled: props.ssidSettings.bandSteeringEnabled,
            ssid: ssid === props.ssidSettings.ssid ? null : ssid,
            password: password === "********" ? null : password,
            enabled: enabled === props.ssidSettings.enabled ? null : enabled,
            advertisementEnabled: advertisementEnabled === props.ssidSettings.ssidAdvertisementEnabled ? null : advertisementEnabled
        }

        props.setLoading(true);
        dispatch(saveSsidSettings(props.ssidSettings.index, requestBody)).then(
            (response:any|null) => {
                if(response !== null && response.result === true){
                    // success message
                    let updatedSsidSettings:SsidSettings = {...props.ssidSettings};
                    updatedSsidSettings.ssid = requestBody.ssid === null ? props.ssidSettings.ssid : requestBody.ssid;
                    updatedSsidSettings.enabled = requestBody.enabled === null ? props.ssidSettings.enabled : requestBody.enabled;
                    updatedSsidSettings.ssidAdvertisementEnabled = requestBody.advertisementEnabled === null ? props.ssidSettings.ssidAdvertisementEnabled : requestBody.advertisementEnabled;

                    dispatch(setSsidSettings(updatedSsidSettings));
                    props.cancelEdit();
                    props.messages?.show({ life: 6000, severity: 'success', summary: 'İşlem başarılı. ', detail: 'Ayarlar kaydedildi.' });
                } else {
                    // error message
                    props.messages?.show({ life: 6000, severity: 'error', summary: 'Hata ! ', detail: 'Ayarlar kaydedilemedi.' });
                }
                props.setLoading(false);
            }
        );
    }

    useEffect(()=> {
        console.log("EditWifiSettings initiated " + JSON.stringify(props.ssidSettings));
    }, []);

    return (
        <div className="p-grid">
            <div className="p-col-8">
                <div className="p-field p-grid">
                    <label htmlFor="ssidName" className="p-col-fixed headerdiv">Ağ Adı</label>
                    <div className="p-col">
                        <InputText id="ssidName" type="text" className="p-inputtext-sm" value={ssid}
                                   onChange={(e) => setSsid(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="ssidPassword" className="p-col-fixed headerdiv">Ağ Şifresi</label>
                    <div className="p-col">
                        <InputText id="ssidPassword" type="text" className="p-inputtext-sm" value={password}
                                   onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="ssidEnabled" className="p-col-fixed headerdiv">Ağ Durumu</label>
                    <div className="p-col">
                        <Checkbox id="ssidEnabled" inputId="binary" checked={enabled} onChange={(e) => setEnabled(e.checked)} />
                        <span style={{marginLeft: "10px"}}>{enabled === true ? "Açık" : "Kapalı"}</span>
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="ssidAdvertisementEnabled" className="p-col-fixed headerdiv">Ağ Yayını Gösterimi</label>
                    <div className="p-col">
                        <Checkbox id="ssidAdvertisementEnabled" inputId="binary" checked={advertisementEnabled} onChange={(e) => setAdvertisementEnabled(e.checked)} />
                        <span style={{marginLeft: "10px"}}>{advertisementEnabled === true ? "Açık" : "Kapalı"}</span>
                    </div>
                </div>
                <div className="p-field p-grid">
                    <label htmlFor="ssidAutoChannelEnabled" className="p-col-fixed headerdiv">Otomatik Kanal</label>
                    <div className="p-col">
                        <Checkbox id="ssidAutoChannelEnabled" inputId="binary" checked={autoChannelEnabled} disabled={true} />
                        <span style={{marginLeft: "10px"}}>{autoChannelEnabled === true ? "Aktif" : "Pasif"}</span>
                    </div>
                </div>
            </div>
            <div className="p-col-4">
                <div className="p-grid p-dir-col" style={{backgroundColor: '#eef4ff'}}>
                    <div className="p-col">
                        <Button label="Kaydet" style={{width: "100%"}} onClick={() => saveSettings()}/>
                    </div>
                    <div className="p-col">
                        <Button label="İptal" style={{width: "100%"}} onClick={() => props.cancelEdit()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditWifiSettings;