-- below script is not part of solid project, only exist for development and test

create schema if not exists radius_archive;

DROP TABLE IF EXISTS radius_archive.npm_accounting_new;
CREATE TABLE radius_archive.npm_accounting_new(
		 id INT AUTO_INCREMENT primary key,
		 nas_user_name VARCHAR(256),
		 NAS_IDENTIFIER  VARCHAR(256) ,
		 FRAMED_IP_ADDRESS  VARCHAR(100),
		 MAC_ADDRESS  VARCHAR(100),
		 MEDIUM_TYPE  VARCHAR(256),
		 NAS_PORT_ID  VARCHAR(256),
		 CONTEXT_NAME  VARCHAR(256),
		 SUBSCRIBER_ACCOUNT  VARCHAR(256),
		 NAS_IP_ADDRESS  VARCHAR(256) ,
		 PART_DATE_YYYYMMDD  VARCHAR(50),
		 ACCT_TIME_STAMP_DATE timestamp,
		 CALLING_STATION_ID  VARCHAR(256),
		 SESSION_ERROR_MSG VARCHAR(256),
		 ACCT_SESSION_ID VARCHAR(256),
		 ACCT_STATUS_TYPE VARCHAR(256),
		 ACCT_STATUS_TYPE_NEW int,
		 SERVICE_IDS varchar(1000),
		 ACCT_INPUT_OCTETS_64 numeric,
		 ACCT_OUTPUT_OCTETS_64 numeric
);

insert into radius_archive.npm_accounting_new(
		 nas_user_name,
		 NAS_IDENTIFIER   ,
		 FRAMED_IP_ADDRESS  ,
		 MAC_ADDRESS  ,
		 MEDIUM_TYPE  ,
		 NAS_PORT_ID  ,
		 CONTEXT_NAME ,
		 SUBSCRIBER_ACCOUNT  ,
		 NAS_IP_ADDRESS   ,
		 PART_DATE_YYYYMMDD  ,
		 ACCT_TIME_STAMP_DATE ,
		 CALLING_STATION_ID  )
