import React from 'react';

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';

const OpenTaskDisplay: React.FC<UITemplateProps> = (props) => {

    return (
        <UITemplate stepForward={props.stepForward}>
            <div className="p-grid p-dir-col">
                <div className="p-col">
                    <div className="p-grid">
                        <div className="p-col-fixed" style={{width: '50px'}}>
                            <i className="pi pi-info-circle" style={{'fontSize': '1.7em'}}></i>
                        </div>
                        <div className="p-col">
                            <span>Müşterinin durumunda bekleyen bir açık arıza kaydı bulunuyor. Açıklama alanında belirtilen bilgileri müşteri ile paylaşıp akışı sonlandırın.</span>
                        </div>
                    </div>
                </div>
                <div className="p-col">acik task
                </div>
            </div>
        </UITemplate>
    );
};

export default OpenTaskDisplay;