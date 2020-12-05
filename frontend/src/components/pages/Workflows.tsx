import React, {useState} from "react";

import { Tree } from 'primereact/tree';

import ConfirmationDialog from "../common/ConfirmationDialog";
import WorkflowContainer from './workflowContainer/WorkflowContainer';
import TreeNode from "primereact/components/treenode/TreeNode";
import { workflowTreeList } from './WorkflowTreeList';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {get} from "../messages/Messages";
import {cancelRunningProcess} from "../../store/workflowEngine/action";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

let selectedTreeNode:TreeNode;

const Workflows: React.FC = () => {

    const [selectedFlow, setSelectedFlow] = useState<string>("");
    const [expandedKeys, setExpandedKeys] = useState<any>({});
    const [displayConfirmation, setDisplayConfirmation] = useState<any>(false);
    const processInstanceId = useSelector( (state: RootState) =>  state.wfEngine.processInstanceId);

    let dispatch:ThunkDispatch<RootState, null, AnyAction> = useDispatch();

    const onTreeNodeSelect = (e:{originalEvent:Event, node:TreeNode}) => {
        let selectedNode:TreeNode = e.node;
        selectedTreeNode = selectedNode;
        if(selectedNode.children.length === 0){
            // check if this is different than selected flow
            if(selectedFlow === ""){
                setSelectedFlow(selectedNode.key);
            } else if(selectedFlow !== selectedNode.key){
                if(processInstanceId === null){
                    setSelectedFlow(selectedNode.key);
                }else {
                    setDisplayConfirmation(true);
                }
            }
        } else{
            if(expandedKeys[selectedNode.key]){
                setExpandedKeys({});
            } else{
                setExpandedKeys({[selectedNode.key]: true});
            }
        }
    }

    const nodeTemplate = (node:TreeNode) => {
        if(node.data === "subcategory"){
            return <span style={{fontSize:'13px'}}>{node.label}</span>;
        } else {
            return <span style={{fontSize:'15px', fontWeight:500}}>{node.label}</span>;
        }
    }

    const confirmationDialogMessage =+ get(selectedFlow) + " process will terminate to start a new process, do you approve ?"

    const cancelCurrentFlowAndStartNew = () => {
        if(processInstanceId !== null){
            dispatch(cancelRunningProcess(processInstanceId));
        }
        setSelectedFlow(selectedTreeNode.key);
        setDisplayConfirmation(false);
    }

    return (
        <div style={{width: '1200px'}} className="p-grid">
            <div>
                <Tree value={workflowTreeList} style={{width: '300px',height:'600px'}} nodeTemplate={nodeTemplate}
                      selectionMode="single" selectionKeys={selectedFlow} onSelect={onTreeNodeSelect}
                      expandedKeys={expandedKeys} onToggle={e => setExpandedKeys(e.value)} />
            </div>
            <div>
                <WorkflowContainer processDefinitionKey={selectedFlow} />
            </div>
            <ConfirmationDialog message={confirmationDialogMessage} isVisible={displayConfirmation}
                                yesHandler={cancelCurrentFlowAndStartNew} noHandler={ () => setDisplayConfirmation(false)} />
        </div>
    )
};

export default Workflows;