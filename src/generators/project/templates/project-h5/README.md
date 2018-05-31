## <%=name %>

## 项目说明

又一个由ligo创建的项目......

## 用法

调试、编译等所有命令都直接使用gulp

### 命令
```
// 调试所有页面
gulp

// 调试指定页面
gulp -t myPage

// 针对日常环境打包所有页面
gulp build -e daily

// 针对线上环境打包指定页面
gulp build -e product -t myPage

// jshint查错
gulp lint

// 单元测试，代码覆盖率 mocha+chai+istanbul
gulp test

// TTD模式
gulp ttd
```

### 附加参数
```
-t --target [pageName]      指定目标页面
-a --all                    和--target一起使用，编译所有页面，但只打开指定页面
-r --root [rootPath]        指定gulp根目录，默认项目根目录
-h --host [hostName]        指定debug server的主机名，默认localhost
-p --port [portNumber]      指定debug server监听的端口，默认8001
-e --env [daily|product]    指定编译目标环境: 日常（daily）或 线上（product），不指定就是本地
-r --release                是否以发布模式编译（关闭所有debug工具)
-m --mock                   采用mock数据进行构建
-l --local                  本地开发模式，库文件来自本地而不是cdn
```

### 单元测试
测试文件必须以.spec.js结尾 
测试框架为mocha + chai



