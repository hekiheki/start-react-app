# start-react-app

1. react+webpack的一个小型结构参考了，参考了<https://www.jianshu.com/p/db6113c94dbc> 的配置，主要用于写react组件。
2. 加入了sass-loader,file-loader。
3. 想把css,sass分离打包的时候碰到了些问题，我用的webpack4，文章中是webpack@3,有些更新的地方。
	* webpack-cli（用来启动webpack）
	* extract-text-webpack-plugin报错，需要`npm i webpack-contrib/html-webpack-plugin -D`安装。暂时没有设置。

4. 没有加入react-router和redux等。