import React, {useState} from 'react';

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import {getSsidSettingsList} from "../../../../../store/wifiSettings/action";
import LoadingComponent from "../../../../common/LoadingComponent";
import InfoMessage from "../../../../common/InfoMessage";
import {get} from "../../../../messages/Messages";
import {SsidSettings} from "../../../../../store/wifiSettings/types";
import ShowWifiSettings from "./ShowWifiSettings";

const SsidList: React.FC<UITemplateProps> = (props) => {

    const [ssidListInitiated, setSsidListInitiated] = useState<boolean>(false);

    const ssidList:SsidSettings[]|null = useSelector( (state: RootState) =>  state.wifiSettings.ssidList);
    const task = useSelector( (state: RootState) =>  state.wfEngine.task);

    let dispatch = useDispatch();

    if(ssidListInitiated === false) {
        setSsidListInitiated(true);
        dispatch(getSsidSettingsList(task.taskDto.id));
    }

    const show2ndWifi:boolean = ssidList?.length === 2 ? true:false;

    return (
        <UITemplate stepForward={props.stepForward}>
            {
                ssidList &&
                <div>
                    <InfoMessage message={get("kablosuzAgAyarlari.ssidList.info")} width="700px" />
                    <ShowWifiSettings title={show2ndWifi === true ? "Kablosuz Ağ Ayarları (2.4Ghz)" : "Kablosuz Ağ Ayarları"} ssidSettings={ssidList[0]} />
                    {
                        show2ndWifi === true && <ShowWifiSettings title="Kablosuz Ağ Ayarları (5Ghz)" ssidSettings={ssidList[1]} />
                    }
                </div>
            }
            {
                ! ssidList && <LoadingComponent message="Ağ ayarları getiriliyor, lütfen bekleyin." />
            }
        </UITemplate>
    );
};

export default SsidList;