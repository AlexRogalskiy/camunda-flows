import React from 'react';

import SignalButtons from './SignalButtons';
import UITemplateProps from './UITemplateProps';

const UITemplate: React.FC<UITemplateProps> = (props) => {
    
    return (
        <div>
            <div>{props.children}</div>
            <div><SignalButtons stepForward={props.stepForward} /></div>
        </div>
    );
};

export default UITemplate;