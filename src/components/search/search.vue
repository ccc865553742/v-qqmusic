<template lang="html">
  <div class="search_container">
    <div class="search_view">
      <i class="icon-search"></i>
      <input type="text" name="" value="" placeholder="搜索歌曲、歌单、专辑" maxlength="40" @focus="onfocus" v-model="search_key" @keyup.enter="search">
      <i class="icon-close-circled" v-show="search_key.length" @click="clearSearchKey"></i>
      <span class="cancel" v-show="isfocus || search_key.length"  @click="cancel">取消</span>
    </div>
    <div class="search_content_wrap" v-show="!isfocus">
      <h3 class="search_tit">热门搜索</h3>
      <div class="search_tag_wrap">
        <a class="tag_item tag_hot" :src="hot.special_url">{{ hot.special_key }}</a>
        <span href="" class="tag_item" v-for="(item, index) in hotkey" @click="search(item.k)">{{ item.k }}</span>
      </div>
    </div>
    <div class="history_key_wrap" v-show="isfocus && !result_list.length">
      <div class="history_key_item" v-for="(item, index) in history_key" @click="search(item)">
        <i class="icon-time icon"></i>
        <span class="history_key">{{ item }}</span>
        <i class="icon-close icon" @click="delHistoryKey($event, index)"></i>
      </div>
      <span v-show="this.history_key.length" class="clear_history" @click="clearHistory">清除搜索记录</span>
    </div>
    <div class="search_result_wrap" v-show="result_list.length" @scroll.stop.prevent="scroll" ref="resultList" style="margin-bottom: 3.4rem">
      <div class="result_item" v-if="zhida.singermid" @click="$router.push(`/singer/${zhida.singermid}`)">
        <img class="result_avatar" style="border-radius: 100%" :src="avatarUrl" alt="">
        <div class="music_info">
          <span class="m_author">{{ zhida.singername }}</span>
          <span class="m_desc">{{ `单曲: ${zhida.songnum} 专辑: ${zhida.albumnum}`}}</span>
        </div>
        <i class="icon-close icon"></i>
      </div>
      <div class="result_item" v-for="(item, index) in result_list" @click="select(item)" ref="resultItem">
        <img class="result_avatar" v-lazy="avatar(item.albummid)" alt="">
        <div class="music_info">
          <span class="m_author">{{ item.songname }}</span>
          <span class="m_desc">{{ item.singer[0].name }}</span>
        </div>
        <i class="icon-close icon" @click="delResultList($event, index)"></i>
      </div>
      <loading class="loading" ref="loading" v-if="!noMore"></loading>
      <div v-else style="height: 1rem;line-height: 1rem;">没有更多了</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getHotkey, search } from '../../api/search';
import { playerMixin } from '../../common/js/mixin';
import { createSong } from '../../common/js/song';
import loading from '../../base/loading/loading';

export default {
  data() {
    return {
      hot: {},
      isfocus: false,
      search_key: '',
      hotkey: [],
      history_key: [],
      result_list: [],
      zhida: {},
      scrollTop: 0,
      currentP: 1,
      totalP: 1,
      noMore: false,
    };
  },
  mixins: [playerMixin],
  methods: {
    scroll() {
      this.scrollTop = this.$refs.resultList.scrollTop;
    },
    select(item) {
      createSong(item)
      .then((song) => {
        this.insertSong(song);
      });
    },
    avatar(mid) {
      return `https://y.gtimg.cn/music/photo_new/T002R68x68M000${mid}.jpg?max_age=2592000`;
    },
    onfocus() {
      this.isfocus = true;
    },
    clearSearchKey() {
      this.search_key = '';
    },
    search(key) {
      const searchKey = key.isTrusted ? this.search_key : key;
      if (key) {
        this.noMore = false;
        this.search_key = searchKey;
        this.isfocus = true;
      }
      // 添加到历史记录里面
      this.history_key = this.history_key.filter(item => item !== searchKey);
      this.history_key.unshift(searchKey);
      search(searchKey)
      .then((res) => {
        this.totalP = Math.ceil(res.data.song.totalnum / 20);
        if (this.totalP === 1) {
          this.noMore = true;
        }
        this.currentP = res.data.song.curpage;
        this.result_list = res.data.song.list;
        this.zhida = res.data.zhida;
      });
    },
    loadMore() {
      if (this.currentP === this.totalP) {
        this.noMore = true;
        return;
      }
      search(this.search_key, this.currentP + 1)
      .then((res) => {
        this.currentP = res.data.song.curpage;
        this.result_list = this.result_list.concat(res.data.song.list);
      });
    },
    cancel() {
      this.isfocus = false;
      this.search_key = '';
      this.zhida = {};
      this.result_list = [];
    },
    delHistoryKey(e, index) {
      // 阻止冒泡
      e.stopPropagation();
      this.history_key.splice(index, 1);
    },
    delResultList(e, index) {
      e.stopPropagation();
      this.result_list.splice(index, 1);
    },
    clearHistory() {
      this.history_key = [];
    },
    ...mapActions([
      'setTabIndex',
      'insertSong',
    ]),
  },
  computed: {
    avatarUrl() {
      return `https://y.gtimg.cn/music/photo_new/T001R68x68M000${this.zhida.singermid}.jpg?max_age=2592000`;
    },
  },
  mounted() {
    getHotkey()
    .then((res) => {
      this.hot = res.data;
      for (let i = 0; i < 8; i += 1) {
        let key = Math.ceil(Math.random() * 29);
        key = key >= 30 ? key - 1 : key;
        const l = this.hotkey.filter(item => item.k === this.hot.hotkey[key].k).length;
        if (!l) {
          this.hotkey.push(this.hot.hotkey[key]);
        } else {
          i -= 1;
        }
      }
    });
  },
  watch: {
    scrollTop(newVal) {
      const offTop = this.$refs.resultItem[this.$refs.resultItem.length - 10].offsetTop;
      if (newVal + 30 >= offTop) {
        this.loadMore();
      }
    },
  },
  components: {
    loading,
  },
  activated() {
    this.setTabIndex(3);
  },
};
</script>

