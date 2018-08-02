#### 中文 | [English](https://github.com/AlloyTeam/AlloyLever#english--中文)

## AlloyLever 

**1kb**(gzip)代码搞定开发调试发布，错误监控上报，用户问题定位。

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

[https://unpkg.com/alloylever](https://unpkg.com/alloylever)

## 使用指南

```js
AlloyLever.config({
    cdn:'//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',  //vconsole的CDN地址
    reportUrl: "//a.qq.com",  //错误上报地址
    reportPrefix: 'qun',    //错误上报msg前缀，一般用于标识业务类型
    reportKey: 'msg',        //错误上报msg前缀的key，用户上报系统接收存储msg
    otherReport: {              //需要上报的其他信息
        uin: 491862102
    },
    entry:"#entry"          //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
})
```

AlloyLever会监听`window.onerror`并把错误信息保存下来，并且上报到reportUrl，你也可以召唤到vConsole并显示出来错误和相关日志。
或者使用这个CDN也可以:[//pub.idqqimg.com/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js](//pub.idqqimg.com/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js)

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

* 开发阶段用于调试
* 发给投诉的用户打开带有vconsole=show的url

## 在线演示

* [https://alloyteam.github.io/AlloyLever/](https://alloyteam.github.io/AlloyLever/cn.html)
* [https://alloyteam.github.io/AlloyLever/?vconsole=show](https://alloyteam.github.io/AlloyLever/cn.html?vconsole=show)
* [https://alloyteam.github.io/AlloyLever/?vconsole=hide](https://alloyteam.github.io/AlloyLever/cn.html?vconsole=hide)

## QQ交流群491862102

![](http://images2015.cnblogs.com/blog/105416/201706/105416-20170608111929012-1329379940.png)

#### English | [﻿中文](https://github.com/AlloyTeam/AlloyLever#中文--english)

## AlloyLever 

**1kb(gzip)** js library contains development debugging, error monitoring and reporting, user problem localization features.

* support error monitoring and reporting
* support for [vConsole](https://github.com/WechatFE/vConsole) error display
* support the development phase by using [vConsole](https://github.com/WechatFE/vConsole)
* support the production environment authorities to pull [vConsole](https://github.com/WechatFE/vConsole)
* support DOM evokes vConsole
* supports url evokes vConsole

There are two purposes for URL parameter arousal, the first is to display the vConsole panel during the website development process, and the second is to send a complaint to the feedback site. The wrong user displays the vConsole panel for locating errors.

## Install

```
npm install alloylever
```

or get it from cdn:

[https://unpkg.com/alloylever](https://unpkg.com/alloylever)

## Usage

```js
AlloyLever.config({
    cdn:'//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',  //vconsole CDN address
    reportUrl: "//a.qq.com",  //Error reporting address
    reportPrefix: 'qun',    //An error reporting msg prefix is generally used to differentiate business types
    reportKey: 'msg',        //Error reporting msg prefix key, user reporting system receives storage msg
    otherReport: {              //Other information to be reported
        uin: 491862102
    },
    entry:"#entry"          //Please click on this DOM element to summon vConsole 6 times. You can use AlloyLever.entry('#entry2') add more entry
})
```

AlloyLever will listen to `window.onerror` and save the error information, and report to reportUrl, you can also call vConsole and display errors and related logs.

## URL evokes vConsole

As long as your page references AlloyLever, you simply display the vConsole panel with the vconsole=show in your url. Such as:

```
//load and display the log panel
http://localhost:63342/AlloyLever/index.html?vconsole=show
//load but don't display the log panel
http://localhost:63342/AlloyLever/index.html?vconsole=hide
//don't load vConsole
http://localhost:63342/AlloyLever/index.html
```

The role of these URL is well understood:

* development phase for debugging
* open the URL with vconsole=show to the user who has complained

## DEMO

* [https://alloyteam.github.io/AlloyLever/](https://alloyteam.github.io/AlloyLever/)
* [https://alloyteam.github.io/AlloyLever/?vconsole=show](https://alloyteam.github.io/AlloyLever/?vconsole=show)
* [https://alloyteam.github.io/AlloyLever/?vconsole=hide](https://alloyteam.github.io/AlloyLever/?vconsole=hide)

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
