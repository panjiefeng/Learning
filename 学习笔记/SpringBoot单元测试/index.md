1. 引入 spring-boot-starter-test？
2. starter-test集成了几个库，能够实现单元测试集成测试、断言等

# Service单元测试
# Controller单元测试
1. 需要用到MockMvc
   1. 需要用Mock构造mvc，构造session
   2. Mock发起http请求：可以设置请求参数，传输类型，返回类型
   3. 对返回结果进行判定
# assertThat 断言的使用：结合Hamcrest使用，有明确的错误提示，代码简洁
1. 常见的Matcher： not/equalTo/containsString/...

# 单元测试回滚
1. @Transactional
2. @Rollback 回滚
3. 


# 第二篇文档
## 为什么要写单元测试？
## SpringBoot Web中使用JUnit
```java
@RunWith(SpringJUnit4ClassRunner.class) // SpringJUnit支持，由此引入Spring-Test框架支持！ 
@SpringApplicationConfiguration(classes = SpringBootSampleApplication.class) // 指定我们SpringBoot工程的Application启动类
@WebAppConfiguration // 由于是Web项目，Junit需要模拟ServletContext，因此我们需要给我们的测试类加上@WebAppConfiguration。
```
## JUnit注解讲解
1. @BeforeClass、@AfterClass、@Before、@After、@Test(timeout/expected/)、@Ignore、@RunWith
2. Runner：SpringRunner、SpringJUnit4ClassRunner、Parameterized.class（这个很好玩儿）、Suite.class、

## 打包测试：将多个测试类同时运行Suite.class
## JUnit测试API接口另外的方法，不使用MockMvc，使用
```java
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.test.TestRestTemplate;
private RestTemplate template = new TestRestTemplate();
String result = template.postForObject(url, map, String.class);
```

## 捕获输出：捕获所有的输出System.out/Log日志
```java
    @Rule
    // 这里注意，使用@Rule注解必须要用public
    public OutputCapture capture = new OutputCapture();
```

# 第三篇文章
## 


# 总结
## 1. 基础知识
### 1.1. JUnit 
JUnit作为一个大的测试框架，可以嵌入不同的Runner，不同的Runner能够实现不同环境的运行
1. 可以嵌入不同的Runner
   1. 例如： SpringRunner能够提供Spring的运行环境，可以进行依赖，自动注入
   2. 例如：Parameterized能够提供参数化测试的框架
2. 能够添加不同的注解来添加额外的功能
   1. 例如：SpringBootTest，能够未运行环境提供SpringBoot的特性支持，还能提供Web运行环境，Mock等
   2. 例如：AutoConfigureMockMvc能注入MockMvc对象
   3. 例如：SpringApplicationConfiguration 能指定Spring 或 SpringBoot的启动类
3. 在整个JUnit大框架的支撑下，使用JUnit的注解@Test、@Before等
4. JUnit测试框架能够将其他库整合进来
   1. Hamcrest、Mockito、AssertJ、SpringTest/SpringBootTest等等

## 1.2. Hamcrest
用于提供各种各样的Matcher

## 1.3. AssertJ 断言库

## 1.4. SpringTest
## 1.5. SpringBootTest

### 1.2. 常见注解
1. JUnit
    1.  @Before：初始化方法   对于每一个测试方法都要执行一次（注意与BeforeClass区别，后者是对于所有方法执行一次）
    2.  @After：释放资源  对于每一个测试方法都要执行一次（注意与AfterClass区别，后者是对于所有方法执行一次）
    3.  @Test：测试方法，在这里可以测试期望异常和超时时间 
    4.  @Test(expected=ArithmeticException.class)检查被测方法是否抛出ArithmeticException异常 
    5.  @Ignore：忽略的测试方法 
    6.  @BeforeClass：针对所有测试，只执行一次，且必须为static void 
    7.  @AfterClass：针对所有测试，只执行一次，且必须为static void 
    8.  一个JUnit4的单元测试用例执行顺序为： @BeforeClass -> @Before -> @Test -> @After -> @AfterClass; 
    9.  每一个测试方法的调用顺序为： @Before -> @Test -> @After; 
    10. @RunWith: 指定使用什么Runner来作为运行环境
    11. @Rule：注解字段（必须为rule）或方法（返回一个rule），rule就是TestRule和MethodRule的子类;字段 或方法必须为pulic
        1.  rule（The Statement（操作，被传入TestRule） passed to the TestRule）会运行在所有@Before方法中-->@Test方法-->所有@After方法
        2.  应用顺序：@Rule注解的字段 --> 方法，多个字段被注解按照JVM反射的API的顺序应用
        3.  想要控制顺序可以使用RuleChain
        4.  这些Rule都能够保证在结束时销毁
    12. @ClassRule：应用在 TestRule 子类的 pulic static 字段 或 方法上（注意没有MethodRule）
        1.  rule（The Statement（操作，被传入TestRule） passed to the TestRule）会运行在所有@BeforeClass方法中-->所有Test方法 或 所有测试类（Suite）-->所有@AfterClass方法
        2.  Statement不会向TestRule抛出异常
        3.  TestRule抛出异常会导致未定义的行为
        4.  规则的引用： 字段-->方法
    13. @FixMethodOrder：指定测试方法的顺序，注解在测试类上
        1.  NAME_ASCENDING：按名字升序
        2.  JVM：顺序不能确定，可能会随着执行而改变顺序
        3.  DEFAULT：顺序是确定的，但是不可预期（不能事先知道执行顺序，应该是JUnit自己内部决定了）
