import React from 'react';

import { Button } from "primereact/button";
import { get } from "../../messages/Messages";
import { useSelector } from "react-redux";
import { RootState } from '../../../store';

interface Props {
    stepForward: (signalName:string|null, parameters:Map<string,any>|null) => void
}

const SignalButtons: React.FC<Props> = ({stepForward}) =>  {
    
    let signalButtons = <div/>;
    const task = useSelector( (state: RootState) =>  state.wfEngine.task);
    const processInstanceId = useSelector( (state: RootState) =>  state.wfEngine.processInstanceId);
    
    if(task !== null){
        let availableSignals = task.availableSignals;
        if(availableSignals !== null && availableSignals.length > 0){
            signalButtons = availableSignals.map(function (signalName:string) {
                return signalButtons = <Button key={signalName} label={get("signals." + signalName)} 
                    onClick={() => stepForward(signalName, null)} style={{margin:'10px'}}/>;
            })
        } else {
            signalButtons = <Button label={get("signals.stepForward")} onClick={() => stepForward(null, null)} style={{marginTop:'15px'}}/>;
        }
    }
    
    return (
        <div>
            { processInstanceId !== null && task !== null && signalButtons }
        </div>
    );
};

export default SignalButtons;