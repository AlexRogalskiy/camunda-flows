import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store';
import LoadingComponent from "../../common/LoadingComponent";
import NetworkDataCard from "./NetworkDataCard";
import NetworkDataCardItem from "./NetworkDataCardItem";

import {
	AppThunkDispatch,
	getModemInfo,
	getNpmInfo,
	setNetworkDataInitiated
} from "../../../store/sessionStart/action";
import { OperationResponse } from "../../../store/sessionStart/types";

import bngIcon from "../../../images/icons/bng.svg";
import bngImage from "../../../images/bng.jpg";
import switchIcon from "../../../images/icons/switch.svg";
import switchImage from "../../../images/switch.jpg";
import modemIcon from "../../../images/icons/modem.svg";
import modemImage from "../../../images/hg253s.jpg";
import { ScrollPanel } from "primereact/scrollpanel";

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

	const runNetworkDataRetrieve = () => {
		callModemInfo();
		callNpmInfo();
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
								<NetworkDataCardItem stripped={false} name="Bng Name" value={bngInfo.bngName} />
								<NetworkDataCardItem stripped={true} name="Bng Port" value={bngInfo.portId} />
								<NetworkDataCardItem stripped={false} name="Last Contact" value={bngInfo.lastConnectionDate} />
								<NetworkDataCardItem stripped={true} name="Modem IP" value={bngInfo.ipAddress} />
								<NetworkDataCardItem stripped={false} name="Modem Mac" value={bngInfo.macAddress} />
								<NetworkDataCardItem stripped={true} name="Context" value={bngInfo.context} />
								<NetworkDataCardItem stripped={false} name="Username" value={bngInfo.userName} />
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
								<NetworkDataCardItem stripped={false} name="Switch Name" value={switchInfo.switchName} />
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
								<NetworkDataCardItem stripped={false} name="Serial Number" value={modemInfo.serialNumber} />
								<NetworkDataCardItem stripped={true} name="Vendor" value={modemInfo.vendor} />
								<NetworkDataCardItem stripped={false} name="Model" value={modemInfo.modelName} />
								<NetworkDataCardItem stripped={true} name="Activation" value={modemInfo.activated === true ? "Active" : "Passive"} />
								<NetworkDataCardItem stripped={false} name="Last Contact" value={modemInfo.lastConnectionDate} />
								<NetworkDataCardItem stripped={true} name="IP Adress" value={modemInfo.ipAddress} />
							</div>
						}
					</NetworkDataCard>
				</div>
			</div>

		</ScrollPanel>
	)
};

export default NetworkData;