import React, {useEffect} from 'react';

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';

const SimpleSampleTemplate: React.FC<UITemplateProps> = (props) => {

    useEffect(()=> {
        console.log("simple sample initiated");
    }, []);

    return (
        <UITemplate stepForward={props.stepForward}>
            <div>
                <p>This is a basic page loaded dynamically via BPMN Forms Key.</p>
            </div>
        </UITemplate>
    );
};

export default SimpleSampleTemplate;