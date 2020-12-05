import React, { useState } from 'react';

import {Button} from "primereact/button";
import { startFlow, getTaskByProcessId, completeTask} from "../../../store/workflowEngine/action";
import {get} from "../../messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import LoadingComponent from "../../common/LoadingComponent";
import {ScrollPanel} from "primereact/scrollpanel";

interface WorkflowProps {
    processDefinitionKey:string
}

const WorkflowContainer: React.FC<WorkflowProps> = ({processDefinitionKey}) => {

    let pollInterval:any;

    const task = useSelector( (state: RootState) =>  state.wfEngine.task);
    const processMessage = useSelector( (state: RootState) =>  state.wfEngine.processMessage);
    const processInstanceId = useSelector( (state: RootState) =>  state.wfEngine.processInstanceId);
    const subscriberSessionId = useSelector( (state: RootState) =>  state.session.sessionId);
    const [components, setComponent] = useState<any[]>([]);

    let dispatch:ThunkDispatch<RootState, null, AnyAction> = useDispatch();
    
    const renderComponent = async (componentName:string) => {
        await addComponent(componentName);
    };

    const addComponent = async (type:string) => {
        let componentName = "common/" + type;
        if(type.indexOf("/") > -1){
            componentName = type;
        }
        import(`./templates/${componentName}`)
            .then(component => {
                    let components = [];
                    components.push(component.default);
                    setComponent(components);
                }
            )
            .catch(error => {
                console.error("error =>" + error);
                console.error(JSON.stringify(error));
            });
    };

    const startFlowInstance = () => {
        dispatch(startFlow(processDefinitionKey, subscriberSessionId)).then((pid:string|null) => {
            if(pid !== null){
                startPolling(pid);
            }
        });
    }

    const startPolling = (pid:string) => {
        setComponent([]);
        pollInterval = setInterval(() => { 
            dispatch(getTaskByProcessId(pid)).then((formKey:string|null) =>{
                if(formKey !== null){
                    stopPolling();
                    if(formKey !== "StopPolling"){ // if stop polling, probably end of flow so do not render any component 
                        renderComponent(formKey);
                    }
                }
            });
        }, 1000);
    }

    const stopPolling = () => {
        clearInterval(pollInterval);
    }
    
    const stepForward = (signalName:string|null, parameters:Map<string,any>|null) => {
        if(task !== null){
            dispatch(completeTask(task.taskDto.id, signalName, parameters)).then((result:string|null) =>{
                if(result !== "ERROR" && processInstanceId !== null){
                    startPolling(processInstanceId);
                }
            });
        }
    }

    const renderElement:JSX.Element[] = components.map(Component => (
        <Component key={new Date().getTime().toString()} stepForward={stepForward} />
    ));

    return (
        <div style={{marginTop:'30px', marginLeft:'20px', width:'800px', height: '600px'}}>
            {
                processDefinitionKey !== "" &&
                <div>
                    {
                        processInstanceId === null && processMessage !== null &&

                        <div className="p-d-flex">
                            <div className="p-grid">
                                <div className="p-col-fixed" style={{ width: '50px' }}>
                                    <i className="pi pi-info-circle" style={{'fontSize': '1.7em'}}></i>
                                </div>
                                <div className="p-col">{get(processMessage)}</div>
                            </div>
                        </div>
                    }
                    {
                        processInstanceId === null &&
                        <div style={{display:"inline-flex", alignItems: "center"}}>
                            <span>You can start process "<b>{get(processDefinitionKey)}</b>"</span>
                            <Button label={get("signals.startFlow")} icon="pi pi-play" className="p-button-link p-button-sm" onClick={startFlowInstance}/>
                        </div>
                    }
                    {
                        processInstanceId !== null && task !== null &&

                        <ScrollPanel style={{width: '100%', height:'600px'}}>
                            {renderElement}
                        </ScrollPanel>
                    }
                    {
                        processInstanceId !== null && task === null && <LoadingComponent />
                    }
                </div>
            }
        </div>
    );
};

export default WorkflowContainer;