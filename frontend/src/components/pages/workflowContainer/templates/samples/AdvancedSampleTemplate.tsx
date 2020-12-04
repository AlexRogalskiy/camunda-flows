import React, { useState, FormEvent } from 'react';

import {InputText} from "primereact/inputtext";

import UITemplate from '../../UITemplate';
import UITemplateProps from '../../UITemplateProps';

const AdvancedSampleTemplate: React.FC<UITemplateProps> = (props) => {

    const [pingUrlAddress, setPingUrlAddress] = useState<string>("");

    const stepForward = (signalName:string|null, parameters:Map<string,any>|null) => {
        let submitParameters:Map<string,any> = new Map();
        submitParameters.set("pingUrlAddress", pingUrlAddress);
        props.stepForward(signalName, submitParameters);
    }

    return (
        <UITemplate stepForward={stepForward}>
            <div>
                <p>I am an advanced sample template.</p>
                <p>You can submit below parameter to flow variable.</p>
                <InputText id="pingUrlAddress" value={pingUrlAddress} style={{width:'150px'}}
                    onChange={(e:FormEvent<HTMLInputElement>) => {setPingUrlAddress(e.currentTarget.value)}}  />
            </div>
        </UITemplate>
    );
};

export default AdvancedSampleTemplate;