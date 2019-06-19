console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
// node 低版本 执行结果：1 7 6 8 2 4 9 11 3 19 5 12
// node 高版本 执行结果：1 7 6 8 2 4 3 5 9 11 10 12
/**
 * 解析：
 * 整体script作为第一个宏任务进入主线程，遇到console.log，输出1。
 * 遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为setTimeout1
 * 遇到process.nextTick()，其回调函数被分发到微任务Event Queue中。我们记为process1
 * 遇到Promise，new Promise直接执行，输出7。then被分发到微任务Event Queue中。我们记为then1
 * 又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为setTimeout2
 * 
 * 宏任务Event Queue    setTimeout1	process1
 * 微任务Event Queue    setTimeout2	then1
 * 
 * 执行微任务
 * 执行process1,输出6
 * 执行then1,输出8
 * 
 * 第一轮事件循环正式结束,第一轮结果: 1 7 6 8
 * 
 * 第二轮时间循环从setTimeout1宏任务开始
 * 
 */