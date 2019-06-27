# 简介
## git与svn
1. git分布式，每台机器上都有完整的版本库
2. A/B两人同时修改了文件X，把各自的x文件推送给对方就能相互看到修改
3. svn中央服务器坏了其他人不能用，git可以（完整的版本）
4. git其实可以不需要中央服务机，但是为了方便大家进行交换会统一指定了一个中央服务机
5. git还有极其强大的分支管理

## 版本库（Repository）的构建
1. git init(空目录或非空目录都可以)

## git的常见操作
1. git add
2. git commit
3. git status
4. git diff 对比本地的版本之间的差别，包括未提交的修改。即当前文件和历史版本
5. git log
6. git relog
7. git reset --hard commit_id : HEAD^/HEAD^^/HEAD~100 回到上一个版本，可以是回到版本或者回到add 或 commit之前
8. git checkout -- file: 使用最新版本覆盖工作区的内容
9. git rm file: 从版本库中移除文件  或 先手动删除在 git add 将修改添加到暂存区
10. 远程仓库
    1.  git remote add origin git@server-name:path/repo-name.git  关联远程仓库，此时远程厂库最好是空的
    2.  git push -u origin master  第一次推送master分支的所有内容，-u表示会将本地推送过去的master分支和远程仓库的master分支进行合并
    3.  git push origin master 之后修改正常的push
11. git checkout -b dev : 创建并切换到dev分支 等于
    1.  git branch dev 创建分支
    2.  git checkout dev 切换到dev分支
    3.  git branch -d dev 删除dev分支
12. git branch 查看当前分支，列出来的分支中，加*的为当前分支
13. git merge dev 将当前分支与dev分支合并
14. git log --graph命令可以看到分支合并图
15. git merge --no-ff -m "merge with no-ff" dev  禁用Fast forward合并的方式
16. git stash 把当前的工作现场 “储藏”起来，把工作区和暂存区的内容全部保存起来，并将状态恢复到当前分支的最新版本。所有分支都能够看见存储的内容
17. git branch -D <name>强行删除
18. git remote 查看有多少远程仓库与当前仓库关联，远程仓库可以直接命名不一定非要是origin
    1.  git push origin master 把master分支的所有提交推送到origin远程仓库
    2.  git push origin dev 把dev分支的所有提交推送到origin的远程仓库
    3.  git push 默认将当前分支推送到origin下
19.  git checkout -b dev origin/dev 拉取远程仓库的dev分支到本地分支，远程必须要现有这个分支
20.  git push / git pull
     1.   git push 
21.  git branch --set-upstream-to=origin/<branch> dev 将本地分支和远程仓库分支建立链接
22.  git rebase 不同人对分支的提交形成多条线，rebase将之理顺形成一条线
23.  git tag v1.0 : 在当前分支最新的commit上打一个标签，标签v1.0 就是指向那个commit的指针
     1.   git tag v0.9 f52c633 对f52c633这个commit_id 打上一个标签
     2.   git tag -a v0.1 -m "version 0.1 released" 1094adb，打带有说明的标签，用-a指定标签名，-m指定说明文字
     3.   注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。
     4.   git tag -d v0.1 删除标签
     5.   git push origin <tagname> 推送某个标签到远程，标签可能对不同分支可见，这里推送过去后，跟在本地的可见程度是一样的。
     6.   git push origin --tags  一次性推送全部尚未推送到远程的本地标签
     7.   删除远程标签：
          1.   先从本地删除 git tag -d v0.9
          2.   再用命令从远程删除：git push origin :refs/tags/v0.9
24.  git remote rm origin 删除关联的远程库
25.  检查某文件是否对应ignore规则： git check-ignore -v App.class
26.  给命令取别名：
     1.   git config --global alias.st status 给命令设置别名
     2.   git config --global alias.last 'log -1' 配置一个git last，让其显示最后一次提交信息
     3.   git config --global alias.unstage 'reset HEAD'  可以把暂存区的修改撤销掉（unstage），重新放回工作区
     4.   对当前仓库起作用的别名：在.git/config中修改
      ```sh
      $ cat .git/config 
      [core]
          repositoryformatversion = 0
          filemode = true
          bare = false
          logallrefupdates = true
          ignorecase = true
          precomposeunicode = true
      [remote "origin"]
          url = git@github.com:michaelliao/learngit.git
          fetch = +refs/heads/*:refs/remotes/origin/*
      [branch "master"]
          remote = origin
          merge = refs/heads/master
      [alias]
          last = log -1
      ```
      5. 而当前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中
      6. --global是全局的，所有用户的git都能够使用
27. git reset 可以将暂存区的内容返回到未加入暂存区状态；也可以返回某个固定的commit id
28. git diff HEAD -- readme.txt 将该版本最新的内容与unstage的内容对比，得出那些是即将commit的修改


# 远程仓库
## github
> github是基于ssh传输的，所以要生成公钥私钥
1. 先有本地仓库，想要在远程新建一个仓库关联的时候，远程仓库必须没有一条commit记录。
2. 远程仓库为空的时候可以建立链接 git remote add origin <address>  git push -u origin master
3. 本地创建的分支没有与远程的分支建立联系的时候可以创建链接: git branch --set-upstream-to=origin/dev dev



# github
1. 结构： 官方库 --> 我fork的官方库 <--> 我本地库
2. pull request 

# 几个重要的概念
1. stage、unstage
2. track、untrack
3. Fast forward 快进模式，直接把master指向dev的当前提交
4. 分支支队提交的内容有用，如果只是更改或者新增，不管切换到都可以看到工作区和暂存区的修改，可以切换分支来决定将修改提交到那个分支。也就是说工作区和暂存区的内容，所有分支都能够看到
5. 本地分支和远程仓库的分支必须连接起来才能够进行push和fetch、pull，不然会有提示
6. 本地新建的分支必须推送到远程仓库否则别人无法看到
7. 

# 问题
1. stage是一个什么概念
2. 两次不同的修改add后，在stage中如何表现。
3. 回到上一个版本，然后修改，然后提交push。这一个版本会被push到远程服务器上面吗？
4. 在分支上个更改了，结果master被别人更新了，怎么合并？
5. 如果本地建立了一个dev分支还没有推送到远程，然而别人已经将建立的分支推送到了远程仓库中，这个时候能不能将两个分支建立起链接？
6. 一个很重要的问题，就是两个完全不同的仓库，但是做的同一件事情，后面如何将两个仓库进行合并？
7. reset HEAD 还是有些不清楚的地方