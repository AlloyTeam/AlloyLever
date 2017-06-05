/*!
 *  AlloyLever v0.1.0 By dntzhang
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
    AlloyLever.cdn = 'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/2.5.1/vconsole.min.js'
    AlloyLever.store = []

    AlloyLever.log = function () {
        AlloyLever.store.push({
            type: 'log',
            logs: arguments
        })

    }
    AlloyLever.info = function () {
        AlloyLever.store.push({
            type: 'info',
            logs: arguments
        })
    }

    AlloyLever.warn = function () {
        AlloyLever.store.push({
            type: 'warn',
            logs: arguments
        })
    }

    AlloyLever.debug = function () {
        AlloyLever.store.push({
            type: 'debug',
            logs: arguments
        })
    }

    AlloyLever.error = function () {
        AlloyLever.store.push({
            type: 'error',
            logs: arguments
        })
    }

    AlloyLever.vConsole = function(){
        loadScript(AlloyLever.cdn, function() {

            var i = 0,
                len = AlloyLever.store.length

            for (; i < len; i++) {
                var item = AlloyLever.store[i]
                console[item.type].apply(console, item.logs)
            }

            vConsole.show()
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

    return AlloyLever
});