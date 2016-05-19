App.componentRes['component/alloy_lever/index.html'] =
'<style scoped type="text/css">\
    * {\
        box-sizing: border-box;\
        font-size : 13px;\
    }\
\
     .at-ctn {\
        position: fixed;\
        min-height: 55%;\
        left: 0;\
        right: 0;\
        bottom: 0;\
        z-index: 10001;\
        background-color: #F3F3F3\
    }\
\
     .at-tabs {\
        border-top: 1px solid #A3A3A3;\
        border-bottom: 1px solid #A3A3A3;\
        height: 40px;\
        overflow: hidden;\
    }\
\
    .at-tabs .at-tab {\
        float: left;\
        min-width: 50px;\
        text-align: center;\
        line-height: 40px;\
        padding: 0 10px;\
        border-right: 1px solid #CCC;\
        text-decoration: none;\
        color: #333\
    }\
\
     .at-tabs .at-tab.at-active {\
        background-color: #fff\
    }\
\
     .at-content {\
        background-color: #fff;\
        overflow-x: auto;\
        overflow-y: auto;\
        position: absolute;\
        top: 40px;\
        left: 0;\
        right: 0;\
        bottom: 40px;\
        -webkit-overflow-scrolling: touch\
    }\
\
    .at-logs {\
        display: none;\
        position: relative;\
        height: 100%\
    }\
\
     .at-logs .at-item {\
        margin: 0;\
        padding: 6px 8px;\
        line-height: 1.3;\
        border-bottom: 1px solid #eee;\
        word-break: break-word\
    }\
\
    .at-logs .at-item-info {\
        color: green\
    }\
\
   .at-logs .at-item-debug {\
        color: #1C00CF\
    }\
\
    .at-logs .at-item-warn {\
        color: #5C3B00;\
        border-color: #FFF5C2;\
        background-color: #FFFBE6\
    }\
\
     .at-logs .at-item-error {\
        color: #FF0000;\
        border-color: #FFD7D7;\
        background-color: #FFF0F0\
    }\
\
    .at-logs.at-active {\
        display: block\
    }\
\
    .at-toolbar {\
        background-color: #F3F3F3;\
        border-top: 1px solid #C1C1C1;\
        line-height: 40px;\
        -height: 40px;\
        position: absolute;\
        left: 0;\
        right: 0;\
        bottom: 0;\
        overflow: hidden\
    }\
\
     .at-toolbar .at-tool {\
        text-decoration: none;\
        color: #333;\
        width: 50%;\
        float: left;\
        text-align: center;\
        position: relative\
    }\
\
     .at-toolbar .at-tool:after {\
        content: " ";\
        position: absolute;\
        top: 7px;\
        bottom: 7px;\
        right: 0;\
        border-left: 1px solid #C1C1C1\
    }\
\
    .at-toolbar .at-tool-right:after {\
        border: none\
    }\
\
    .at-hide {\
        display: none;\
    }\
    .at-about{\
        font-weight: bold;\
        font-size: 20px;\
        line-height: 60px;\
        text-indent: 20px;\
    }\
\
    .at-entry{\
        cursor: pointer;\
        position: fixed;\
        z-index: 10002;\
        width: 80px;\
        height: 40px;\
        line-height: 40px;\
        text-align: center;\
        font-weight: bold;\
        bottom: 40px;\
        right: 10px;\
        border-radius: 20px 8px;\
        background-color: black;\
        color: white;\
    }\
\
    .at-entry-active{\
        background-color: #5C5C5C;\
    }\
\
    .at-item-log .at-url{\
        color:lightseagreen;\
\
    }\
\
    .at-url span{\
        color:lightseagreen;\
        font-weight: bold;\
    }\
\
    .at-sub-dt{\
        text-indent :20px;\
    }\
</style>\
\
<div class="at-entry" nc-id="atEntry" onclick="toggleEntry()"  ontouchstart="touchStart(event)" style="transform: translate3d({{tx}}px,{{ty}}px,0px);-webkit-transform: translate3d({{tx}}px,{{ty}}px,0px);">AlloyLever</div>\
<div class="at-ctn {{#hide}}at-hide{{/hide}}">\
    <div class="at-tabs">\
        <a class="at-tab {{tab1}}" onclick="goto(1,event)"  href="javascript:;">Console</a>\
        <a class="at-tab {{tab2}}" onclick="goto(2,event)"  href="javascript:;">XHR</a>\
        <a class="at-tab {{tab3}}" onclick="goto(3,event)"  href="javascript:;">Resources</a>\
        <a class="at-tab {{tab4}}" onclick="goto(4,event)"   href="javascript:;">Timeline</a>\
    </div>\
    <div class="at-content">\
        <div class="at-logs {{content1}}">\
            <div class="at-log">\
                {{#logs}} <pre class="at-item at-item-{{type}}">{{msg}}</pre> {{/logs}}\
            </div>\
        </div>\
        <div class="at-logs {{content2}}">\
            {{#xhrs}}\
                <div class="at-item at-item-log">\
                    <div class="at-url"><div></div><span>[Request Url]</span></div>\
                    <div class="at-sub-dt"><span>{{method}}</span>: {{rqsUrl}}</div>\
                </div>\
                <div class="at-item at-item-log">\
                    <div  class="at-url"><span>[Response Url]</span></div>\
                   <div class="at-sub-dt">{{rspUrl}}</div>\
                </div>\
                <div class="at-item at-item-log">\
                    <div  class="at-url"><span>[Response Data]</span></div>\
                    <pre class="at-json"><code>{{json}}</code></pre>\
                </div>\
            {{/xhrs}}\
        </div>\
        <div class="at-logs {{content3}}">\
            <div class="at-item at-item-log">\
                <div class="at-url">Cookie</div>\
                <pre class="at-json"><code>{{resources.cookie}}</code></pre>\
            </div>\
            <div class="at-item at-item-log">\
                <div class="at-url">LocalStorage</div>\
                <pre class="at-json"><code>{{resources.storage}}</code></pre>\
            </div>\
        </div>\
        <div class="at-logs {{content4}}">\
            <div class="at-log">\
                {{#timeline}} <p class="at-item at-item-log">{{msg}}</p> {{/timeline}}\
            </div>\
        </div>\
    </div>\
    <div class="at-toolbar">\
        <a href="javascript:;" onclick="clearLogs()" class="at-tool at-clear">Clear</a><a href="https://github.com/AlloyTeam/Nuclear" class="at-tool at-tool-right">Powered By Nuclear</a>\
    </div>\
</div>';