2. SpringTest
   1. @Commit
   2. @Rollback
   3. @Repeat
   4. @WebAppConfiguration
3. SpringBootTest
   1. @SpringBootTest: 为SpringApplication创建上下文并支持SpringBoot特性：Mock（模拟环境）、RANDOM_PORT、DEFINED_PORT、NONE
   2. @AutoConfigureMockMvc：是Autowired能够注入成功

## 2. 使用方法
### 2.1. 参数化测试 Parameterized
https://blog.csdn.net/catoop/article/details/50752964
### 2.2. 打包测试 Suite
https://blog.csdn.net/catoop/article/details/50752964
### 2.3. 捕获输出 使用到@Rule作为规则

### 2.4. SpringBoot Service层
1. WebAppConfiguration
```java
@RunWith(SpringJUnit4ClassRunner.class) // SpringJUnit支持，由此引入Spring-Test框架支持！ 
@SpringApplicationConfiguration(classes = SpringBootSampleApplication.class) // 指定我们SpringBoot工程的Application启动类
@WebAppConfiguration // 由于是Web项目，Junit需要模拟ServletContext，因此我们需要给我们的测试类加上@WebAppConfiguration。
```
2. SpringBootTest 
### 2.5. Controller层
1. 真实的Web环境
   1. WebIntegrationTest RestTemplate(
    ```java
    @RunWith(SpringJUnit4ClassRunner.class)
    @SpringApplicationConfiguration(classes = SpringBootSampleApplication.class)
    //@WebAppConfiguration // 使用@WebIntegrationTest注解需要将@WebAppConfiguration注释掉
    @WebIntegrationTest("server.port:0")// 使用0表示端口号随机，也可以具体指定如8888这样的固定端口
    private RestTemplate template = new TestRestTemplate();
    @Value("${local.server.port}")// 注入端口号
    private int port;
    String result = template.postForObject(url, map, String.class);//template用于发送请求
    ```
   2. 用SpringBootTest @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) 
2. 使用模拟环境进行测试
   1. 使用AutoConfigureMockMvc自动装配MockMvc
   2. 使用MockMvcBuilder构建MockMvc对象:在测试方法运行前，@Before中：mockMvc = MockMvcBuilders.webAppContextSetup(web).build();创建mvc构建session [参考](http://tengj.top/2017/12/28/springboot12/)

# 3. 单元测试回滚
1. @Transactional 真实Web环境中不会回滚，所有要加上@Rollback
2. 数据库的架构必须支持事务（例如：InnoDB），MyISAM不支持事务



## 

# 问题
1. spring-boot是什么东西？
2. spring-boot-starter是什么？
3. 每个测试方法后能不能将执行的时间标识出来
4. 详细了解Junit4，里面的RunWith都有哪些Runner方法，分别都有什么用途，只看这些博客，是不够全面系统的。我应该站在一个更为全面系统的高度去看待这些问题。除了了解JUnit4 还要了解starter-test其他整合的库，看看他们为什么这么整合，以及市面上还有那些类似的库，为什么要选择这几个搭配在一起？
5. 如何一键将所有的从测试类都运行，因为在项目的各个阶段可能分别写了不同的类
6. @SpringBootTest注解中有webEnvironment属性，默认值是MOCK会提供Web环境，但是又不会启动服务器是为什么呢？那又怎么使用Web环境呢？
7. 注解挺好用的，注解的原理是怎么实现的，以及注解的历史由来？为什么别人能想到使用注解？
8. 要了解SpringBoot还是要先了解SpringMvc
9. Web的模拟环境和真实环境的区别？
10. TestNg与JUnit的区别 
11. @before 和 @beforeclass 有什么区别？