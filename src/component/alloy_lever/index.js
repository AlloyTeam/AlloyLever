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
            //todo £ºtry catch
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