values
	('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 12',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200716', PARSEDATETIME('16/07/2020 17:55:24', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

     ('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 2',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200716', PARSEDATETIME('16/07/2020 17:56:59', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

   ('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 16',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200727', PARSEDATETIME('27/07/2020 03:33:25', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

   ('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 16',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200727', PARSEDATETIME('27/07/2020 15:33:25', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

   ('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 16',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200728', PARSEDATETIME('28/07/2020 03:33:25', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

   ('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 16',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200728', PARSEDATETIME('28/07/2020 15:33:25', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

   ('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 12',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200713', PARSEDATETIME('13/07/2020 01:32:06', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

   ('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 12',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200713', PARSEDATETIME('13/07/2020 13:32:06', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

   ('101355672855@fiber','nw_rt_ssr8010_05_41gebz', '212.252.21.84', 'b4:30:52:9d:e9:d7', 'DSL', 'lg PPPoE_LAG2 vlan-id 1036 pppoe 12',
    'fiber', '101355672855@fiber', '212.57.0.130', '20200714', PARSEDATETIME('14/07/2020 01:32:06', 'dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

    ('110075496088@fiber', 'nw_rt_ssr8010_02.07antl', '100.65.99.93', '8c:15:c7:97:e2:b5', 'DSL', 'lg PPPoE_LAG2 vlan-id 1187 pppoe 611',
    'cgn', '110075496088@fiber', '212.57.0.180', '20200716', PARSEDATETIME('16/07/2020 16:38:57','dd/MM/yyyy hh:mm:ss'),
    'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

     ('110076864813@tsat', 'nw_rt_ssr8010_01_01syhn', '151.250.65.160', NULL, 'DSL',
    'L2TP LNS 311681', 'dsl', '110076864813@tsat', '212.57.0.50', '20200716',
    PARSEDATETIME('16/07/2020 16:38:55','dd/MM/yyyy hh:mm:ss'), 'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

   ('110078309412@fiber', 'nw_rt_ssr8010_01.07antl', '10.13.85.210', 'f4:e3:fb:b1:51:34', 'DSL',
    'lg PPPoE_LAG1 vlan-id 712 pppoe 168', 'cgn', '110078309412@fiber', '212.57.0.170', '20200716',
    PARSEDATETIME('16/07/2020 16:38:53','dd/MM/yyyy hh:mm:ss'),'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),


   ('110078369705@dsmart', 'nw_rt_ssr8010_02_06sgtz', NULL, '44:fb:5a:c8:13:74', 'DSL',
    'lg PPPoE_LAG8 vlan-id 2464:77 pppoe 1', 'dsmart', '110078369705@dsmart', '213.14.0.220', '20200716',
    PARSEDATETIME('16/07/2020 16:38:46','dd/MM/yyyy hh:mm:ss'), 'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),


   ('110078885702@fiber', 'nw_rt_ssr8010_03.35brnv', '100.77.198.29', 'c8:5a:9f:d9:25:94', 'DSL',
    'lg PPPoE_LAG5 vlan-id 750:4036 pppoe 1', 'cgn', '110078885702@fiber', '212.57.0.30', '20200716',
    PARSEDATETIME('16/07/2020 16:38:56','dd/MM/yyyy hh:mm:ss'), 'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),


   ('110079339945@fiber', 'nw_rt_bngne40_Cluster01_06andc', '100.73.199.98', '44:fb:5a:c7:62:a8', NULL,
    'nw_gp_ol56_01.61bsrl 0/7/0/7/11.1.1.100', 'cgnfiber', '110079339945@fiber', '92.45.0.71', '20200716',
    PARSEDATETIME('16/07/2020 16:38:50','dd/MM/yyyy hh:mm:ss'), 'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),


   ('110079999889@fiber', 'nw_rt_ssr8010_03.35brnv', '100.77.198.26', '44:fb:5a:e7:44:f8', 'DSL',
    'lg PPPoE_LAG1_red vlan-id 735 pppoe 2', 'cgn', '110079999889@fiber', '212.57.0.30', '20200716',
    PARSEDATETIME('16/07/2020 16:38:53','dd/MM/yyyy hh:mm:ss'), 'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),


   ('110080620525@fiber', 'nw_rt_ssr8010_03_01syhn', '10.241.105.253', 'dc:f8:b9:83:6e:9c', 'DSL',
    'lg PPPoE_LAG5 vlan-id 1908:1753 pppoe 2', 'cgn', '110080620525@fiber', '212.57.0.70', '20200716',
    PARSEDATETIME('16/07/2020 16:38:53','dd/MM/yyyy hh:mm:ss'), 'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),


   ('110081271647@tsat', 'nw_rt_ssr8010_02_06sgtz', '217.131.152.25', NULL, 'DSL',
    'L2TP LNS 25156', 'dsl', '110081271647@tsat', '213.14.0.220', '20200716',
    PARSEDATETIME('16/07/2020 16:38:58','dd/MM/yyyy hh:mm:ss'), 'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17'),

    ('101355672855@fiber', 'nw_rt_ssr8010_02_06sgtz', '217.131.152.25', NULL, 'DSL',
    'L2TP LNS 25156', 'dsl', '101355672855@fiber', '213.14.0.220', '20200716',
    PARSEDATETIME('16/07/2020 16:38:58','dd/MM/yyyy hh:mm:ss'), 'b4-30-52-9d-e9-d7#nw_rt_ssr8010_05_41gebz#256/37#1036#nw_sf_5321_a1.34_mltp_trkcll_c#GigabitEthernet0/0/17')
    ;

	update radius_archive.npm_accounting_new set SESSION_ERROR_MSG = null, ACCT_SESSION_ID ='123456', ACCT_STATUS_TYPE='test', ACCT_STATUS_TYPE_NEW =1 where id<10;
    update radius_archive.npm_accounting_new set SESSION_ERROR_MSG = 'tets13221', ACCT_SESSION_ID ='123456', ACCT_STATUS_TYPE='test', ACCT_STATUS_TYPE_NEW =2 where id>=10 and id<20;
    update radius_archive.npm_accounting_new set ACCT_STATUS_TYPE_NEW =3,SERVICE_IDS='123456',ACCT_INPUT_OCTETS_64=998989,ACCT_OUTPUT_OCTETS_64=9898998 where id>=15 ;



