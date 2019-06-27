# 7.11 Git 工具 - 子模块
## 1. 开始使用子模块
1. 命令： git submodule add https://github.com/chaconinc/DbConnector
2. 注意：如果同一个子模块不同的人访问的url不一样（内外网，VPN等），需要注意
3. 子模块的创建模式：create mode 160000 DbConnector 本质上意味着：将这次创建视为一个项目，而非文件或目录

## 2. 克隆含有子模块的项目
1. 克隆父项目：git clone https://github.com/chaconinc/MainProject , 子项目的文件夹会创建但是为空
2. git submodule init：初始化本地配置文件
3. git submodule update： 获得这些改动并更新子目录中的文件，但是会将子仓库留在一个称作 “游离的 HEAD” 的状态。为什么会留在那个状态？
4. git clone --recursive https://github.com/chaconinc/MainProject 会自动完成上面的三个步骤

## 3. 拉取上游修改，即拉取子模块的更新
1. 进入到子模块进行git fetch 和git merge
2. 在父项目中运行：git submodule update --remote DbConnector：此命令默认会假定你想要更新并检出子模块仓库的 master 分支， 也可以强制设为其他分支git config -f .gitmodules submodule.DbConnector.branch stable。如果不用 -f .gitmodules 选项，那么它只会为你做修改。但是在仓库中保留跟踪信息更有意义一些，因为其他人也可以得到同样的效果。
3. 配置选项 status.submodulesummary，Git 也会显示你的子模块的更改摘要
4. 


# 4. 父项目中命令
1. git status 会显示子项目有新提交
```yml
modified:   .gitmodules
modified:   DbConnector (new commits)
```
2. git diff 我们可以直接看到将要提交到子模块中的提交日志
3. 提交后执行 git log -p --submodule 可以查看到 上一条的信息
4. git submodule update --remote Git默认会尝试更新所有子模块，所以如果有很多子模块的话，你可以传递想要更新的子模块的名字

## 4. 在子模块上工作 如何在子模块与主项目中同时做修改，以及如何同时提交与发布那些修改