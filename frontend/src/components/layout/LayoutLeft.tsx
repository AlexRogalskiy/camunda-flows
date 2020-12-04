import React from 'react';
import { useSelector } from "react-redux";
import {Sidebar} from 'primereact/sidebar';
import { RootState } from '../../store';

const styles = {
    itemHeader: {
        color: '#ffe000',
        fontWeight: 500
    },
    itemContent:{
        color: '#fff',
        fontWeight: 200
    },
};

const LayoutLeft: React.FC = () => {

    const customerNo = useSelector( (state: RootState) =>  state.session.customerNo);
    const subscriberId = useSelector( (state: RootState) =>  state.session.subscriberId);
    
    return (
        <Sidebar position="left" visible={true} showCloseIcon={false} dismissable={false} modal={false}
                style={{padding:0, backgroundColor:'#0B5FB6', width:'250px'}} onHide={ () => console.log("do nothing")}>
            <div className="p-grid" style={{width: '100%', height:'100%', marginTop:'70px', marginLeft:'10px'}} >
                <div className="p-col-6" style={styles.itemHeader} >Müşteri No</div>
                <div className="p-col-6" style={styles.itemContent}>{customerNo}</div>
                <div className="p-col-6" style={styles.itemHeader}>Hizmet No</div>
                <div className="p-col-6" style={styles.itemContent}>{subscriberId}</div>
                <div className="p-col-6" style={styles.itemHeader}>Altyapı Türü</div>
                <div className="p-col-6" style={styles.itemContent}>Fiber</div>
            </div>
        </Sidebar>
    );

}

export default LayoutLeft;