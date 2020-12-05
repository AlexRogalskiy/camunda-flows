package com.gvnc.camunda.flows.config;

import com.gvnc.camunda.flows.model.*;
import com.gvnc.camunda.flows.util.DateUtil;
import groovy.util.logging.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

@Slf4j
@Service
public class DataService {

    public Subscriber getSubscriber(String customerNo, String subscriberId){
        Subscriber subscriber = new Subscriber();
        subscriber.setCustomerNo(customerNo);
        subscriber.setCustomerName("Jack Sparrow");
        subscriber.setMobilePhone("4478014597554");
        return subscriber;
    }

    public Modem getModem(){
        Modem modem = new Modem();
        modem.setActivated(true);
        modem.setIpAddress("190.12.12.67");
        modem.setVendor("Huawei Technologies Inc");
        modem.setModelName("HG253s");
        modem.setModel("HG253s");
        modem.setSerialNumber("R3U7S14B26002291");
        modem.setProductClass("HG253s");
        modem.setOui("00E0FC");
        modem.setOnline(true);
        modem.setLastConnectionDate(DateUtil.toString(new Date()));
        return modem;
    }

    public NpmInfo getNpmInfo(){
        NpmInfo npmInfo = new NpmInfo();
        npmInfo.setSource("Live");

        BngInfo bngInfo = new BngInfo();
        bngInfo.setBngName("Maidenhead.Router.45");
        bngInfo.setContext("fiber");
        bngInfo.setIpAddress("205.112.90.1");
        bngInfo.setLastConnectionDate(DateUtil.toString(new Date()));
        bngInfo.setPortId("FastEth 1/16");
        bngInfo.setUserName("54169872@tech");
        bngInfo.setMacAddress("12:00:0a:31:22:b4");
        bngInfo.setSource("Live");

        npmInfo.setBngInfo(bngInfo);

        SwitchInfo switchInfo = new SwitchInfo();
        switchInfo.setSwitchIp("85.12.7.105");
        switchInfo.setSwitchName("mh_reading_19.0");
        switchInfo.setSwitchPort("GigabitEth 1/0");

        npmInfo.setSwitchInfo(switchInfo);

        return npmInfo;
    }
}
