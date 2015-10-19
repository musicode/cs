# CSS

combo semantic style

## 为何重复造轮子

因为样式库在前端开发中占据重要部分，而 `Bootstrap`、`Semantic-ui` 等库总是有那么多不尽然人意的地方，比如：

1. 跟字体库绑定，不方便定制
2. class 太难记，比如 `Semantic-ui` 为了语义化有一堆零碎的 className，而 `Bootstrap` 则开始变得很啰嗦
3. 自带插件库（js），写的并不好用

## 如何解决问题

1. 不带字体库和插件库，只是纯样式
2. 所有组件基于 mixin + class 映射，可使用 ui/ 下的 class 配置，或模仿 ui/ 写法，自已配置 class
3. 为了减少库体积，甚至可以每个页面单独定制用到的 class，避免过多冗余

## 类名规则

以 button 举例，先定义一个基类，比如取名为 `.btn`，它只有最基础的按钮样式，比如 inline-block、文本居中。

在 `Bootstrap` 中，按钮颜色和大小有 `.btn-color`、`.btn-size`，但是 hover 和 active 并不是这样的命名规则，而是：

```css
.btn:active,
.btn.active {

}
```

这样就看起来很奇怪了，凭什么颜色和大小用了 btn- 前缀，而状态就不用呢，那么可不可以像 `Semantic-ui` 一样，完全用组合的方式，如下：

```html
<button class="btn primary small active"></button>
```

完全组合可以更加自由。

尺寸有下面这些：

1. tiny
2. small
3. 不写，默认大小
4. large
5. huge

颜色有下面这些：

1. primary 主色
2. secondary 辅色
3. success 成功色
4. error 错误色
5. info 信息色
6. warning 警告色
7. danger 危险色
8. muted 灰色（灰色是一种很特别的色...）

其中每种颜色又分为 5 种，命名方式为 xx-lighter xx-light xx xx-dark xx-darker

所有尺寸和大小的命名不用缩写，缩写更难记，比如 small 在 `Bootstrap` 叫做 sm，在 `Foundation` 叫做 sml，这真是蛋疼...

对于状态和 ui 细节，可以继续扩展类名，比如还有如下这些：

1. active 激活
2. checked 选中
3. disabled 禁用
4. expanded 展开
5. round 圆形
6. radius 圆角

## 问题

组件水平对齐

尽可能丰富的组件

目标是尽可能提速

组件：

* 左图右文
* input-button
* input-addon
* button-icon
* icon-button