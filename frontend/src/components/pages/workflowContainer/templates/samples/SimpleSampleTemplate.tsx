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
                <p>I am a simple sample template.</p>
            </div>
        </UITemplate>
    );
};

export default SimpleSampleTemplate;