# 概念
1. loader间可以串行使用
2. chunk：code splitting的产物
3. compilation.plugin(‘xxx’, callback)：但做时间绑定，这些事件在打包时有webpack触发
4. Compilation对象作用
   1. 负责组织整个打包过程，包含每个环节以及输出环节所对应的方法。例如：addEntry()/_addModuleChain()/buildModule/seal()/createChunkAssets()（在每一各节点都会触发webpack时间去调用插件）
   2. 该对象内部存放着所有的module，chunk，生成的asset以及用来生成最后打包文件的template的信息
5. 模块儿的方式是：先构建，再处理依赖
6. module：是 webpack 构建的核心实体，也是所有 module 的 父类，它有几种不同子类：NormalModule , MultiModule , ContextModule , DelegatedModule 等。但这些核心实体都是在构建中都会去调用对应方法，也就是 build() 
   1. 每一个Module都有一个 build()方法
   2. 还包括了从构建到输出的一系列的有关 module 生命周期的函数（我们通过 module 父类类图其子类类图(这里以 NormalModule 为例)来观察其真实形态）
7. Chunk：应该也是打包输出的核心实体
8. webpack 中有四个 Template 的子类
   1. MainTemplate.js：入口js采用这个模板对象进行封装
   2. ChunkTemplate.js：异步加载的js采用此模块封装
   3. ModuleTemplate.js：对所有模块进行一个代码生成
   4. HotUpdateChunkTemplate.js：对热替换模块的一个处理
9. 模块封装：模块在封装的时候和它在构建时一样，都是调用各模块类中的方法。封装通过调用 module.source() 来进行各操作，比如说 require() 的替换
10. 生成assets：各模块进行 doBlock 后，把 module 的最终代码循环添加到 source 中。一个 source 对应着一个 asset 对象，该对象保存了单个文件的文件名( name )和最终代码( value )
11. 输出：webpack 调用 Compiler 中的 emitAssets() ，按照 output 中的配置项将文件输出到了对应的 path 中，从而 webpack 整个打包过程结束。要注意的是，若想对结果进行处理，则需要在 emit 触发后对自定义插件进行扩展

# 流程
1. 将shell参数和config中的option合并
2. 根据参数加载对应的插件
3. 返回options
```json
{ 
  entry: {},//入口配置
  output: {}, //输出配置
  plugins: [], //插件集合(配置文件 + shell指令) 
  module: { loaders: [ [Object] ] }, //模块配置
  context: //工程路径
}
```
4. options对象初始化完毕，进入编译构建流程
```javascript
var webpack = require("../lib/webpack.js");
var compiler = webpack(options);
function webpack(options) {
  var compiler = new Compiler();
  ...// 检查options,若watch字段为true,则开启watch线程
  return compiler;
}
```
5. 编译和构建流程 ，其中有几个比较关键的 webpack 事件节点。
- compile 开始编译
- make 从入口点分析模块及其依赖的模块，创建这些模块对象
- build-module 构建模块
- after-compile 完成构建
- seal 封装构建结果
- emit 把各个chunk输出到结果文件
- after-emit 完成输出
6. compiler.run 触发compile，构建出Compilation对象
7. 编译与构建主流程
   1. 触发make
   2. 调用addEntry()方法，根据entry字段找到入口的js文件
      1. 调用_addModuleChain: 根据模块的类型获取对应的模块工厂，并创建模块；构建模块
         1. 调用个Loader处理模块之间的依赖。webpack调用doBuild()，对每个require()用对应的loader进行加工，最后生成js module。
         2. 调用 acorn 解析经 loader 处理后的源文件生成抽象语法树 AST
         3. 遍历 AST，构建该模块所依赖的模块：找到当前模块的依赖模块儿，通过addDependency加入到数组当中，当前模块构建完成后，webpack调用processModuleDependencies 开始递归处理依赖的module。然后重复之前步骤
8. 构建细节：module webpack构建的核心实体
9. 打包输出：这是我们在开发时进行代码优化和功能添加的关键环节
   1.  在所有模块及其依赖模块 build 完成后，
   2.  webpack 会监听 seal 事件调用各插件对构建后的结果进行封装，
       1.  要逐次对每个 module 和 chunk 进行整理，生成编译后的源码，
       2.  合并，拆分，生成 hash
   3.  生成最终的assets：在封装过程中，webpack 会调用 Compilation 中的 createChunkAssets 方法进行打包后代码的生成
   4.  不同的Template：mainTemplate
       1.  mainTemplate：入口 js 
       2.  chunkTemplate：异步加载的 js
10. 模块封装：模块在封装的时候和它在构建时一样，都是调用各模块类中的方法。封装通过调用 module.source() 来进行各操作，比如说 require() 的替换
11. 生成assets：各模块进行 doBlock 后，把 module 的最终代码循环添加到 source 中。一个 source 对应着一个 asset 对象，该对象保存了单个文件的文件名( name )和最终代码( value )
12. 输出：webpack 调用 Compiler 中的 emitAssets() ，按照 output 中的配置项将文件输出到了对应的 path 中，从而 webpack 整个打包过程结束。要注意的是，若想对结果进行处理，则需要在 emit 触发后对自定义插件进行扩展
# Question
1. webpack 插件运行机制
2. tapable？