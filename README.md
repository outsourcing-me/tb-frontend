# tbj-frontend

> 推币机项目

## 项目可以直接打包app
```
# 项目同级目录安装 tbj-app
```

## Build Setup

``` bash
# install dependencies
If your npm\'s version lower then 3 , suggest using yarn:
First globally install yarn. Run `npm install yarn -g` and then run `yarn install`

Otherwise use npm(>3) is nice:
npm install

# install mina
gem install mina -v 0.3.8

# serve with hot reload at localhost:8080
npm run dev

# build for production

// 不需要本地打包，用mina做服务器构建
npm run build:h5:dev 打包微信公众号h5页面
npm run build:app:dev 打包app项目
npm run build:dev 同时打包h5和app

# publish
mina delploy stage=dev br=develop // br specific branch, default value is develop

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