<style lang="css" scoped>
.search_container {
  width: 7.5rem;
}
.search_view{
  display: flex;
  position: fixed;
  width: 7.5rem;
  /*margin-top: */
  top: 1.68rem;
  padding: .2rem;
  box-sizing: border-box;
  z-index: 20;
  background: #f4f4f4;
}
.search_view .icon-search{
  position: absolute;
  top: .4rem;
  left: .4rem;
  font-size: .36rem;
  color: #f4f4f4;
}

.search_view .icon-close-circled {
  position: absolute;
  right: 1.05rem;
  top: 50%;
  padding: .2rem;
  transform: translateY(-50%);
  font-size: .48rem;
  color: #b2b2b2;
}
.search_view input {
  width: 100%;
  padding:.2rem .2rem .2rem .8rem;
  height: .4rem;
  font-size: .24rem;
  outline: none;
  border: none;
}
.cancel{
  height: .4rem;
  padding: .2rem;
  line-height: .4rem;
  width: .8rem;
  background: #f4f4f4;
  font-size: .24rem;
  color: #555;
}

.search_content_wrap{
  width:100%;
  position: fixed;
  margin-top: 1.4rem;
  height: 3rem;
  box-sizing: border-box;
  padding: .1rem .2rem;
}
.search_tit{
  font-size: .30rem;
  text-align: left;
  color: rgba(0,0,0,.6)
}

.search_tag_wrap{
  max-width: calc(7.5rem - .2rem);
  display: flex;
  flex-wrap: wrap;
}

.tag_item{
  margin-left: .2rem;
  margin-top: .2rem;
  display: inline-block;
  padding:0 .2rem;
  line-height: .6rem;
  height: .6rem;
  font-size: .28rem;
  border-radius: .6rem;
  border: .02rem solid rgba(0,0,0,.6);
  word-break: keep-all;
  color: #000;
}
.tag_item.tag_hot {
  color: #fc4524;
  border-color: #fc4524;
}
.history_key_wrap {
  margin-top: 3rem;
}

.history_key_item{
  display: flex;
  align-items: center;
  font-size: .24rem;
  color: #000;
  height: .88rem;
  border-bottom: .02rem solid #ededed;
}
.history_key_item .history_key{
  flex: 1;
  text-align: left;
  letter-spacing: .01rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.history_key_item .icon{
  flex: 0 0 1rem;
  font-size: .36rem;
  color: #b2b2b2;
}
.history_key_item .icon-close{
  color: #000;
}
.clear_history{
  display: inline-block;
  text-align: center;
  width: 100%;
  padding:.4rem 0;
  color: #47c88a;
  font-size: .24rem;
}
.clear_history:active {
  background: #ededed;
}
.search_result_wrap{
  position: fixed;
  height: calc(100vh - 2.88rem);
  overflow-y: scroll;
  font-size: .24rem;
  margin-top: 1.4rem;
}

.search_result_wrap::-webkit-scrollbar {display:none}
.search_result_wrap .result_item{
  display: flex;
  align-items: center;
  font-size: .24rem;
  margin:.1rem;
  width: calc(7.5rem - .1rem * 2);
  color: #000;
  height: .88rem;
  border-bottom: .02rem solid #ededed;
}
.result_avatar {
  height: .8rem;
  width: .8rem;
}
.music_info {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.music_info span{
  color: #b2b2b2;
  width: 5rem;
  margin-left: .2rem;
  margin-top: .1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.music_info .m_author{
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.result_item .icon {
  font-size: .36rem;
  flex: 0 0 1rem;
  padding: .2rem 0;
}
.loading{
  height: 1rem;
  line-height: 1rem;
}
</style>
