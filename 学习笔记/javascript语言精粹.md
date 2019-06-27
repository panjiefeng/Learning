Function 构造器是eval的另一种形式，同样也应该避免使用它
Function('return 1+1')();

++  -- 
大多数的缓冲区溢出错误所造成的安全漏洞，都是由像这样编码而导致的

语言冗余度

Javascript的执行环境一般接触不到硬件，所以位运算非常慢


JSLint
# 毒瘤
## 全局变量
### 建议
1. 不去使用，如果非要使用，可以定义一个全局的对象，然后将想要使用的变量存放到对象当中。

## 作用域
没有块级作用域，所以变量要添加尽量放在函数的最顶端。

## Unicode
javascript最开始是16个字节一个字符，而Unicode是32个字节一个字符。所以对应关系存在偏差。

## typeof
typeof不能准确的区分出类型
1. typeof null等于'object'

## parseInt 
最好加上parseInt('09', 10)

## 浮点数
精度不够准确，可以先转换为整型，然后再转为小数

## NaN
使用isNaN进行判断
```javascript
var isNumber = function(value){
    return typeof value === 'number' && isFinite(value);//筛选掉NaN和Infinity
}
```

## 伪数组

# 糟粕
## ==
## with语句：避免使用
## eval
1. Function
2. setTimeout
3. setInterval
## 位运算
javascript的执行环境一般接触不到硬件，所以位运算非常慢。
## 类型的包装对象：尽量不要使用，用字面量来代替
## void避免使用
## new
1. 要使用new时，将函数首字母设置成大写
2. 根本不去使用new

# JSLint
用于javascript的语法检测



# 语法
## break
1. 标签语句
```javascript
block1:{
	console.log(123);
}
```
2. javascript中%是求余数运算


# 第三章 对象
1. javascript包含一种原型链的特性，语序对象继承另一个对象的属性。正确的使用它能减少对象初始化时消耗的时间和内存。（怎么样才算正确使用？）
2. 通过函数字面量创建的函数对象包含一个连接到外部上下文的连接。这被称为闭包。是javascript强大表现力的来源。


# 第四章 函数
1. 如果函数调用是在前面加上了new前缀，且返回值不是一个对象，则返回this（该新对象）。
2. arguments并不是一个正正的数组，只是一个“类似数组”。拥有length属性
3. 异常的处理
```
throw {
    name: 'TypeError',
    message: '123123123'
}
```
4. 尾递归优化（严格模式下才可以，非严格模式下有arguments、function.caller）
5. 使用模块的方式，能够让数据只能通过函数去设置。
6. 级联技术，链式调用（返回this）
7. 柯里化
8. 记忆的技术，用数组将已经求得的值存储起来

# 第五章 继承
1. 

# 问题
1. javascript中帧的概念，可以再不同帧或窗口创建数组
2. 闭包的那些变量都存放到哪儿了？


# 学习
1. 一门语言最糟糕的特点不是那些一看就知道很危险或者没有价值的特性，而是那些带刺的玫瑰，有用但也很危险。例如：switch
2. 