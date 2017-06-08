/*!
 *  AlloyLever v0.5.1 By dntzhang
 *  Github: https://github.com/AlloyTeam/AlloyLever
 *  MIT Licensed.
 */
;(function (root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["AlloyLever"] = factory();
    else
        root["AlloyLever"] = factory();
})(this, function() {
    var AlloyLever = {}
    AlloyLever.cdn = '//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js'
    AlloyLever.store = []

    var log = window.console.log,
        info = window.console.info,
        warn = window.console.warn,
        debug = window.console.debug,
        error = window.console.error

    window.console.log = function () {
        AlloyLever.store.push({
            logType: 'log',
            logs: arguments
        })
        log.apply(console, arguments)
    }

    window.console.info = function () {
        AlloyLever.store.push({
            logType: 'info',
            logs: arguments
        })
        info.apply(console, arguments)
    }

    window.console.warn = function () {
        AlloyLever.store.push({
            logType: 'warn',
            logs: arguments
        })
        warn.apply(console, arguments)
    }

    window.console.debug = function () {
        AlloyLever.store.push({
            logType: 'debug',
            logs: arguments
        })
        debug.apply(console, arguments)
    }

    window.console.error = function () {
        AlloyLever.store.push({
            logType: 'error',
            logs: arguments
        })
        error.apply(console, arguments)
    }

    AlloyLever.vConsole = function(){
        loadScript(AlloyLever.cdn, function() {

            var i = 0,
                len = AlloyLever.store.length

            for (; i < len; i++) {
                var item = AlloyLever.store[i]
                //console[item.type].apply(console, item.logs)
                //prevent twice log
                item.noOrigin = true
                vConsole.pluginList.default.printLog(item)
            }

            try {
                vConsole.show()
            }catch(e) {

            }

            window.addEventListener('load', function () {
                vConsole.show()
            })

        })
    }

    function loadScript(src, callback){
        var s,
            r,
            t;
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        s.onload = s.onreadystatechange = function() {
            //console.log( this.readyState ); //uncomment this line to see which ready states are called.
            if ( !r && (!this.readyState || this.readyState == 'complete') )
            {
                r = true;
                callback();
            }
        };
        t = document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s, t);
    }

    AlloyLever.entry = function(selector) {
        var count = 0
        document.querySelector(selector).addEventListener('click', function () {
            count++
            if (count > 5) {
                count = -10000
                AlloyLever.vConsole()
            }
        })

    }

     function getParameter(n) {
        var m = window.location.hash.match(new RegExp('(?:#|&)' + n + '=([^&]*)(&|$)')),
            result = !m ? '' : decodeURIComponent(m[1]);
        return result ||getParameterByName(n);
    };

    if(getParameter('vconsole')==='vconsole') {
        AlloyLever.vConsole()
    }


    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase()
        var substring = "script error"
        if (string.indexOf(substring) > -1) {
            console.error('Script Error: See Browser Console for Detail')
        } else {
            console.error(msg, url, lineNo, columnNo, error)
        }
        return false
    }

    return AlloyLever
});