## JavaScript单线程语言，同时只能有一段代码执行
## Event Loop是JavaScript的执行机制

### 同步任务与异步任务

同步任务
    网页渲染的过程就是一大堆同步作务

异步任务
    像加载图片音乐之类占用资源大耗时久的任务

<pre>
        任务进入执行栈
            ↓  (→ 判断同步异步)
↓ →同步任务              ↓ →异步任务              
主线程                   Event Table (事件表)
↓                       ↓  (→ 注册回调函数)
任务全部执行完毕           Event Queue 事件队列                         
↓                       ↓
↓                       ↓
读取作务队列中的结果,进入主线程执行
</pre>
同步和异步任务分别进入不同的场所,同步进入主线程,异步进入Event Table并注册函数
当指定的事情完成时,Event Table会将这个函数移入Event Queue
主线程内的任务执行完毕为空,会去Event Queue读取对应的函数,进入主线程执行
上述过程会不断重复,也就是常说的Event Loop(事件循环)

### setTimeout 异步延时执行
<pre>
setTimeout(() => task(), 3000)
sleep(10000000)
</pre>
控制台执行task()远远超过3s,原因:
task()进入Event Table并注册计时开始
执行sleep(),很慢慢,计时仍在继续
3s到了,计时事件tmieout完成,task()进入Event Queue,但是sleep太慢还没有执行完只能等待
sleep执行完毕,task()终于从Event Queue进入了主线程执行

setTimeout(fn, 0) => 只要主线程执行栈内的同步任务全部执行完成,栈为空就马上执行.


### setInterval 循环执行 隔指定的时间将注册的函数置入Event Queue
setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了

### promise 与 process.nextTick(callback)
process.nextTick(callback)类似node.js版的"setTimeout"，在事件循环的下一次循环中调用 callback 回调函数。

除了广义的同步任务和异步任务，我们对任务有更精细的定义：

macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
micro-task(微任务)：Promise，process.nextTick

不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同的Event Queue。

事件循环的顺序，决定js代码的执行顺序。
进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。


#### 参考资料：https://juejin.im/post/59e85eebf265da430d571f89