;(function () {
    var tpl = App.loadFile("component/alloy_lever/index.html");

    var AlloyLever = Nuclear.create({
        install: function () {
            this.initConsole();
            this.initError();
            this.initXHR();

            this.initNetWork();
            this.initCookie();
            this.initStorage();

        },
        initXHR:function(){
            (function(open){
                window.XMLHttpRequest.prototype.open=function(){
                    this.alloyLeverMethod=arguments[0];
                    this.alloyLeverUrl=arguments[1];
                    open.apply(this,arguments);
                }
            })(window.XMLHttpRequest.prototype.open)

            var XHR = window.XMLHttpRequest;

            window.XMLHttpRequest=function(){
                var xhr = new XHR();
                checkSuccess(xhr);
                return xhr;
            };

            window.XMLHttpRequest.realXHR = XHR;

            var self=this;

            function checkSuccess(xhr) {
                var isAvailable = true;
                try {
                    var xx = xhr.status;
                } catch (e) {
                    isAvailable = false;
                };
                if (isAvailable) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        try {
                            self.option.xhrs.realPush({
                                method: xhr.alloyLeverMethod,
                                rqsUrl: xhr.alloyLeverUrl,
                                rspUrl: xhr.responseURL,
                                json: JSON.stringify(JSON.parse(xhr.responseText), null, "\t")
                            })
                        } catch (e) {
                            self.option.xhrs.realPush({
                                method: xhr.alloyLeverMethod,
                                rqsUrl: xhr.alloyLeverUrl,
                                rspUrl: xhr.responseURL,
                                json: xhr.responseText})
                        }
                    }else if(xhr.status>=400) {
                        console.error(xhr.responseURL + ' ' + xhr.status + ' (' + xhr.statusText + ')')
                    }
                    else{
                        window.setTimeout(function () {
                            checkSuccess(xhr);
                        }, 0);
                    }
                }else{
                    window.setTimeout(function () {
                        checkSuccess(xhr);
                    }, 0);
                }
            }

        },
        initNetWork: function () {
            window.addEventListener('load', function () {
                this.initTimeline();
                var cssList = document.querySelectorAll('link[rel="stylesheet"]');
                var jsList = document.querySelectorAll('script');
                var imgList = document.querySelectorAll('img');

                for (var i = 0, len = cssList.length; i < len; i++) {
                    var href = cssList[i].getAttribute('href');
                    if (href) {
                        this.checkJSorCSS(href);
                    }
                }

                for (i = 0, len = jsList.length; i < len; i++) {
                    var url = jsList[i].getAttribute('src');
                    if (url) {
                        this.checkJSorCSS(url)
                    }
                }

                for (i = 0, len = imgList.length; i < len; i++) {
                    var src = imgList[i].getAttribute('src');
                    if (src) {
                        this.checkImg(src)
                    }
                }
            }.bind(this));
        },
        checkImg: function (src) {
            var img = new Image();
            img.onerror=function(){
                console.error(src+' 404 (Not Found)')
            };
            img.src = src;
        },
        checkJSorCSS: function (src) {
            var xmlhttp = new window.XMLHttpRequest.realXHR;
            xmlhttp.open("GET", src);
            xmlhttp.onreadystatechange = function () {
                if ((xmlhttp.status == 200) && (xmlhttp.readyState == 4)) {
                }else if(xmlhttp.status == 404){
                    console.error(src+' 404 (Not Found)')
                }
            };
            //xmlhttp.onerror=function(){
            //    console.error(src+' 404 (Not Found)')
            //}
            xmlhttp.send();

        },
        installed: function () {
            this.initEntry();
        },
        initConsole: function () {
            window.console = {
                wc: window.console
            };
            var self = this;
            ['log', 'error', 'warn', 'debug', 'info'].forEach(function (item) {
                //no local scope,has fn scope ,so item is item
                console[item] = function () {
                    //this.wc===console.wc?
                    this.wc[item].apply(this.wc, Array.prototype.slice.call(arguments));
                    self.log(arguments, item);
                }
            });
        },
        onOptionChange: function (prop) {
            if (prop === 'tx' || prop === 'ty')return false;
        },
        initError: function () {
            //https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
            //todo ��try catch
            window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
                console.error('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
                    + ' Column: ' + column + ' StackTrace: ' + errorObj);
            }
        },
        initTimeline: function () {
            //https://github.com/addyosmani/timing.js
            //timing.getTimes();
            //timing.printSimpleTable();
            var data = timing.printSimpleTable();
            for (var key in data) {
                if(data.hasOwnProperty(key)) {
                    this.option.timeline.realPush({msg: key + ': ' + Math.round(data[key])});
                }
            }
        },
        touchStart:function(evt){
            this.isTouchStart = true;
            this.startX = evt.touches[0].pageX;
            this.startY = evt.touches[0].pageY;
            this.preX = this.startX;
            this.preY = this.startY;
            this.addClass(this.atEntry,'at-entry-active');
        },
        initEntry: function () {

            window.addEventListener('touchmove', function (evt) {
                if (this.isTouchStart) {
                    var dx = evt.touches[0].pageX - this.preX;
                    var dy = evt.touches[0].pageY - this.preY;
                    this.option.tx += dx;
                    this.option.ty += dy;
                    this.atEntry.style.webkitTransform =this.atEntry.style.transform = 'translate3d(' + this.option.tx + 'px, ' + this.option.ty + 'px, 0)';
                    this.preX = evt.touches[0].pageX;
                    this.preY = evt.touches[0].pageY;
                    event.preventDefault();
                }
            }.bind(this), false);

            window.addEventListener('touchend', function (evt) {
                this.isTouchStart = false;
                this.removeClass(this.atEntry,'at-entry-active');
            }.bind(this), false);
        },
        toggleEntry:function(){
                this.toogle();
        },
        render: function () {
            this.option['tab1'] = '';
            this.option['tab2'] = '';
            this.option['tab3'] = '';
            this.option['tab4'] = '';
            this.option['content1'] = '';
            this.option['content2'] = '';
            this.option['content3'] = '';
            this.option['content4'] = '';
            this.option['tab' + this.option.index] = 'at-active';
            this.option['content' + this.option.index] = 'at-active';
            return tpl;
        },
        goto: function (index,event) {
            this.option.index = index;
            event.stopPropagation();
        },
        log: function (msgs, type) {
            var i = 0, len = msgs.length;
            var output = "";
            try {
                for (; i < len; i++) {
                    output += this.toOutput(msgs[i]) + "\n";
                }
                this.option.logs.realPush({type: type, msg: output});
            } catch (e) {
                output = "", i = 0;
                for (; i < len; i++) {
                    output += msgs[i] + "  ";
                }
                this.option.logs.realPush({type: type, msg: output});
            }

        },
        toOutput:function(obj){
            if(this.isFunction(obj)){
                return obj.toString();
            }else{
                return JSON.stringify(obj, null, "\t");
            }
        },
        isFunction :function (obj) {
            return Object.prototype.toString.call(obj) == '[object Function]';
        },
        show: function () {
            this.option.hide = false;
        },
        hide: function () {
            this.option.hide = true;
        },
        toogle: function () {
            this.option.hide = !this.option.hide;
        },
        clearLogs: function () {
            switch(this.option.index)
            {
                case 1:
                    this.option.logs.size(0);
                    break;
                case 2:
                    this.option.xhrs.size(0);
                    break;
                case 3:
                    this.option.resources.cookie='';
                    this.option.resources.storage='';
                    break;
                case 4:
                    this.option.timeline.size(0);
                    break;
            }

        },
        hasClass: function (obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },

        addClass: function (obj, cls) {
            if (!this.hasClass(obj, cls)) obj.className += " " + cls;
        },

        removeClass: function (obj, cls) {
            if (this.hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        },
        initCookie:function(){
            var cookie =document.cookie;
            var output = {};
            cookie.split(/\s*;\s*/).forEach(function(pair) {
                pair = pair.split(/\s*=\s*/);
                output[pair[0]] = pair.splice(1).join('=');
            });
           this.option.resources.cookie= JSON.stringify(output, null, "\t");
        },
        initStorage:function(){
            var output={};
            for (var key in window.localStorage){
                output[key]=window.localStorage[key];
            }
            this.option.resources.storage=JSON.stringify(output, null, "\t");
        }

    });
    window.AlloyLever= AlloyLever;
})();