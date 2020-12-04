import React from 'react';

import { ReactNode } from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store";

interface ComponentProps {
    tabName: string,
    children: ReactNode
}

const LayoutTabPanel: React.FC<ComponentProps> = (props) => {

    const activeTabName = useSelector( (state: RootState) =>  state.session.activeTabName);
    console.log("LayotTabPanel is rendered = " + props.tabName);

    let divStyle = {};
    if(activeTabName !== props.tabName){
        divStyle = {display:"none"};
    }

    return (
        <div style={divStyle}>
            {props.children }
        </div>
    );
}

export default LayoutTabPanel;