import React from "react";

import { QuotaInfo, QuotaUsageInfo } from "../../../store/sessionStart/types";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface ComponentProps {
	quotaInfo: QuotaInfo,
}

const QuotaUsage: React.FC<ComponentProps> = (props) => {
	let quatoUsageList: QuotaUsageInfo[] = props.quotaInfo.quatoUsageList;
	const defineStatus = (rowData: QuotaInfo) => {
		if (rowData.quotaExceed) {
			return (<div style={{ color: 'red', fontWeight: 'bold' }}>EVET</div>);
		} else {
			return (<div style={{ color: 'green', fontWeight: 'bold' }}>HAYIR</div>);
		}
	}
	//
	return (
		<div>
			{
				<div className="p-grid">
					<DataTable value={quatoUsageList} resizableColumns columnResizeMode="fit"  >
						<Column field="serviceId" header="Servis" style={{ width: '20%' }} />
						<Column field="serviceDefinition" header="Servis Açıklama" style={{ width: '20%' }} />
						<Column field="quotaExceed" header="Kota Aşımı" style={{ width: '15%' }} body={defineStatus} />
						<Column field="download" header="Download" style={{ width: '15%' }} />
						<Column field="upload" header="Upload" style={{ width: '15%' }} />
						<Column field="total" header="Toplam" style={{ width: '15%' }} />
					</DataTable>
				</div>
			}
		</div>
	);
};

export default QuotaUsage;