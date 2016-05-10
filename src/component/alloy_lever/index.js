window.timing = window.timing || {
        /**
         * Outputs extended measurements using Navigation Timing API
         * @param  Object opts Options (simple (bool) - opts out of full data view)
         * @return Object      measurements
         */
        getTimes: function (opts) {
            var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;

            if (performance === undefined) {
                return false;
            }

            var timing = performance.timing;
            var api = {};
            opts = opts || {};

            if (timing) {
                if (opts && !opts.simple) {
                    for (var k in timing) {
                        if (timing.hasOwnProperty(k)) {
                            api[k] = timing[k];
                        }
                    }
                }


                // Time to first paint
                if (api.firstPaint === undefined) {
                    // All times are relative times to the start time within the
                    // same objects
                    var firstPaint = 0;

                    // Chrome
                    if (window.chrome && window.chrome.loadTimes) {
                        // Convert to ms
                        firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
                        api.firstPaintTime = firstPaint - (window.chrome.loadTimes().startLoadTime * 1000);
                    }
                    // IE
                    else if (typeof window.performance.timing.msFirstPaint === 'number') {
                        firstPaint = window.performance.timing.msFirstPaint;
                        api.firstPaintTime = firstPaint - window.performance.timing.navigationStart;
                    }
                    // Firefox
                    // This will use the first times after MozAfterPaint fires
                    //else if (window.performance.timing.navigationStart && typeof InstallTrigger !== 'undefined') {
                    //    api.firstPaint = window.performance.timing.navigationStart;
                    //    api.firstPaintTime = mozFirstPaintTime - window.performance.timing.navigationStart;
                    //}
                    if (opts && !opts.simple) {
                        api.firstPaint = firstPaint;
                    }
                }

                // Total time from start to load
                api.loadTime = timing.loadEventEnd - timing.fetchStart;
                // Time spent constructing the DOM tree
                api.domReadyTime = timing.domComplete - timing.domInteractive;
                // Time consumed preparing the new page
                api.readyStart = timing.fetchStart - timing.navigationStart;
                // Time spent during redirection
                api.redirectTime = timing.redirectEnd - timing.redirectStart;
                // AppCache
                api.appcacheTime = timing.domainLookupStart - timing.fetchStart;
                // Time spent unloading documents
                api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
                // DNS query time
                api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
                // TCP connection time
                api.connectTime = timing.connectEnd - timing.connectStart;
                // Time spent during the request
                api.requestTime = timing.responseEnd - timing.requestStart;
                // Request to completion of the DOM loading
                api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
                // Load event time
                api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;

                if (Math.abs(api.initDomTreeTime) > 1304136942)api.initDomTreeTime = 0;
                if (Math.abs(api.loadTime) > 1304136942)api.loadTime = 0;
            }

            return api;
        },
        /**
         * Uses console.table() to print a complete table of timing information
         * @param  Object opts Options (simple (bool) - opts out of full data view)
         */
        printTable: function (opts) {
            var table = {};
            var data = this.getTimes(opts) || {};
            Object.keys(data).sort().forEach(function (k) {
                table[k] = {
                    k: k,
                    ms: data[k],
                    s: +((data[k] / 1000).toFixed(2))
                };
            });
            return data;
        },
        /**
         * Uses console.table() to print a summary table of timing information
         */
        printSimpleTable: function () {
            return this.printTable({simple: true});
        }
    };

App.loadFile("component/alloy_lever/index.html", function (tpl) {
    var AlloyLever = Nuclear.create({
        install: function () {
            this.initConsole();
            this.initError();
            this.initTimeline();
            this.initXHR();
            this.initNetWork();
            this.initCookie();
            this.initStorage();

        },
        initXHR:function(){
            var XHR = window.XMLHttpRequest;

            window.XMLHttpRequest=function(){
                var xhr = new XHR();
                checkSuccess(xhr);
                return xhr;
            };

            window.XMLHttpRequest.realXHR = XHR;

            var self=this;

            function checkSuccess(xhr) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    self.option.xhrs.push({url:xhr.responseURL, json:JSON.stringify(JSON.parse( xhr.responseText), null, "\t")})
                }else if(xhr.status>=400) {
                    console.error(xhr.responseURL +' '+xhr.status+' ('+xhr.statusText+')')
                }
                else{
                    window.setTimeout(function () {
                        checkSuccess(xhr);
                    }, 0);
                }
            }

        },
        initNetWork: function () {
            window.onload = function () {
                var cssList = document.querySelectorAll('link[rel="stylesheet"]');
                var jsList = document.querySelectorAll('script');
                var imgList = document.querySelectorAll('img');

                for (var i = 0, len = cssList.length; i < len; i++) {
                    var href=cssList[i].getAttribute('href');
                    if(href) {
                        this.checkJSorCSS(href);
                    }
                }

                for (i = 0, len = jsList.length; i < len; i++) {
                    var url = jsList[i].getAttribute('src');
                    if(url) {
                        this.checkJSorCSS(url)
                    }
                }

                for (i = 0, len = imgList.length; i < len; i++) {
                    var src = imgList[i].getAttribute('src');
                    if(src) {
                        this.checkImg(src)
                    }
                }


            }.bind(this)
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
                console[item] = function (msg) {
                    //this.wc===console.wc?
                    this.wc[item](msg);
                    self.log(msg, item);
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
                    this.option.timeline.push({msg: key + ': ' + Math.round(data[key])});
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
                    this.atEntry.style.transform = 'translate3d(' + this.option.tx + 'px, ' + this.option.ty + 'px, 0)';
                    this.preX = evt.touches[0].pageX;
                    this.preY = evt.touches[0].pageY;
                    event.preventDefault();
                }
            }.bind(this), false);

            window.addEventListener('touchend', function (evt) {
                this.isTouchStart = false;
                if (Math.abs(evt.changedTouches[0].pageX - this.startX) < 30 && Math.abs(evt.changedTouches[0].pageY - this.startY) < 30) {
                    this.toogle();
                }
                this.removeClass(this.atEntry,'at-entry-active');
            }.bind(this), false);
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
        goto: function (index) {
            this.option.index = index;
        },
        log: function (msg, type) {
            this.option.logs.push({type: type, msg: msg});
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
});