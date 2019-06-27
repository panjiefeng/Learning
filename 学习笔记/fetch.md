# fetch
1. 了解请求技术的发展史：ActiveXObject/XMLHttpRequest
2. 了解封装前端请求的库：ajax、axios、unity-api
3. 流的好处：我们可以一边获取一边进行处理
## 问题
1. low-level的API什么意思？
2. 前端使用fetch和后台采用什么技术，怎样才能很好的合并整合
3. 了解各个领域流技术的应用：视频流、数据流、大数据流
4. 自己实现以下Promise
```javascript
let PanPromise = function(exeFunc){
    let t=this;
    function resolve(data){
        
    }
    this.then = function(func){
        func();
        return t;
    };
    this.catch = function(func){
        func();
        return t;
    };
    exeFunc(this.then, this.catch);
    return this;
}
```
