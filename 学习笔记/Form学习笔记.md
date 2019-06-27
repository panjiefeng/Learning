# Form
## 属性
1. form：这个属性做什么用的？
2. hideRequiredMark
3. layout：改变为Horizontal没有效果还是纵向的，宽度小于一定的值的时候始终是纵向的。这个值是多少？575px，这采用响应式布局。
4. onSubmit: form的submit事件，通常在这里进行验证，成功后提交

## Form.create(options) 的Options
1. mapPropsToFields 每次值的改变都会执行一次，也就是每次父组件的props改变都会改变一次。存储在componentWillReceiveProps中
2. validateMessages 不知道干嘛用的
3. onFieldsChange 当值改变的时候会执行两次，一次validating=true，一次validating=false
4. onValuesChange 没有改变

## 只有通过 getFieldDecorator、getFieldsProps注册过后才能够正常的赋值，取值，否则免谈
## getFieldsError第一次獲取是空，但是綁定的表單會自動的將在errors對象中給每個字段留一個位置，也就是undefined
## 每一個字段的normalize都必須要執一遍
## this.props.form的函数
1. resetFields和setFields的区别？还有setFieldsValue
2. validateFields如果验证不通过需要抛出异常
    1. 参数options:first/firstFields/force/scroll
   
## Form.createFormField 这个不知道干嘛的，只是封装成Form的Field吗？如果不封装会怎么样呢？

## getFieldDecorator(id, options) 参数
1. id: 支持嵌套写法，但是有bug，而且必须先注册
2. options: 
    1. getValueFromEvent: ？？
    2. normalize： 每当值改变的时候都会执行

## Form.Item 属性
1. 

## 验证规则
1. validator：什么时候调用？
2. 这些调用的先后顺序是怎么样的？

## async validator 是验证的基础，也是更高级验证的写法


## 可以做到的事情
1. 成为贡献者，修改其代码
2. 给这个画一个流程图，声明