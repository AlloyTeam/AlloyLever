
# AlloyLever 

让你在生产环境轻松使用 [vConsole](https://github.com/WechatFE/vConsole)， 方便定位问题。

## 使用指南

[vConsole](https://github.com/WechatFE/vConsole) 是一款非常强大的调试工具，但是由于其体积问题不可能在生产环境加载该脚本。
AlloyLever超小的体积，让你能在生产环境中使用vConsole。

```js
AlloyLever.log('这是log信息')
AlloyLever.info('这是info信息')
AlloyLever.debug('这是debug信息')
AlloyLever.warn('这是warn信息')
AlloyLever.error('这是error信息')

//入口。请点击这个DOM元素**6**次召唤神龙
AlloyLever.entry('#vConsole')
```

## 在线演示

[https://alloyteam.github.io/AlloyLever/](https://alloyteam.github.io/AlloyLever/)

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
