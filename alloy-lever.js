/*!
 *  AlloyLever v1.0.1 By dntzhang
 *  Github: https://github.com/AlloyTeam/AlloyLever
 *  MIT Licensed.
 */
;(function (root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory()
    else if(typeof define === 'function' && define.amd)
        define([], factory)
    else if(typeof exports === 'object')
        exports["AlloyLever"] = factory()
    else
        root["AlloyLever"] = factory()
})(this, function() {
    var AlloyLever = {}
    AlloyLever.settings = {
        cdn:'//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',
        reportUrl: null,
        reportPrefix: '',
        reportKey: 'msg',
        otherReport: null,
        entry: null
    }

    AlloyLever.store = []

    var methodList = ['log', 'info', 'warn', 'debug', 'error'];
    methodList.forEach(function(item) {
        var method = console[item];

        console[item] = function() {
            AlloyLever.store.push({
                logType: item,
                logs: arguments
            });

            method.apply(console, arguments);
        }
    });

    AlloyLever.logs = []
    AlloyLever.config = function(config){
        for(var i in config){
            if(config.hasOwnProperty(i)){
                AlloyLever.settings[i] = config[i]
            }
        }

        if(config.entry){
            document.addEventListener("DOMContentLoaded", function() {
                AlloyLever.entry(config.entry)
            })
        }
    }

    AlloyLever.vConsole = function(show){
        loadScript(AlloyLever.settings.cdn, function() {

            var i = 0,
                len = AlloyLever.store.length

            for (; i < len; i++) {
                var item = AlloyLever.store[i]
                //console[item.type].apply(console, item.logs)
                //prevent twice log
                item.noOrigin = true
                vConsole.pluginList.default.printLog(item)
            }

            if(show) {
                try {
                    vConsole.show()
                } catch (e) {

                }

                window.addEventListener('load', function () {
                    vConsole.show()
                })
            }
        })
    }

    AlloyLever.entry = function(selector) {
        var count = 0,
            entry =document.querySelector(selector)
        if(entry) {
            entry.addEventListener('click', function () {
                count++
                if (count > 5) {
                    count = -10000
                    AlloyLever.vConsole(true)
                }
            })
        }
    }

    window.onerror = function(msg, url, line, col, error) {
        var newMsg = msg

        if (error && error.stack) {
            newMsg = processStackMsg(error)
        }

        if (isOBJByType(newMsg, "Event")) {
            newMsg += newMsg.type ?
                ("--" + newMsg.type + "--" + (newMsg.target ?
                    (newMsg.target.tagName + "::" + newMsg.target.src) : "")) : ""
        }

        newMsg = (newMsg + "" || "").substr(0,500)

        AlloyLever.logs.push({
            msg: newMsg,
            target: url,
            rowNum: line,
            colNum: col
        })

        if (msg.toLowerCase().indexOf('script error') > -1) {
            console.error('Script Error: See Browser Console for Detail')
        } else {
            console.error(newMsg)
        }

        var ss = AlloyLever.settings
        if(ss.reportUrl) {
            var src = ss.reportUrl + '?' + ss.reportKey + '='+( ss.reportPrefix?('[' + ss.reportPrefix +']'):'')+ newMsg+'&t='+new Date().getTime()
            if(ss.otherReport) {
                for (var i in ss.otherReport) {
                    if (ss.otherReport.hasOwnProperty(i)) {
                        src += '&' + i + '=' + ss.otherReport[i]
                    }
                }
            }
            new Image().src = src
        }
    }

    var parameter = getParameter('vconsole')

    if(parameter) {
        if (parameter === 'show') {
            AlloyLever.vConsole(true)
        } else {
            AlloyLever.vConsole(false)
        }
    }

    function loadScript(src, callback){
        var s,
            r,
            t
        r = false
        s = document.createElement('script')
        s.type = 'text/javascript'
        s.src = src
        s.onload = s.onreadystatechange = function() {
            //console.log( this.readyState ); //uncomment this line to see which ready states are called.
            if ( !r && (!this.readyState || this.readyState == 'complete') )
            {
                r = true
                callback()
            }
        }
        t = document.getElementsByTagName('script')[0]
        t.parentNode.insertBefore(s, t)
    }

    function getParameter(n) {
        var m = window.location.hash.match(new RegExp('(?:#|&)' + n + '=([^&]*)(&|$)')),
            result = !m ? '' : decodeURIComponent(m[1])
        return result ||getParameterByName(n)
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href
        name = name.replace(/[\[\]]/g, "\\$&")
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, " "))
    }

    function  isOBJByType(o, type) {
        return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]"
    }

    function processStackMsg (error) {
        var stack = error.stack
            .replace(/\n/gi, "")
            .split(/\bat\b/)
            .slice(0, 9)
            .join("@")
            .replace(/\?[^:]+/gi, "")
        var msg = error.toString()
        if (stack.indexOf(msg) < 0) {
            stack = msg + "@" + stack
        }
        return stack
    }

    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")

        if(arr=document.cookie.match(reg))
            return unescape(arr[2])
        else
            return null
    }

    AlloyLever.getCookie = getCookie
    AlloyLever.getParameter= getParameter
    AlloyLever.loadScript = loadScript

    return AlloyLever
});
