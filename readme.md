# CSS

**C**ombo **S**emantic **S**tyle

> 重新定义 CSS



## 为何重复造轮子

因为样式库在前端开发中占据重要部分，而 `Bootstrap`、`Semantic-ui` 等库总是有那么多不尽然人意的地方，比如：

1. 跟字体库绑定
   
2. 跟插件库绑定，插件定制性太强，自带的不是很好用
   
3. 类名太难记，比如 `Semantic-ui` 为了语义化有一堆零碎的 className（没发现规律...），而 `Bootstrap` 则很啰嗦
   
   ​

## 如何解决问题

1. 不带字体库和插件库，只是纯样式
   
2. 基于组合和语义化，可延伸出各种使用方式
   
3. 推荐如下使用方式
   
   ``` html
   <head>
   	<link rel="stylesheet" href="css.css">
   	<link rel="stylesheet" href="biz.css">
   </head>
   <body>
     	<div class="button large primary">click me!</div>
   </body>
   ```
   
   * **css** 作为公共库，充分利用缓存
   
   
   * **biz** 基于 **css**，节省大量代码
   
4. 固化类名通常会被吐槽不够语义化，**css** 的一大特性就是语义化，因此可以理解为`重新定义了 css`
   
   比如 <a> 表示链接，**css** 定义的 `.link` 则会带有链接具有的样式，它的风格基于网站的整体设计，类似的还有 `.button` `.label` `.text` `.input` 等
   
5. 使用 **normalize.css** 进行初始化，保证先天的语义不被破坏，比如 <strong> 表示粗体，当我们需要一个粗体的按钮时，可以参考以下写法：
   
   ``` html
   <strong class="button large primary">click me!</strong>
   ```
   
   基于这样的设计思想，业务代码量可大为减少
   
   ​



## 类名规则

以 button 举例，先定义一个基类，比如取名为 `.button`，它只有最基础的按钮样式，比如 inline-block、文本居中，没有颜色和大小之分。

在 `Bootstrap` 中，按钮颜色和大小有 `.btn-color`、`.btn-size`，但是 hover 和 active 并不是这样的命名规则，而是下面这样：

``` css
.btn:active,
.btn.active {
    xxx
}
```

这样看起来就略显奇怪了，为什么颜色和大小用了 **btn-** 前缀，而状态就不用呢，那么可不可以像 `Semantic-ui` 一样用组合的方式，如下：

``` html
<button class="btn primary small active"></button>
```

组合能带来更加丰富、自由、灵活的样式。但随之而来的问题是记忆成本，因此必须设计一套简单的组合规则。

我们从`尺寸`和`颜色`两个维度进行整体设计，先说尺寸，从小到大排序如下：

1. tiny
2. small
3. 不写，默认大小
4. large
5. huge



举两个例子：

``` html
<div class="button small">小型按钮</div>
<div class="button">默认按钮</div>
```



颜色的数量相比尺寸更多些，任何数量的膨胀一定有深刻的思考，并非说越多越好，不管你是否用的上。



从网站设计来说，`主色`和`辅色`依然是存在的；在表单验证中，`成功`和`错误`也是必然存在的（神马！你说你的网站不需要表单验证，呵呵…）；对于一些提示信息，比如解释某个输入框是干嘛的，这里就有信息的概念；`危险`操作，比如删除，通常会使用危险色标识，以便用户能够一眼发现；类似删除这种危险操作，一定需要用户再次确认，这时就可以果断警告 TA 了。最后还剩下一个灰色，你敢说你的网站不需要灰色？！



颜色共有如下 8 种：

1. primary 主色
2. secondary 辅色
3. success 成功色
4. error 错误色
5. info 信息色
6. warning 警告色
7. danger 危险色
8. muted 灰色

其中每种颜色又分为 5 种，从浅到深依次为 `xx-lighter` `xx-light` `xx` `xx-dark` `xx-darker`

名称都不用缩写，缩写很难记，比如 small 在 `Bootstrap` 叫做 sm，在 `Foundation` 叫做 sml，这真是蛋疼...

对于状态，可以继续扩展类名，比如有以下这些：

1. hover 悬浮
2. active 激活
3. checked 选中
4. disabled 禁用
5. round 圆形
6. radius 圆角