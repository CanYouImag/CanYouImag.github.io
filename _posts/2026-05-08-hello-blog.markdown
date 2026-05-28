---
layout: post
title:  "搭建博客：从入门到入土（划掉）到飞升"
date:   2026-05-08 9:17:41 +0800
categories: jekyll update
tags: [blog, tutorial, jekyll]
cover_image: /assets/wangye.png
---
贫道今日心血来潮，欲在互联网这方天地开辟一处洞府（博客）。本以为要经历九九八十一难，未曾想今日运势极佳，竟是一路绿灯。

特以此文记录今日“成道”过程，以供后人瞻仰（或者嘲笑）。

### 修炼法器准备

俗话说“工欲善其事，必先利其器”。贫道此次选用的乃是 **Jekyll** 这一大能框架，配合 **GitHub Pages** 这一云端阵法（你得有个github账号）。

### 修炼过程

1. **环境搭建**
   本以为安装 MSYS2 和 Ruby 会像运转“风后奇门”一样困难，结果竟然一路回车，毫无阻碍。看来贫道与这代码一途，确实有些缘分。
   今大道已成，贫道就稍微透露一点修习法门，请道友按序修习（谅你乱序也库库报错）：
   
   ***在Windows下配置***
   [安装RubyInstaller](https://rubyinstaller.org/downloads/)（安装Ruby+Devkit安装包，选择推荐版本）
   
   ![安装Ruby+Devkit安装包，选择推荐版本](/../assets/download_Ruby+Devkit_recommand_version.png)
   
   运行下载的安装包，除了选择文件下载位置的地方各位道友需要考虑一下，默认会下到C盘，其他的一路保持默认配置就好。
   ***在macOS下配置***
   macOS很多版本会自带Ruby，但是Jekyll官方不推荐使用macOS自带的Ruby，原因如下：
   
      （1） ***系统Ruby太老了***
   
      （2） ***系统Ruby缺少一些必要的库***
   
      （3） ***系统Ruby安装gem默认情况下无法使用***
   
   ………………………………………………（给的理由还不少)
   
   然后在macOS上安装Ruby：
   
   打开终端，运行如下命令：
   
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" # 安装工具Homebrew
   brew install chruby ruby-install # 安装chruby和ruby-install
   ruby-install ruby # 安装Jekyll支持的稳定Ruby，等待命令执行成功
   
   echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
   echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
   echo "chruby ruby-3.4.1" >> ~/.zshrc # run 'chruby' to see actual version
# 保证你的终端能自动使用chruby

   ```
   以上命令如有疑问，请查询[macOS安装ruby](https://jekyllrb.com/docs/installation/macos/)
   ***在Linux下配置***
   不同发行版使用的安装命令不同，请查询[Linux安装ruby等](https://jekyllrb.com/docs/installation/other-linux/)（注：Ubuntu使用者请直接移步此网页最底端，其他Linux用户安装后续操作与Ubuntu安装后操作相同）
   
   ***安装成功后***
   打开终端，输入命令验证是否安装成功：
   ```bash
   ruby -v
   gem -v
   ```
   如果报错的话，很大可能是各位道友安装时忘记勾选添加环境变量了。请各位道友把报错信息复制扔给AI，它们会帮你解决的（个人建议多问几个）。

   没有报错的话，继续下一步，在终端中运行：

   ```bash
   gem install jekyll
   ```
   耐心等待命令执行成功。
   随后还是在终端中运行：
   ```bash
   jekyll -v
   ```
   来验证我们的框架是否配置成功了。如成功，则各位道友继续往下看。

2. **生成洞府**
   只需一句咒语：
   ```bash
   jekyll new myblog
   ```
   这条命令会在你的工作目录下创建一个名为"myblog"的文件夹，不喜欢这个名字可以修改上面的命令中“myblog”那部分。
   然后终端进入到新建的“myblog”文件夹（请道友实地操作的时候进入你自己创建的文件夹），运行如下命令：
   ```bash
   bundle exec jekyll serve
   ```
   等待命令执行成功后，进入终端给出的网址（可以按住ctrl，然后鼠标左键网址，就能进入这个本地网站了）
   
3. **布置阵法**
   首先，你得在github上创建一个仓库，命名为“***你的用户名.github.io***”格式，如你的账号用户名是@zhangsan，那么仓库就命名为"zhangsan.github.io"。
   在博客根目录下运行：
   ```bash
   git init # 只需要在第一次将网站上传到github仓库上时运行，将这个目录添加到git管理中
   git add . # 将所有目录下经过更改的文件上传到暂存区
   git commit -m "写了一篇关于xxx的新文章" # 打包留个记录
   git remote add origin https://github.com/你的用户名/你的仓库名.git # 绑定你的 GitHub 仓库地址（把链接换成你自己的，只需要执行一次）
   git push -u origin main # 推送代码到远程仓库的main分支（第一次用这个，以后推送新博客可以替换成git push）
   ```
   运行完上面的命令且没有报错后，按照下面的方法让阵法长久运转：
   1. ***进入仓库***
      登录 GitHub，点进你刚才创建并上传的那个博客仓库。
   
   2. ***找到“设置”***
      在仓库页面的顶部导航栏里，找到并点击Settings。
   
   3. ***找到“Pages”选项***
      在左侧的菜单栏里，往下翻，找到 Pages 这一项，点击它。
   
   4. ***配置“电源”***
      在右侧的主界面中，找到 Build and deployment 部分。
   
      Source：保持默认（GitHub Actions 或 Deploy from a branch 都可以，默认通常是 Branch）。
   
      Branch：点击下拉菜单，选择 main（或者是 master，看你本地分支叫啥）。
   
      Folder：保持 / (root) 不变。
   
      点击“保存”
   
      点击 Save 按钮。
   
   5. ***等待部署***
      点击保存后，页面顶部可能会出现一个正在运行的进度条。等待大概 1-2 分钟，刷新一下这个页面。你会看到一行字：
   
      Your site is live at https://你的用户名.github.io/你的仓库名/
   
      点击这个链接，你的博客就正式面世了！
### 修炼心得

   今日方知，只要路子选得对，Bug 也是能绕道走的。
   既然洞府已建成，往后贫道便在此处闭关修炼。无论是代码上的疑难杂症，还是生活里的碎碎念，皆会记录于此。
   各位道友，人世纷乱，出入平安。有缘再见！

![王也](/../assets/wangye.png)

