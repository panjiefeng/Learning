# Set 和 Map
## Set
## WeakSet
## Map 
1. Javascript的对象，本质上是键值对的集合（Hash结构），但是只能使用字符串当做键。所以ES6 提供了Map数据结构
2. 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数
3. Map可以将对象当做键，但是使用的是对象的引用。注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
### Map的属性和方法
1. size
2. set(key ,value) 返回整个Map
3. get(key)
4. has(key)
5. delete(key)
6. clear()
### 遍历方法，Map遍历的顺序就是插入的顺序
1. keys()
2. values()
3. entries() 返回所有对象的遍历器
4. forEach() 遍历 Map 的所有成员
   1. forEach方法还可以接受第二个参数，用来绑定this

### WeakMap 只接受对象作为键名



# Promise
1. 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
2. 有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数
3. 调用resolve表示将状态改为成功，调用reject表示将状态改为失败
4. Promise会吃掉错误
5. Promise 的 resolve或reject的回调方法，都是在本轮的末尾执行，而不是在下一轮的开始执行。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
## Promise.then
1. Promise的then方法可以返回Promise实例，这样就能够采用链式写法，即then后面再跟上一个then
2. 如果then没有返回值，那么默认返回Promise
3. then的返回值，跟作为参数的回调函数的返回值没有关系？

## Promise.catch
1. Promise 或 then中抛出错误都能被捕获（PS：除了已经resolved的，因为状态一旦发生变化就不会再改变）
2. 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

## Promise.finally 
1. 不管状态如何都会执行

## Promise.all
1. 所有都成功，为resolved状态，返回值组成一个数组给回调函数
2. 有一个失败，失败的那个的返回值传递给回调函数
3. 注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。因为catch返回的也是一个Promise，Promise.all接受的是多个promise实例，而发生reject的Promise实例自己catch错误后，返回的是一个Promise实例，符合Promise.all的要求

## Promise.race([...]) 多个实例竞争，谁的状态先改变就用谁
1. 如果参数不是Promise实例会调用Promise.resolve 方法处理
2. 

## Promise.resolve() 将现有对象转化为Promise 对象
```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
1. 分四种情况
   1. 参数为Promise实例
   2. 带有then方法的对象
   3. 参数为字符串
   4. 参数为空，直接返回一个Promise对象，可以直接调用then方法

## Promise.reject 返回一个状态为rejected的Promise实例，参数会作为reject的理由传递给后面的回调函数
```javascript
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```

## Promise.try

## Promise嵌套
```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})
```
相当于p2成功之后，执行p1成功后的内容
注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。
这段话作何解？理解了，但是这样做有什么好处呢？为什么状态不是他们各自决定？
这样做的好处
1. then返回Promise实例的时候，可以实现链式调用，如果第一个就reject，那么后面的也跟着是reject状态更加好处理



# 3. Proxy “元编程” 编程语言的语言
## 3.1 概述
1. Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。与其说是代理不如说是拦截器
2. 注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。
```javascript
// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```
3. 技巧
   1. 将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
   ```javascript
   var object = { proxy: new Proxy(target, handler) };
   ```
   2. Proxy 实例也可以作为其他对象的原型对象，如果对象没有属性需要到原型链中寻找的时候就会被代理（或被拦截）

# 4. Reflect 同Proxy一样
1. 从Object --> Reflect --> Proxy 分为三层，目前一般在Reflect层获取默认行为，因为Reflect层对Object层不合理的地方做了封装处理


# 5. Iterator 和 for...of 循环
## 5.1. Iterator概念
1. 任何数据结构只要部署Iterator接口，就可以完成遍历操作
2. ES6创造了`for...of`循环，Iterator接口主要供`for...of`消费
3. Iterator是一个指向对象的成员的指针，但是Iterator和数据结构实际上是分开的
4. 

# 6. Generator 函数的语法
1. 用于生成遍历器
2. yield表达式：就是暂停标志


# 问题
1. 如果是我我会注意这些吗？为什么？那为什么别人会注意这些？
2. Iterator，什么是iterator，这样的数据结构有什么用？
3. 在同步、异步中抛出错误，在catch中能不能捕获
4. Proxy中的++obj.count 怎么是先getting再setting，不应该是先setting再getting吗
5. 函数的调用直接是函数.apply的调用吗
6. yield？
7. 这里第二个next返回的值为什么不是3，而是undefined
```javascript
function* gen(x) {
  var y = yield x + 2;
  return y;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```
8. 为什么会立即返回一个Promise对象
```javascript
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
```