## AlloyLever 

错误监控上报，用户问题定位利器。

* 支持错误监控和上报
* 支持 [vConsole](https://github.com/WechatFE/vConsole)错误展示
* 支持开发阶段使用 [vConsole](https://github.com/WechatFE/vConsole)
* 支持生产环境机关拉取 [vConsole](https://github.com/WechatFE/vConsole)
* 支持预埋机关唤起
* 支持url带参数唤起

url带参数唤起有两个目的，第一是方便网站开发过程中显示vConsole面板，第二是发给投诉反馈网站错误的用户显示vConsole面板用于定位错误。

## 安装

```
npm install alloylever
```

CDN地址下载下来使用:

[https://unpkg.com/alloylever@1.0.0/alloy-lever.js](https://unpkg.com/alloylever@1.0.0/alloy-lever.js)

## 使用指南

```js
AlloyLever.config({
    cdn:'//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',  //vconsole的CDN地址
    reportUrl: "//a.qq.com",  //错误上报地址
    reportPrefix: 'abc',    //错误上报msg前缀，一般用户标识业务类型
    reportKey: 'msg',        //错误上报msg前缀的key，用户上报系统接收存储msg
    otherReport: {              //需要上报的其他信息
        uin: 491862102
    },
    entry:"#entry"          //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
})
```

AlloyLever会监听`window.onerror`并把错误信息保存下来，并且上报到reportUrl，你也可以召唤到vConsole并显示出来错误和相关日志。

## url唤起vConsole

只要你的页面引用了AlloyLever，你只需要在你的url里带上 vconsole=show 就能显示vConsole面板。如:

```
//加载并显示log面板
http://localhost:63342/AlloyLever/index.html?vconsole=show
//加载但不显示log面板
http://localhost:63342/AlloyLever/index.html?vconsole=hide
//不加载vConsole脚本
http://localhost:63342/AlloyLever/index.html
```

这些url的作用很好理解:

* 要开发阶段用于调试
* 发给投诉的用户打开带有vconsole=show的url

## 在线演示

* [https://alloyteam.github.io/AlloyLever/](https://alloyteam.github.io/AlloyLever/)
* [https://alloyteam.github.io/AlloyLever/?vconsole=show](https://alloyteam.github.io/AlloyLever/?vconsole=show)
* [https://alloyteam.github.io/AlloyLever/?vconsole=hide](https://alloyteam.github.io/AlloyLever/?vconsole=hide)

## QQ交流群491862102

![](http://images2015.cnblogs.com/blog/105416/201706/105416-20170608111929012-1329379940.png)

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
