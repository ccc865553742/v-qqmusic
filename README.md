# qqmusic

一个用vue.js 写的模仿qq 音乐的小项目。

学习vue 也有一段时间了，也在实习的时候用来给公司做过几个移动端的小项目，想了想 还没有自己的一个线上能跑的vue项目，所以就模仿着qq音乐做出来这个项目.

项目中的API主要是用jsonp进行跨域请求，所以数据来源还是qq音乐的。

# 实现的功能
- 首页轮播
- 热门歌单推荐(暂只能查看封面信息)
- 歌手列表以及歌手详情页的查看
- 歌曲排行榜单
- 搜索歌曲歌曲功能
- 歌曲播放

# TODO
- 音乐收藏功能

在线预览地址：http://193.112.120.14 (用手机打开食用效果最佳)

# 使用到的技术栈
* rem.js 做移动端的适配
* axios (网络请求)
* vue-router (页面的路由)
* vuex (页面的状态管理)
* fastclick (解决移动端点击300ms延迟)
* jsonp (跨域请求)
* vue-lazyload (图片懒加载)
* lyric-parse (歌词解析)
* js-base64 (对网络请求中的歌词进行解码)
* iconfont (图标字体, 一些普通png的icon用字体的方式替代，可以减少HTTP请求)


# 效果图

* ![index](https://raw.githubusercontent.com/ccc865553742/v-qqmusic/master/images/index.jpg)
* ![singer](https://raw.githubusercontent.com/ccc865553742/v-qqmusic/master/images/singer.jpg)
* ![toplist](https://raw.githubusercontent.com/ccc865553742/v-qqmusic/master/images/toplist.jpg)
* ![serch](https://raw.githubusercontent.com/ccc865553742/v-qqmusic/master/images/search.jpg)
* ![keyword](https://raw.githubusercontent.com/ccc865553742/v-qqmusic/master/images/keyword.jpg)
* ![play](https://raw.githubusercontent.com/ccc865553742/v-qqmusic/master/images/start.jpg)


# 2017 12-5 修复歌曲链接失效
由于qq音乐接口改动

解决方案 https://www.jianshu.com/p/b26c0c9c6149

# 2018-3-1
解决移动端滚动穿透的问题
解决方案参考 [解决方案 position: fixed](https://segmentfault.com/a/1190000005617307#articleHeader3)

# 2018-3-10
添加css 样式 视图兼容平板电脑


