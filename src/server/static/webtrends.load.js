// WebTrends SmartSource Data Collector Tag v10.4.23
// Copyright (c) 2016 Webtrends Inc.  All rights reserved.
// Tag Builder Version: 4.1.3.5
// Created: 2016.01.13
window.webtrendsAsyncInit=function(){
    var dcs=new Webtrends.dcs().init({
        dcsid:"dcs222rfg0jh2hpdaqwc2gmki_9r4q",
        domain:"statse.webtrendslive.com",
        timezone:0,
        i18n:true,
        offsite:true,
        download:true,
        downloadtypes:"xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip",
        javascript: true,
        onsitedoms:"nhs.uk",
        fpcdom:".nhs.uk",
        plugins:{
            hm:{src:"//s.webtrends.com/js/webtrends.hm.js"}
        }
        }).track();
};
(function(){
    var s=document.createElement("script"); s.async=true; s.src="/static/webtrends.min.js";    
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());
