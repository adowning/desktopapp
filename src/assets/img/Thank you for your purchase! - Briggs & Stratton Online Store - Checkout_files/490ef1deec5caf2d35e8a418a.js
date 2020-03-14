(function(){if(!window.$mcSite){$mcSite={};$mcSite.popup_form={settings:{base_url:"mc.us20.list-manage.com",list_id:"291923439a",uuid:"84978d9eeae73011a3cd4bb3a"}};$mcSite.goal={settings:{uuid:"84978d9eeae73011a3cd4bb3a",dc:"us20"}};}})();
(function () {
    if (window.$mcSite === undefined || window.$mcSite.popup_form === undefined) {
        return;
    }

    if (window.location.href.indexOf("checkout.shopify") >= 0) {
        return;
    }

    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        // look for src containing the old embed.js code and bail if it exists
        if (scripts[i].getAttribute("src") === "//s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/embed.js" || scripts[i].getAttribute("src") === "//downloads.mailchimp.com/js/signup-forms/popup/embed.js") {
            return;
        }
    }

    var module = window.$mcSite.popup_form;

    if (module.installed === true) {
        return;
    }

    if (!module.settings) {
        return;
    }

    var settings = module.settings;

    if (!settings.base_url || !settings.uuid || !settings.list_id) {
        return;
    }

    var script = document.createElement("script");

    script.src = "//downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js";
    script.type = "text/javascript";
    script.onload = function () {
        window.dojoRequire(["mojo/signup-forms/Loader"], function (L) { L.start({"baseUrl": settings.base_url, "uuid": settings.uuid, "lid": settings.list_id, "uniqueMethods": true}); });
    };

    document.body.appendChild(script);

    window.$mcSite.popup_form.installed = true;
}());
/* eslint-disable */(function(){if(!window.$mcSite.goal.settings||!!$mcSite.goal.installed){return}var goalParam=null;var goal={getUuid:function(){return $mcSite.goal.settings.uuid},getDC:function(){return $mcSite.goal.settings.dc},process:function(){goalParam=goal.getParameter('goal');if(goalParam&&goal.isValidGoal(goalParam)){goal.createCookie('goal',goalParam,365)}else{goalParam=goal.readCookie('goal')}goal.processPage()},isValidGoal:function(){if(!goalParam)return false;var regex=new RegExp("0_[a-z0-9]+-[a-z0-9]+-[0-9]+");return goalParam.search(regex)===0?true:false},isValidEvent:function(click_event){if(!click_event||click_event==="")return false;return true},isValidSettings:function(){if(!goal.getUuid()||goal.getUuid()==="")return false;if(!goal.getDC()||goal.getDC()==="")return false;return true},isDoNotTrack:function(){if(navigator.doNotTrack==="1")return true;if(navigator.msDoNotTrack==="1")return true;return false},getParameter:function(name){name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regex=new RegExp("[\\?&]"+name+"=([^&#]*)");var results=regex.exec(location.search);return results===null?null:decodeURIComponent(results[1].replace(/\+/g," "))},createCookie:function(c_name,value,exdays,domain){var exdate=new Date();exdate.setDate(exdate.getDate()+exdays);var c_value=escape(value)+((exdays===null)?"":"; expires="+exdate.toUTCString());c_value+=";path=/";document.cookie=c_name+"="+c_value},readCookie:function(c_name){var nameEQ=c_name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length)}return null},processPage:function(){if(!goal.isValidGoal())return;var params={"goal":goalParam};goal.sendData(params)},processEvent:function(click_event){if(!goal.isValidGoal())return;if(!goal.isValidEvent(click_event))return;var params={"goal":goalParam,"event":click_event};goal.sendData(params)},sendData:function(params){if(!goal.isValidSettings())return;if(goal.isDoNotTrack())return;params.title=document.title;params.uuid=goal.getUuid();params=goal.serializeParamters(params);var sp=document.createElement('script');sp.type='text/javascript';sp.async=true;sp.defer=true;sp.src=('https:'==document.location.protocol?'https':'http')+'://goal.'+goal.getDC()+'.list-manage.com/goal/event?'+params;var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(sp,s)},serializeParamters:function(obj,prefix){var str=[];for(var p in obj){var k=prefix?prefix+"["+p+"]":p,v=obj[p];str.push(typeof v=="object"?serialize(v,k):encodeURIComponent(k)+"="+encodeURIComponent(v))}return str.join("&")}};$mcSite.goal.process=goal.process;$mcSite.goal.processEvent=goal.processEvent;$mcSite.goal.installed=true;$mcSite.goal.process()})();
