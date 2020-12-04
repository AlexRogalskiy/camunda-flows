import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store';
import LoadingComponent from "../../common/LoadingComponent";
import NetworkDataCard from "./NetworkDataCard";
import NetworkDataCardItem from "./NetworkDataCardItem";
import QuotaUsage from "./QuotaUsage";
import {
	AppThunkDispatch,
	getModemInfo,
	getNpmInfo,
	getOpenTaskDetails,
	getQuotaInfo,
	setNetworkDataInitiated
} from "../../../store/sessionStart/action";
import { OperationResponse } from "../../../store/sessionStart/types";

import bngIcon from "../../../images/icons/bng.svg";
import bngImage from "../../../images/bng.jpg";
import switchIcon from "../../../images/icons/switch.svg";
import switchImage from "../../../images/switch.jpg";
import modemIcon from "../../../images/icons/modem.svg";
import modemImage from "../../../images/hg253s.jpg";
import FoxTaskDetails from "./FoxTaskDetails";
import { ScrollPanel } from "primereact/scrollpanel";
import { Fieldset } from 'primereact/fieldset';

import './NetworkData.scss';

const NetworkData: React.FC = () => {

	let dispatch: AppThunkDispatch = useDispatch();

	//const [networkDataInitiated, setNetworkDataInitiated] = useState<boolean>(false);
	const networkDataInitiated = useSelector((state: RootState) => state.session.networkDataInitiated);

	const [modemInfoOperation, setModemInfoOperation] = useState<string>("Loading");
	const [modemInfoOperationMessage, setModemInfoOperationMessage] = useState<string>("");
	const modemInfo = useSelector((state: RootState) => state.session.modemInfo);

	const [npmInfoOperation, setNpmInfoOperation] = useState<string>("Loading");
	const [npmInfoOperationMessage, setNpmInfoOperationMessage] = useState<string>("");
	const switchInfo = useSelector((state: RootState) => state.session.switchInfo);
	const bngInfo = useSelector((state: RootState) => state.session.bngInfo);

	const [openTaskControlOperation, setOpenTaskControlOperation] = useState<string>("Loading");
	const [openTaskControlOperationMessage, setOpenTaskControlOperationMessage] = useState<string>("");
	const openTaskList = useSelector((state: RootState) => state.session.openTaskList);

	const [quotaInfoOperation, setQuotaInfoOperation] = useState<string>("Loading");
	const [quotaInfoOperationMessage, setQuotaInfoOperationMessage] = useState<string>("");
	const quotaInfo = useSelector((state: RootState) => state.session.quotaInfo);

	const sessionId = useSelector((state: RootState) => state.session.sessionId);

	const modemTheme = modemInfo === null ? "" : modemInfo.online === true ? "success" : "error";
	const switchTheme = switchInfo === null ? "" : switchInfo.switchIp !== null ? "success" : "error";
	const bngTheme = bngInfo === null ? "" : bngInfo.source.toUpperCase() === "NPM" ? "success" : "error";
	const callModemInfo = () => {
		dispatch(getModemInfo()).then(
			(response: OperationResponse) => {
				if (response && response.result === true) {
					setModemInfoOperation("Completed");
				} else {
					setModemInfoOperation("Error");
					if (response) {
						setModemInfoOperationMessage(response.detailedMessage);
					}
				}
			}
		);
	}

	const callOpenTask = () => {
		dispatch(getOpenTaskDetails()).then(
			(response: OperationResponse) => {
				if (response && response.result === true) {
					setOpenTaskControlOperation("Completed");
				} else {
					setOpenTaskControlOperation("Error");
					if (response) {
						setOpenTaskControlOperationMessage(response.detailedMessage);
					}
				}
			}
		);
	}

	const callNpmInfo = () => {
		dispatch(getNpmInfo()).then(
			(response: OperationResponse) => {
				if (response && response.result === true) {
					setNpmInfoOperation("Completed");
				} else {
					setNpmInfoOperation("Error");
					if (response) {
						setNpmInfoOperationMessage(response.detailedMessage);
					}
				}
			}
		);
	}

	const callQuotaUsage = () => {
		dispatch(getQuotaInfo()).then(
			(response: OperationResponse) => {
				if (response && response.result === true) {
					setQuotaInfoOperation("Completed");
				} else {
					setQuotaInfoOperation("Error");
					if (response) {
						setQuotaInfoOperationMessage(response.detailedMessage);
					}
				}
			}
		);
	}

	const runNetworkDataRetrieve = () => {
		callModemInfo();
		callOpenTask();
		callNpmInfo();
		callQuotaUsage();
		// TODO - call get npm Session

		// TODO - call get alarms

		// TODO - call ttariza kontrol

		// TODO - call turksat ariza kontrol
	}

	if (networkDataInitiated === false && sessionId && sessionId !== "") {
		// initiate all network data
		console.log("networkDataInitiated " + networkDataInitiated + ", " + sessionId);
		dispatch(setNetworkDataInitiated());
		runNetworkDataRetrieve();
	}

	return (
		<ScrollPanel style={{ width: '1200px', marginTop: '20px', height: '600px' }}>
			<div className="p-grid">
				<div className="p-col-4">
					<NetworkDataCard theme={bngTheme} header="BNG" imageObject={bngImage} iconObject={bngIcon} >
						{
							npmInfoOperation === "Loading" &&
							<LoadingComponent message="" width="100%" />
						}
						{
							npmInfoOperation === "Error" &&
							<p>BNG bilgisi çekilemedi. {npmInfoOperationMessage} </p>
						}
						{
							npmInfoOperation === "Completed" && bngInfo !== null &&
							<div>
								<NetworkDataCardItem stripped={false} name="Bng Adı" value={bngInfo.bngName} />
								<NetworkDataCardItem stripped={true} name="Bng Port" value={bngInfo.portId} />
								<NetworkDataCardItem stripped={false} name="Son Bağlantı Zamanı" value={bngInfo.lastConnectionDate} />
								<NetworkDataCardItem stripped={true} name="Modem IP" value={bngInfo.ipAddress} />
								<NetworkDataCardItem stripped={false} name="Modem Mac" value={bngInfo.macAddress} />
								<NetworkDataCardItem stripped={true} name="Altyapı" value={bngInfo.context} />
								<NetworkDataCardItem stripped={false} name="Kullanıcı Id" value={bngInfo.userName} />
							</div>
						}
					</NetworkDataCard>
				</div>
				<div className="p-col-4">
					<NetworkDataCard theme={switchTheme} header="SWITCH" imageObject={switchImage} iconObject={switchIcon}>
						{
							npmInfoOperation === "Loading" &&
							<LoadingComponent message="" width="100%" />
						}
						{
							npmInfoOperation === "Error" &&
							<p>Switch bilgisi çekilemedi. {npmInfoOperationMessage} </p>
						}
						{
							npmInfoOperation === "Completed" && switchInfo !== null &&
							<div>
								<NetworkDataCardItem stripped={false} name="Switch Adı" value={switchInfo.switchName} />
								<NetworkDataCardItem stripped={true} name="Switch IP" value={switchInfo.switchIp} />
								<NetworkDataCardItem stripped={false} name="Switch Port" value={switchInfo.switchPort} />
							</div>
						}
					</NetworkDataCard>
				</div>
				<div className="p-col-4">
					<NetworkDataCard theme={modemTheme} header="MODEM" imageObject={modemImage} iconObject={modemIcon}>
						{
							modemInfoOperation === "Loading" &&
							<LoadingComponent message="" width="100%" />
						}
						{
							modemInfoOperation === "Error" &&
							<p>Modem bilgisi çekilemedi. {modemInfoOperationMessage} </p>
						}
						{
							modemInfoOperation === "Completed" && modemInfo !== null &&
							<div>
								<NetworkDataCardItem stripped={false} name="Seri No" value={modemInfo.serialNumber} />
								<NetworkDataCardItem stripped={true} name="Marka" value={modemInfo.vendor} />
								<NetworkDataCardItem stripped={false} name="Model" value={modemInfo.modelName} />
								<NetworkDataCardItem stripped={true} name="Aktivasyon" value={modemInfo.activated === true ? "Aktif" : "Pasif"} />
								<NetworkDataCardItem stripped={false} name="Son Bağlantı Zamanı" value={modemInfo.lastConnectionDate} />
								<NetworkDataCardItem stripped={true} name="IP Adres" value={modemInfo.ipAddress} />
							</div>
						}
					</NetworkDataCard>
				</div>

				<div>
					<div className="p-col-12">
						{
							openTaskControlOperation === "Loading" &&
							<LoadingComponent message="" width="100%" />
						}
						{
							openTaskControlOperation === "Error" &&
							<p><b>Açık task bilgisi çekilemedi.* {openTaskControlOperationMessage}</b> </p>
						}
						{
							openTaskControlOperation === "Completed" &&
							<Fieldset legend="Açık Arıza Kaydı" toggleable className={openTaskList ===null || openTaskList.length === 0 ? "quotaFieldSet-success" : "quotaFieldSet-error"}
							collapsed={openTaskList === null || openTaskList.length === 0}
							>
							{
								(openTaskList === null || openTaskList.length === 0) &&
								<p>Müşterinin açık arıza kaydı bulunmuyor.</p>
							}
							{
								openTaskList !== null && openTaskList.length > 0 &&
								<FoxTaskDetails foxTask={openTaskList[0]} showHeader={false} />
							}
							</Fieldset>
						}
					</div>
					<div className="p-col-12">
						{
							quotaInfoOperation === "Loading" &&
							<LoadingComponent message="" width="100%" />
						}
						{
							quotaInfoOperation === "Error" &&
							<p><b>Kota bilgisi çekilemedi.* {quotaInfoOperationMessage}</b> </p>
						}
						{
							quotaInfoOperation === "Completed" &&
							<Fieldset legend="Kota Aşım Bilgileri"  toggleable className={quotaInfo !== null && quotaInfo.quotaExceed ? "quotaFieldSet-error" : "quotaFieldSet-success"} collapsed={true}>
								{
									quotaInfo !== null && quotaInfo.quatoUsageList !== null && quotaInfo.quatoUsageList.length > 0 &&
									<QuotaUsage quotaInfo={quotaInfo} />
								}
								{
									quotaInfoOperation === "Completed" && (quotaInfo === null || quotaInfo.quatoUsageList === null || quotaInfo.quatoUsageList.length === 0) &&
									<p>Müşterinin kotası bulunmuyor.</p>
								}
							</Fieldset>
						}
					</div>
				</div>
				<div className="p-col-4"></div>
				<div className="p-col-4"></div>
			</div>

		</ScrollPanel>
	)
};

export default NetworkData;